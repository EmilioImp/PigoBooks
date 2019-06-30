$(document).ready(function(){

    if (window.localStorage.getItem("accessToken")) {
        appendLoginDone();
    }


    function appendLoginDone(){
        const loginItem =$('#loginItem');
        loginItem.empty();
        loginItem.append('<div id="avatarCard" class="card">' +
            '<div id="avatarRow" class="row">' +
            '<div class="col img">' +
            '<img src="../assets/img/img_avatar.png" alt="avatar" class="avatar">' +
            '</div>' +
            '<div class="col text">' +
            '<div class="nav-item dropdown">' +
            '<a class="nav-link dropdown-toggle" href="#" id="accountToggle" role="button" ' +
            'data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Account</a>' +
            '<div class="dropdown-menu" aria-labelledby="accountToggle">' +
            '<a class="dropdown-item" href="../../pages/profile.html">My profile</a>' +
            '<a class="dropdown-item" href="../../pages/orderhistory.html">My order history</a>' +
            '<a class="dropdown-item" href="../../pages/shoppingcart.html">My cart</a>' +
            '<a class="dropdown-item" id="submitLogoutButton" href="#" type="submit">Log-out</a>' +
            '</div>' +
            '</div>' +
            '</div>');

        $('#submitLogoutButton').click(function () {
            window.localStorage.removeItem("accessToken");
            window.location.href = "../../index.html";
        })
    }
});

/*'<div class="col cart">' +
            '<a href="../../pages/shoppingcart.html">' +
            '<img src="../assets/img/baseline-shopping_cart-24px.svg" alt="cart">'</a></div>

            '<a href="../../pages/profile.html">' +
 */