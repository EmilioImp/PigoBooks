$(document).ready(function () {


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
                '<img class="card-img" src="' + jsArray[i].books[j].image_path + '">' +
                '</div>' +
                '<div class="col title">' +
                '<h5 class="card-title"><a href="book.html?parameter=' + jsArray[i].books[j].bookID + '" >' + jsArray[i].books[j].name + '</a> </h5>' +
                '<p class="bookInfo">BookID: #' + jsArray[i].books[j].bookID + '</p>' +
                '</div>' +
                '<div class="col copies">' +
                '<p class="bookInfo">Copies: ' + jsArray[i].books[j].copies + '</p>' +
                '</div>' +
                '</div>';

            if (j + 1 < numberOfBooks) {
                books = books + '<hr>';
            }
        }
        return books;
    }


    function visualizeOrders(response) {
        var obj = JSON.stringify(response);
        var jsArray = JSON.parse(obj); //converting the json array in js objects array
        var arrayLength = jsArray.length;


        for(let i = 0; i < arrayLength; i++){
            $('#ordersContainer').append('<div class="card">' +
                '<div class="card-header"><p class="lead">Date of order: ' + jsArray[i].date + '</p></div>' +
                visualizeBooks(jsArray, i) + '</div>');
        }
    }





});