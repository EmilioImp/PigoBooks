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


        $("#genreList").append('<p>');
        for (i; i < nGenres-1; i++) {
            $("#genreList").append(genresArray[i] + ', ' );
        }
        $("#genreList").append(genresArray[i]);
        $("#genreList").append('</p>');
    }

    function createThemesList(themesArray) {
        var i = 0;
        var nThemes = themesArray.length;

        $("#themeList").append('<p>');
        for (i; i < nThemes-1; i++) {
            $("#themeList").append(themesArray[i] + ', ' );
        }
        $("#themeList").append(themesArray[i]);
        $("#themeList").append('</p>');
    }

    function createSimilarBookList(similarBooksArray) {
        const maxBooks = 3;
        var i = 0;
        var r;
        var nSimilarBooks = similarBooksArray.length;
        var randomSimilarBooksArray = [];

        for (i; i < maxBooks; i++){
            r=Math.floor(Math.random() * (nSimilarBooks-i));
            randomSimilarBooksArray.push(similarBooksArray[r]);

            for( var j = 0; j < nSimilarBooks-j; j++){
                if ( similarBooksArray[j] === r) {
                    similarBooksArray.splice(j, 1);
                }
            }

        }

        var nRandomSimilarBooks = randomSimilarBooksArray.length;

        for (i=0; i < nRandomSimilarBooks; i++) {
            $("#similarBooksList").append('<a href="book.html?parameter=' + randomSimilarBooksArray[i].bookID + '" class="list-group-item list-group-item-action">' + similarBooksArray[i].name + '</a>');
        }
    }

    function createAuthorList(authorArray) {
        var i = 0;
        var nAuthors = authorArray.length;


        for (i; i < nAuthors-1; i++) {
            $("#authorList").append('<a href="author.html?parameter=' + authorArray[i].authorID + '">' + authorArray[i].firstName + ' ' + authorArray[i].lastName + '</a>' +', ');
        }
        $("#authorList").append('<a href="author.html?parameter=' + authorArray[i].authorID + '">' + authorArray[i].firstName + ' ' + authorArray[i].lastName + '</a>');
    }


    function adjustBookPage(bookjson) {
        var book = JSON.parse(JSON.stringify(bookjson));
        $(".card-img").attr("src", book[0].image_path);
        document.getElementById("name").innerHTML =
            book[0].name;
        document.getElementById("edition").innerHTML =
            book[0].edition;
        document.getElementById("cost").innerHTML =
            book[0].cost;
        createAuthorList(book[0].authors);
        createGenresList(book[0].genres);
        createThemesList(book[0].themes);
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
                $('.toast').toast(options);
                $("#quantityFormToast").append('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="failureToast" data-autohide="true">\n' +
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
                $('#failureToast').toast('show');
            },
            success: function (response) {
                $('.toast').toast(options);
            $("#quantityFormToast").append('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="successToast" data-autohide="true">\n' +
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
                $('#successToast').toast('show');
            }
        });
    });


})


