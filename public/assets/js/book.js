$(document).ready(function() {

    function breadCrumbDouble(lastPage, name){
        $("#orderedListBreadCrumb").append('' +
            '<li class="breadcrumb-item"><a href="'+ lastPage.url +'">'+ lastPage.name +'</a></li>' +
            '<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
    }

    function createBreadcrumb(name, url){

        if (!window.sessionStorage.getItem("lastPage")) {
            $("#orderedListBreadCrumb").append('<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
        }
        else {
            let lastPage = JSON.parse(window.sessionStorage.getItem("lastPage"));
            if (lastPage.name == name){
                const penultimePage =  JSON.parse(window.sessionStorage.getItem("penultimePage"));
                if (!penultimePage) $("#orderedListBreadCrumb").append('<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
                else{
                    lastPage = penultimePage;
                    breadCrumbDouble(lastPage, name);
                }
            }
            else{
                breadCrumbDouble(lastPage, name);
                window.sessionStorage.setItem("penultimePage",JSON.stringify({url: lastPage.url, name: lastPage.name}));
            }
        }
        window.sessionStorage.setItem("lastPage", JSON.stringify({url: url, name: name}));
    }

    $.ajax({
        type: 'GET',
        url: '/hypermedia2019/api/book/' + getURLQueryParameter(),
        datatype: 'json',
        success: function (response) {
            const book = JSON.parse(JSON.stringify(response));
            createBreadcrumb(book[0].name, 'book.html?parameter='+ getURLQueryParameter() +'');
            adjustBookPage(book);
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
        else $("#genreList").append('<p>This book has no specific genres</p>');
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
        if (nSimilarBooks > 0) {
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

            for (i = 0; i < nRandomSimilarBooks; i++) {
                $("#similarBooksList").append('<div class="card similar">\n' +
                    '    <img src="'+ randomSimilarBooksArray[i].image_path +'" class="card-img-top" alt="Book Image">\n' +
                    '    <div class="card-body">\n' +
                    '      <h5 class="card-title">' + '<a class="similarBookLink" href="book.html?parameter='+ randomSimilarBooksArray[i].bookID + '">' + randomSimilarBooksArray[i].name +'</a></h5>\n' +
                    '    </div>\n' +
                    '  </div>');
                //$("#similarBooksList").append('<a href="book.html?parameter=' + randomSimilarBooksArray[i].bookID + '" class="list-group-item list-group-item-action">' + randomSimilarBooksArray[i].name + '</a>');
            }
            $("#similarBooksList").append('</div>');
        }
        else $("#similarBooksRow").append('<p>This book has no similar books</p>');
    }

    function createAuthorList(authorArray) {
        var i = 0;
        var nAuthors = authorArray.length;

        if (nAuthors > 0) {
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
        if (nEvents > 0) {
            for (i; i < nEvents - 1; i++) {
                $("#eventList").append('<a href="event.html?parameter=' + eventArray[i].eventID + '">' + eventArray[i].name + '</a>' + ', ');
            }
            $("#eventList").append('<a href="event.html?parameter=' + eventArray[i].eventID + '">' + eventArray[i].name + '</a>');
        }
        else $("#eventList").append('<p>No events associated with this book</p>');

    }

    function createReviewList (reviewArray){
        var i = 0;
        var nReviews = reviewArray.length;
        if (nReviews > 0) {
            $("#reviewList").append('<hr class="featurette-divider">');
            for (i; i < nReviews; i++) {
                $("#reviewList").append('<p class="reviewBody">' + '"' + reviewArray[i].review + '"' + '</p><p>' + '-' +
                    reviewArray[i].reviewer + '-' + '</p><hr class="featurette-divider">');
            }
        }
        else $("#reviewList").append('<p>As of now there are no reviews of this book.</p>');
    }


    function adjustBookPage(book) {

        if (book[0].image_path===undefined)
            $(".card-img").attr("src", "../img/noImagePlaceholder.jpg");
        else
            $(".card-img").attr("src", book[0].image_path);

        if (book[0].name === undefined)
            document.getElementById("name").innerHTML = "Name not found";
        else
            document.getElementById("name").innerHTML = book[0].name;

        if (book[0].edition === undefined)
            document.getElementById("edition").innerHTML = "Edition not found";
        else
            document.getElementById("edition").innerHTML = book[0].edition;

        if (book[0].isbn === undefined)
            document.getElementById("isbn").innerHTML = "Isbn not found";
        else
            document.getElementById("isbn").innerHTML = book[0].isbn;

        if (book[0].cost === undefined)
            document.getElementById("cost").innerHTML = "Cost not found";
        else
            document.getElementById("cost").innerHTML = book[0].cost + " €";

        if (book[0].abstract === undefined)
            document.getElementById("abstractText").innerHTML = "Abstract not found";
        else
            document.getElementById("abstractText").innerHTML = book[0].abstract;

        if (book[0].authorInterview === null)
            document.getElementById("interviewText").innerHTML = "There are no interviews of the author available!";
        else
            document.getElementById("interviewText").innerHTML = book[0].authorInterview;

        createReviewList(book[0].reviews);
        createAuthorList(book[0].authors);
        createGenresList(book[0].genres);
        createThemesList(book[0].themes);
        createEventList(book[0].events);
        createSimilarBookList(book[0].similarBooks);

        $("#abstractContainer").show();
        $("#interviewContainer").hide();

        //handling the case in which I am on Abstract and I press on Author Interview
        $("#interview").click(function(){
            $("#abstract").removeClass("active");
            $("#interview").addClass("active");
            $("#interviewContainer").show();
            $("#abstractContainer").hide();
        });

        //handling the case in which I am on Author Interview and I press on Abstract
        $("#abstract").click(function(){
            $("#interview").removeClass("active");
            $("#abstract").addClass("active");
            $("#abstractContainer").show();
            $("#interviewContainer").hide();
        });
    }

    function noticePurchase(){
        // Add the "show" class to div
        $("#orderSuccess").addClass("show");

        // After 3 seconds, remove the show class from div
        setTimeout(function(){ $("#orderSuccess").removeClass("show"); }, 4000);
    }

    $('form').on('click', '#pressBuyBookButton', function () {

        // in case the user has not logged-in, the order is avoided and instead the user is directed toward the "Log-in" or "Registration" pages through a modal
        if (window.localStorage.getItem("accessToken") === null){
            $("#noAccount").modal('show');
            return;
        }

        const quantity = $('#formControlSelect.form-control').children("option:selected").val();
        const id = getURLQueryParameter();
        const returnObject = {bookID: parseInt(id), copies: parseInt(quantity)};
        const returnJSON = JSON.stringify(returnObject);

        $.ajax({
            type: "POST",
            url: "/hypermedia2019/api/user/cart/addBook",
            data: returnJSON,
            contentType: "application/json",
            headers : {'x-auth-token' : window.localStorage.getItem("accessToken")},
            success: function () {
                noticePurchase();
            }
        });
    });

});


