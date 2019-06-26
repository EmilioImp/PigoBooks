$(document).ready(function(){

    if (window.localStorage.getItem("accessToken")) {
        appendLoginDone();
    }


    function appendLoginDone(){
        const loginItem =$('#loginItem');
        loginItem.empty();
        loginItem.append('<h5> You are logged in </h5>' +
            '<a href="#" type="submit" class="btn btn-primary mb-2" id="submitLogoutButton">Log out</a>' +
            '<a href="../../pages/profile.html" type="submit" class="btn btn-primary mb-2" id="profileButton">My profile</a>' +
            '<a href="../../pages/shoppingcart.html">\n' +
            '<img src="../assets/img/baseline-shopping_cart-24px.svg" alt="cart">\n' +
            '</a>');

        $('#submitLogoutButton').click(function () {
            window.localStorage.removeItem("accessToken");
            window.location.href = "../../index.html";
        })
    }
});