$(document).ready(function () {

    const name = "Orders history";
    const url = "orderhistory.html";

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
        url : '/xXEmilioXx/MyBookstore/1.0.0/user/orders',
        datatype : 'json',
        headers : {'x-auth-token' : window.localStorage.getItem("accessToken")},
        success : function(response){
            visualizeOrders(response);
        }
    });

    function visualizeBooks(jsArray, i){
        let books = '';
        let numberOfBooks = jsArray[i].books.length;
        for(let j = 0; j < numberOfBooks; j++){
            books = books + '<div class="row">' +
                '<div class="col">' +
                '<img class="card-img" alt="bookimg" src="' + jsArray[i].books[j].image_path + '">' +
                '</div>' +
                '<div class="col title">' +
                '<h5 class="card-title"><a href="book.html?parameter=' + jsArray[i].books[j].bookID + '" >' + jsArray[i].books[j].name + '</a> </h5>' +
                '<p class="bookInfo">Copies: ' + jsArray[i].books[j].copies + '</p>' +
                '</div>' +
                '<div class="col copies">' +
                '<p class="bookInfo"> Total: ' + jsArray[i].books[j].cost * jsArray[i].books[j].copies + '€</p>' +
                '</div>' +
                '</div>';

            if (j + 1 < numberOfBooks) {
                books = books + '<hr>';
            }
        }
        return books;
    }


    function visualizeOrders(response) {
        var j = 0;
        var pageSize = 3;
        var obj = JSON.stringify(response);
        var jsArray = JSON.parse(obj); //converting the json array in js objects array
        var arrayLength = jsArray.length;
        var pageCount = arrayLength / pageSize;


        for(let i = 0; i < arrayLength; i++){
            let totalAmount = 0;
            let numberOfBooks = jsArray[i].books.length;
            for(let j = 0; j < numberOfBooks; j++){
                totalAmount += jsArray[i].books[j].cost * jsArray[i].books[j].copies;
            }

            $('#ordersContainer').append('<div class="card">' +
                '<div class="card-header"><p class="lead">Date of order: ' + jsArray[i].date + '</p>' +
                '<p id="totalAmountText" class="lead">Total amount: '+ totalAmount +' €</p></div>' +
                visualizeBooks(jsArray, i) + '</div>');
        }

        if (pageCount > 1){
            $(".pagination").append('<li id="first" class="page-item"><a href="#" aria-label="First"><span aria-hidden="true">&laquo;</span></a></li>');
        }

        for( j ; j < pageCount; j++){
            $(".pagination").append('<li class="page-item"><a href="#">'+(j+1)+'</a></li>');
        }

        if (pageCount > 1){
            $(".pagination").append('<li id="last" class="page-item"><a href="#" aria-label="Last"><span aria-hidden="true">&raquo;</span></a></li>');
        }

        if (pageCount === 1){
            $(".pagination li").first().find("a").addClass("current");
        }

        else {
            $(".pagination li").first().next().find("a").addClass("current");
        }

        showPage = function(page) {
            $("#ordersContainer > .card").hide();
            $("#ordersContainer > .card").each(function(n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        };

        showPage(1);

        //handling the click on <<
        $("#first").click(function() {
            $(".pagination li a").removeClass("current");
            $("#first").next().find("a").addClass("current");
            showPage(parseInt($("#first").next().find("a").text()))
        });

        //handling the click on >>
        $("#last").click(function() {
            $(".pagination li a").removeClass("current");
            $("#last").prev().find("a").addClass("current");
            showPage(parseInt($("#last").prev().find("a").text()))
        });

        //handling of clicks on generic numerical indexes
        $(".pagination li a").click(function() {
            $(".pagination li a").removeClass("current");
            $(this).addClass("current");
            showPage(parseInt($(this).text()))
        });
    }
});