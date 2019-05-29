$(document).ready(function(){

    $.ajax({
        type : 'GET',
        url : '/xXEmilioXx/MyBookstore/1.0.0/user/cart',
        datatype : 'json',
        headers : {'x-auth-token' : window.localStorage.getItem("accessToken")},
        success : function(response){
            visualizeShoppingCart(response);
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

    var pressedDelete; //ID of the book whose remove-item button has been pressed

    function deleteBook(bookID){
        $.ajax({
            type : 'DELETE',
            url : '/xXEmilioXx/MyBookstore/1.0.0/user/cart/deleteBook/' + bookID,
            headers : {'x-auth-token' : window.localStorage.getItem("accessToken")},
            success : function(){
                $("button[id=" + bookID + "]").parent().parent().parent().remove();
            }
        })
    }

    function orderAllBooks(){
        $.ajax({
            type : 'POST',
            url : '/xXEmilioXx/MyBookstore/1.0.0/user/cart/buyBooks',
            headers : {'x-auth-token' : window.localStorage.getItem("accessToken")},
            success : function(){
                $("#booksCol").children().remove();
                $("#actionsCol").children().remove();
                $("#booksCol").append('<hr class="featurette-divider">');
                $("#actionsCol").append('<hr class="featurette-divider">');
                $(".container-cart").append('<div class="featurette"><h1 class="error-emoji text-faded">' + "\\(o_o)/" + '</h1><p class="lead text-faded"' + '' +
                    'id="empty-cart">Your shopping cart is empty!<br>But you can click <a id="orderHistoryEmptyPageLink" href="orderhistory.html">here</a> to see your order history!' +
                    '</p><hr class="featurette-divider"></div>');
            }
        })

    }

    function visualizeShoppingCart(response){
        var i = 0;
        var j = 0;
        var pageSize = 4;
        var obj = JSON.stringify(response);
        var jsArray = JSON.parse(obj); //converting the json array in js objects array
        var arrayLength = jsArray.length;
        var pageCount = arrayLength / pageSize;

        $("#booksCol").append('<hr class="featurette-divider">');
        $("#actionsCol").append('<hr class="featurette-divider">');
        if (arrayLength === 0){    //empty cart
            $(".container-cart").append('<div class="featurette"><h1 class="error-emoji text-faded">' + "\\(o_o)/" + '</h1><p class="lead text-faded" id="empty-cart">' +
                'Your shopping cart is empty!<br>But you can click <a id="orderHistoryEmptyPageLink" href="orderhistory.html">here</a> to see your order history!</p><hr class="featurette-divider"></div>');
        }
        else {
            for (i; i < arrayLength; i++){
                $("#booksCol").append('<div class="featurette"><div class="row no-gutters"><div class="col-10">' +
                    '<img class="featurette-image pull-left" alt="100x100" src="' + jsArray[i].image_path + '">' +
                    '<h4 class="featurette-heading">' +
                    '<a href="book.html?parameter=' + jsArray[i].bookID + '">' + jsArray[i].name + '</a></h4>' +
                    '<span class="muted">' + addAuthorNames(jsArray, i) + '</span></div><div class="col-2">' +
                    '<p class="nCopies text-right">' + "Copies: " + jsArray[i].copies + '</p>' +
                    '<button type="button" id="' + jsArray[i].bookID + '" class="icon-btn pull-right" data-toggle="modal" data-target="#itemDeletionAlert">' +
                    '<i class="material-icons">remove_shopping_cart</i>' +
                    '</button></div></div><hr class="featurette-divider"></div>'
                );
            }
            $("#booksCol").append('<nav aria-label="page-navigation"><ul class="pagination justify-content-center"></ul></nav>');

            $("#actionsCol").append('<div class="row"><div id="orderHistory" class="card"><h4 class="action">Order History</h4><p>Press the button down here to see all the past orders made with this account:<br></p>' +
                '<a href="orderhistory.html" type="button" class="btn btn-primary"><i class="material-icons">history</i></a></div></div>' +
                '<div class="row"><div id="orderBooks" class="card"><h4 class="action">Order all books</h4><p>Press the button down here to complete your order of all the books in the cart:</p>' +
                '<a id="order" href="#" type="button" class="btn btn-primary"><i class="material-icons">library_books</i></a></div></div>');

            if (pageCount > 1){
                $(".pagination").append('<li id="first" class="page-item"><a href="#" aria-label="First"><span aria-hidden="true">&laquo;</span></a></li>');
            }

            for( j ; j < pageCount; j++){
                $(".pagination").append('<li class="page-item"><a href="#">'+(j+1)+'</a></li>');
            }

            if (pageCount > 1){
                $(".pagination").append('<li id="last" class="page-item"><a href="#" aria-label="Last"><span aria-hidden="true">&raquo;</span></a></li>');
            }

            if (pageCount === 1){
                $(".pagination li").first().find("a").addClass("current");
            }

            else {
                $(".pagination li").first().next().find("a").addClass("current");
            }

            showPage = function(page) {
                $(".featurette").hide();
                $(".featurette").each(function(n) {
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

            //handling of clicks on generic numerical indexes
            $(".pagination li a").click(function() {
                $(".pagination li a").removeClass("current");
                $(this).addClass("current");
                showPage(parseInt($(this).text()))
            });

            $("#booksCol").on('click', '.icon-btn', function(){
                if (typeof(Storage) !== "undefined"){
                    window.sessionStorage.setItem("pressedDelete", $(this).attr("id"));
                }
                else {
                    pressedDelete = $(this).attr("id");
                }
            });

            $("#acceptModal").click(function(){
                if (typeof(Storage) !== "undefined"){
                    deleteBook(sessionStorage.getItem("pressedDelete"));
                }
                else {
                    deleteBook(pressedDelete);
                }
            });


            $("#orderBooks").on('click','a#order.btn.btn-primary', function(){
                orderAllBooks();
            })
        }
    }
});
