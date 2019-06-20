$(document).ready(function() {

    $.ajax({
        type: 'GET',
        url: '/xXEmilioXx/MyBookstore/1.0.0/book/bestSellers',
        datatype: 'json',
        success: function (response) {
            adjustBestSellersPage(response);
        }
    });

    function getFirstThreeBooks(booksarray){
        
    }



    function adjustBestSellersPage(response) {

    }
})
