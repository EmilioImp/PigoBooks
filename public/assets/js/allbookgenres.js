$(document).ready(function(){

    $.ajax({
        type : 'GET',
        url : '/xXEmilioXx/MyBookstore/1.0.0/book/genres',
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
            $('#genresList').append('<li class="nav-item" role="presentation"><a href="#cardPanel" role="tab" data-toggle="tab">' + jsArray[i] +'</a></li>');
        }


        $('#genresList > li.nav-item').on('click', 'a' ,function() {

            $.ajax({
                type: 'GET',
                url: '/xXEmilioXx/MyBookstore/1.0.0/book/findByGenre?genre=' + $(this).text(),
                datatype: 'json',
                success: function(response) {
                    $(this).add('activeTemp');
                    $('#genresList > li').removeClass('active');
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
                var obj = JSON.stringify(response);
                var jsArray = JSON.parse(obj);
                var arrayLength = jsArray.length;

                var booksPerRow = 0;

                $(".card-deck").empty();

                for( i; i < arrayLength; i++){
                    $(".card-deck").append('<div class="card text-center mb-3">' +
                        '<a href="book.html?parameter=' + jsArray[i].bookID + '">' +
                        '<div class="row no-gutters">' +
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

            }

        })
    }
});