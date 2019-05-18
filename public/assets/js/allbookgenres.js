$(document).ready(function(){

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8080/xXEmilioXx/MyBookstore/1.0.0/book/genres',
        dataType : 'json',
        success : function(response){
            createFlexElements(response);
        }
    });

    function createFlexElements(response){
        var i = 0;
        var obj = JSON.stringify(response);
        var jsArray = JSON.parse(obj); //converto l'array di JSON in array di oggetti js
        var arrayLength = jsArray.length;

        for( i; i < arrayLength; i++){
            $(".flex-container").append('<div><a href="#"><p class="genre">' + jsArray[i] + '</p></a></div>');
        }

        $('.genre').click(function() {

            $.ajax({
                type: 'GET',
                url: '/xXEmilioXx/MyBookstore/1.0.0/book/findByGenre?genre=' + $(this).text(),
                datatype: 'json',
                success: function(response) {
                    createBooks(response);
                }
            });

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
                        '<div class="col-md-3">' +
                        '<img src="' + jsArray[i].image_path + '" class="card-img" alt="Book image">' +
                        '</div>' +
                        '<div class="col-md-9">' +
                        '<h5 class="card-title">' + jsArray[i].name + '</h5>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>');

                    if (booksPerRow == 1){
                        $(".card-deck").append('<div class="w-100"></div>');
                        booksPerRow = 0;
                    }else{
                        booksPerRow++;
                    }
                }
            }

        })
    }
});