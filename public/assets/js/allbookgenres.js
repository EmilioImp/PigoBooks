$(document).ready(function(){

    const name = "Genres";
    const url = "allbookgenres.html";

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
        url : '/hypermedia2019/api/book/genres',
        dataType : 'json',
        success : function(response){
            createFlexElements(response);
        }
    });

    function createFlexElements(response){
        var i = 0;
        var obj = JSON.stringify(response);
        var jsArray = JSON.parse(obj); //converting the json array in a js objects array
        var arrayLength = jsArray.length;

        for( i; i < arrayLength; i++){
            $('#filterList').append('<li class="nav-item" role="presentation"><a href="#cardPanel" role="tab" data-toggle="tab">' + jsArray[i] +'</a></li>');
        }


        $('#filterList > li.nav-item').on('click', 'a' ,function() {

            $.ajax({
                type: 'GET',
                url: '/hypermedia2019/api/book/findByGenre?genre=' + $(this).text(),
                datatype: 'json',
                success: function(response) {
                    $(this).add('activeTemp');
                    $('#filterList > li').removeClass('active');
                    $("li[class='activeTemp']").removeClass('activeTemp');
                    $(this).addClass('active');
                    createBooks(response);
                }
            });

            function addAuthorNames(jsArray, i){
                var b = 0;
                var nAuthors = jsArray[i].authors.length;
                var names;
                if (nAuthors === 1){
                    names = jsArray[i].authors[b].firstName + " " + jsArray[i].authors[b].lastName;
                }
                else if (nAuthors === 0){
                    names = "Unknown";
                }
                else {
                    for (b; b < nAuthors - 1; b++){
                        if (b === 0){
                            names = jsArray[i].authors[b].firstName + " " + jsArray[i].authors[b].lastName + ", ";
                        }
                        else {
                            names = names + jsArray[i].authors[b].firstName + " " + jsArray[i].authors[b].lastName + ", ";
                        }
                    }
                    names = names + jsArray[i].authors[b].firstName + " " + jsArray[i].authors[b].lastName;  //the last name is added separately to avoid adding the comma
                }
                return names;
            }

            function createBooks(response){
                var i = 0;
                var j = 0;
                var obj = JSON.stringify(response);
                var jsArray = JSON.parse(obj);
                var pageSize = 6; //max number of Author elements per page
                var arrayLength = jsArray.length;
                var pageCount = arrayLength / pageSize; //pages necessary to contain all the authors

                var booksPerRow = 0;

                $(".card-deck").empty();
                $(".pagination").empty();

                for( i; i < arrayLength; i++){
                    $(".card-deck").append('<div class="card books text-center mb-3">' +
                        '<a href="book.html?parameter=' + jsArray[i].bookID + '">' +
                        '<div class="row books no-gutters">' +
                        '<div class="col-md-4">' +
                        '<img src="' + jsArray[i].image_path + '" class="card-img" alt="Book image">' +
                        '</div>' +
                        '<div class="col-md-8">' +
                        '<h5 class="card-title">' + jsArray[i].name + '</h5>' +
                        '<small class="text-faded"><p class="authorNames">' + addAuthorNames(jsArray, i) +'</p></small>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>');

                    if (booksPerRow === 1){
                        $(".card-deck").append('<div class="w-100"></div>');
                        booksPerRow = 0;
                    }
                    else{
                        booksPerRow++;
                    }
                }

                //if pageCount > 1 I must append the << symbol first
                if (pageCount > 1){
                    $(".pagination").append('<li id="first" class="page-item"><a href="javascript:void(0)" aria-label="First"><span aria-hidden="true">&laquo;</span></a></li>');
                }

                for( j ; j < pageCount; j++){ //creating the necessary number of pages to contain the authors
                    $(".pagination").append('<li class="page-item"><a href="#">'+(j+1)+'</a></li>');
                }

                //after the creation of the pagination, if pageCount > 1 I add the >> symbol
                if (pageCount > 1){
                    $(".pagination").append('<li id="last" class="page-item"><a href="javascript:void(0)" aria-label="Last"><span aria-hidden="true">&raquo;</span></a></li>');
                }

                //if there's only one page, then I won't have created the >> e << symbols and so the first page will be "current"
                if (pageCount === 1){
                    $(".pagination li").first().find("a").addClass("current");
                }

                //if there is more than one page, I'll have to skip >> while deciding which page is "current"
                else {
                    $(".pagination li").first().next().find("a").addClass("current");
                }

                showPage = function(page) {
                    $(".card.books").hide();
                    $(".card.books").each(function(n) {
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

                //handling the clicks on generic numerical indexes
                $(".pagination li a").click(function() {
                    $(".pagination li a").removeClass("current");
                    $(this).addClass("current");
                    showPage(parseInt($(this).text()))
                });

            }

        })
    }
});