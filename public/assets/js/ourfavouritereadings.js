$(document).ready(function(){

    const name = "Our favourites";
    const url = "ourfavouritereadings.html";

    if (!window.sessionStorage.getItem("lastPage")) {
        $("#orderedListBreadCrumb").append('<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
    }
    else {
        const lastPage = JSON.parse(window.sessionStorage.getItem("lastPage"));
        $("#orderedListBreadCrumb").append('' +
            '<li class="breadcrumb-item"><a href="'+ lastPage.url +'">'+ lastPage.name +'</a></li>' +
            '<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
    }
    window.sessionStorage.setItem("lastPage", JSON.stringify({url: url, name: name}));

    $.ajax({
        type : 'GET',
        url : '/xXEmilioXx/MyBookstore/1.0.0/book/favouriteReadings',
        dataType : 'json',
        success : function(response){
            generateStaffCards(response);
        }
    });

    function generateStaffCards(response){
        var i = 0;
        var jsArray = JSON.parse(JSON.stringify(response));
        var len = jsArray.length;

        for(i; i < len; i++){
            $("#card-row").append('<div class="column"><div class="flip-card">' +
                '<div class="flip-card-inner">' +
                '<div class="flip-card-front">' +
                '<img class="staffImg" src="' + jsArray[i].person_image_path + '" alt="avatar"></div>'+
                '<div class="flip-card-back">' +
                '<img class="bookImg" src="' + jsArray[i].book.image_path + '" alt="...">' +
                '<div class="content">' +
                '<h3>' + jsArray[i].person + "'s favourite" + '</h3>' +
                '<a class="bookRef" href="book.html?parameter=' + jsArray[i].book.bookID + '">' +
                '<p>' + jsArray[i].book.name + '</p>' +
                '</a></div></div></div></div></div>');
        }

        $("#card-row").on('click', '.flip-card', function(){
            $(this).children("div.flip-card-inner")[0].classList.toggle('is-flipped');
        });
    }
});