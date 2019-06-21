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
            $("#similarBooksList").append('<a href="book.html?parameter=' + randomSimilarBooksArray[i].bookID + '" class="list-group-item list-group-item-action">' + similarBooksArray[i].name + '</a>')
        }
    }

    function createAuthorList(authorArray) {
        var i = 0;
        var nAuthors = authorArray.length;


        for (i; i < nAuthors; i++) {
            $("#authorList").append('<a href="author.html?parameter=' + authorArray[i].authorID + '">' + authorArray[i].firstName + ' ' + authorArray[i].lastName + '</a>')
        }

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

})
