$(document).ready(function() {



    $.ajax({
        type: 'GET',
        url: '/xXEmilioXx/MyBookstore/1.0.0/book/' + getURLQueryParameter(),
        datatype: 'json',
        success: function (response) {
            adjustBookPage(response);
        }
    });



    function createGenresList(genresArray) {
        var i = 0;
        var nGenres = genresArray.length;

        if (nGenres != 0) {
            $("#genreList").append('<p>');
            for (i; i < nGenres - 1; i++) {
                $("#genreList").append(genresArray[i] + ', ');
            }
            $("#genreList").append(genresArray[i]);
            $("#genreList").append('</p>');
        }
        else $("#genreList").append('<p>This book has no genres</p>');
    }


    function createThemesList(themesArray) {
        var i = 0;
        var nThemes = themesArray.length;

        if (nThemes!=0) {
            $("#themeList").append('<p>');
            for (i; i < nThemes - 1; i++) {
                $("#themeList").append(themesArray[i] + ', ');
            }
            $("#themeList").append(themesArray[i]);
            $("#themeList").append('</p>');
        }
        else $("#themeList").append('<p>This book has no particular themes</p>');
    }

    function createSimilarBookList(similarBooksArray) {
        const maxBooks = 3;
        var i = 0;
        var r;
        var nSimilarBooks = similarBooksArray.length;
        if (nSimilarBooks !=0) {
            var randomSimilarBooksArray = [];

            for (i; ((i < maxBooks) && (i < nSimilarBooks)); i++) {
                r = Math.floor(Math.random() * (nSimilarBooks - i));
                randomSimilarBooksArray.push(similarBooksArray[r]);

                for (var j = 0; j < nSimilarBooks; j++) {
                    if (j === r) {
                        similarBooksArray.splice(j, 1);
                    }
                }

            }

            var nRandomSimilarBooks = randomSimilarBooksArray.length;

            $("#similarBooksList").append('<div class="card-deck">');
            for (i = 0; i < nRandomSimilarBooks; i++) {
                $("#similarBooksList").append('<div class="card">\n' +
                    '    <img src="'+ randomSimilarBooksArray[i].image_path +'" class="card-img-top" alt="Book Image">\n' +
                    '    <div class="card-body">\n' +
                    '      <h5 class="card-title">'+ randomSimilarBooksArray[i].name +'</h5>\n' +
                    '    </div>\n' +
                    '  </div>');
                //$("#similarBooksList").append('<a href="book.html?parameter=' + randomSimilarBooksArray[i].bookID + '" class="list-group-item list-group-item-action">' + randomSimilarBooksArray[i].name + '</a>');
            }
            $("#similarBooksList").append('</div>');
        }
        else $("#similarBooksList").append('<p>This book has no similar Books</p>');
    }

    function createAuthorList(authorArray) {
        var i = 0;
        var nAuthors = authorArray.length;

        if (nAuthors!=0) {
            for (i; i < nAuthors - 1; i++) {
                $("#authorList").append('<a href="author.html?parameter=' + authorArray[i].authorID + '">' + authorArray[i].firstName + ' ' + authorArray[i].lastName + '</a>' + ', ');
            }
            $("#authorList").append('<a href="author.html?parameter=' + authorArray[i].authorID + '">' + authorArray[i].firstName + ' ' + authorArray[i].lastName + '</a>');
        }
        else $("#authorList").append('<p>No authors for this book</p>');
    }

    function createEventList (eventArray){
        var i = 0;
        var nEvents = eventArray.length;
        if (nEvents!=0) {
            for (i; i < nEvents - 1; i++) {
                $("#eventList").append('<a href="event.html?parameter=' + eventArray[i].eventID + '">' + eventArray[i].name + '</a>' + ', ');
            }
            $("#eventList").append('<a href="event.html?parameter=' + eventArray[i].eventID + '">' + eventArray[i].name + '</a>');
        }
        else $("#eventList").append('<p>No events associated with this book</p>');

    }


    function adjustBookPage(bookjson) {
        var book = JSON.parse(JSON.stringify(bookjson));

        if (book[0].image_path===undefined)
            $(".card-img").attr("src", "../img/noImagePlaceholder.jpg");
        else
            $(".card-img").attr("src", book[0].image_path);

        if (book[0].name===undefined)
            document.getElementById("name").innerHTML = "Name not found";
        else
            document.getElementById("name").innerHTML = book[0].name;

        if (book[0].edition===undefined)
            document.getElementById("edition").innerHTML = "Edition not found";
        else
            document.getElementById("edition").innerHTML = book[0].edition;

        if (book[0].cost===undefined)
            document.getElementById("cost").innerHTML = "Cost not found";
        else
            document.getElementById("cost").innerHTML = book[0].cost + " €";
        createAuthorList(book[0].authors);
        createGenresList(book[0].genres);
        createThemesList(book[0].themes);
        createEventList(book[0].events);
        createSimilarBookList(book[0].similarBooks);
    }

    $('#pressBuyBookButton').click(function () {

        const quantity = $('#formControlSelect.form-control').children("option:selected").val();
        const id = getURLQueryParameter();
        const returnObject = {bookID: parseInt(id), copies: parseInt(quantity)};
        const returnJSON = JSON.stringify(returnObject);

        $.ajax({
            type: "POST",
            url: "/xXEmilioXx/MyBookstore/1.0.0/user/cart/addBook",
            data: returnJSON,
            contentType: "application/json",
            headers : {'x-auth-token' : window.localStorage.getItem("accessToken")},
            error: function (response) {
                console.log(response.responseText);
                window.alert("Error: you must be logged in to buy a book");
               /* $("#quantityFormToast").append('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="failureToast">\n' +
                    '  <div class="toast-header">\n' +
                    '    <img src="..." class="rounded mr-2" alt="...">\n' +
                    '    <strong class="mr-auto">Operation Failed.</strong>\n' +
                    '    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">\n' +
                    '      <span aria-hidden="true">&times;</span>\n' +
                    '    </button>\n' +
                    '  </div>\n' +
                    '  <div class="toast-body">\n' +
                    '    You must be logged in to purchase a book\n' +
                    '  </div>\n' +
                    '</div>');
                $('#failureToast').toast(options);
                $('#failureToast').toast('show');*/
            },
            success: function (response) {
                console.log(response.responseText);
                window.alert("Success! Book added to the cart");
           /* $("#quantityFormToast").append('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="successToast">\n' +
                '  <div class="toast-header">\n' +
                '    <img src="..." class="rounded mr-2" alt="...">\n' +
                '    <strong class="mr-auto">Operation completed!</strong>\n' +
                '    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">\n' +
                '      <span aria-hidden="true">&times;</span>\n' +
                '    </button>\n' +
                '  </div>\n' +
                '  <div class="toast-body">\n' +
                '    Book added to cart!\n' +
                '  </div>\n' +
                '</div>');
                $('#successToast').toast(options);
                $('#successToast').toast('show');*/
            }
        });
    });


})


