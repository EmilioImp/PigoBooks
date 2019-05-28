$(document).ready(function(){

    $.ajax({ //with this GET we receive a json array with the info regarding a particular author in the first position, while in the successive position we have an array containing all the author's books
        type : 'GET',
        url : '/xXEmilioXx/MyBookstore/1.0.0/author/' + getURLQueryParameter(), <!-- + authorid -->
        datatype : 'json',
        success : function (response) {
            createAuthorPage(response);
        }
    });

    function createBookList(booksarray){  //creates the list of all the books written by a specific author (with the links to each book's page)
        var i = 0;
        var nBooks = booksarray.length;

        for (i; i < nBooks; i++){
            $("#bookList").append('<a href="book.html?parameter=' + booksarray[i].bookID + '" class="list-group-item list-group-item-action">' + booksarray[i].name + '</a>')
        }
    }

    function createAuthorPage(authorjson) {
        var author = JSON.parse(JSON.stringify(authorjson)); //parsing the json object containing the info I need

        document.getElementById("authorName").innerHTML = author[0].firstName + " " + author[0].lastName; //dynamically creating the title
        $("#authorImg").attr("src", author[0].image_path); //adding the author's image
        createBookList(author[0].writtenBooks); //filling the list group
    }

    $("#biotext").show();
    $("#book-list").hide();

    //handling the case in which I am on Bio and I press on Books
    $("#books").click(function(){
        $("#bio").removeClass("active");
        $("#books").addClass("active");
        $("#book-list").show();
        $("#biotext").hide();
    });

    //handling the case in which I am on Books and I press on Bio
    $("#bio").click(function(){
        $("#books").removeClass("active");
        $("#bio").addClass("active");
        $("#biotext").show();
        $("#book-list").hide();
    });
})