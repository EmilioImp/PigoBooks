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

        for (i; i < nGenres; i++) {
            $("#genreList").append('<a href="allbookgenres.html?genre=' + genresArray[i] + '</a>')
        }
    }

    function createThemesList(themesArray) {
        var i = 0;
        var nThemes = themesArray.length;

        for (i; i < nThemes; i++) {
            $("#themeList").append('<a href="allbookthemes.html?parameter=' + themesArray[i] + '</a>')
        }
    }

    function createSimilarBookList(similarBooksArray) {
        var i = 0;
        var nSimilarBooks = similarBooksArray.length;

        for (i; i < nSimilarBooks; i++) {
            $("#similarBooksList").append('<a href="book.html?parameter=' + similarBooksArray[i].bookID + '" class="list-group-item list-group-item-action">' + similarBooksArray[i].name + '</a>')
        }
    }

    function createAuthorList(authorArray) {
        var i = 0;
        var nAuthors = authorArray.length;

        for (i; i < nAuthors; i++) {
            $("#authorList").append('<a href="author.html?parameter=' + authorArray[i].authorID + '" class="list-group-item list-group-item-action">' + authorArray[i].name + '</a>')
        }
    }


    function adjustBookPage(bookjson) {
        var book = JSON.parse(JSON.stringify(bookjson));
        $(".card-img").attr("src", book[0].image_path);
        document.getElementById("id").innerHTML = "Book" + " " + "#" + book[0].bookID;
        document.getElementById("name").innerHTML = book[0].name;
        document.getElementById("edition").innerHTML =
            book[0].edition;
        document.getElementById("cost").innerHTML =
            book[0].cost;
        createAuthorList(book[0].authors);
        createGenresList(book[0].genres);
        createThemesList(book[0].themes);
        createSimilarBookList(book[0].similarBooks);
    }

})
