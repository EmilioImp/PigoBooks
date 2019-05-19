$(document).ready(function(){

    if (window.localStorage.getItem("accessToken")) {
        appendLoginDone();
    }


    function appendLoginDone(){
        const loginItem =$('#loginItem');
        loginItem.empty();
        loginItem.append('<h5> You are logged in </h5>' +
            '<a href="#" type="submit" class="btn btn-primary mb-2" id="submitLogoutButton">Log out</a>');

        $('#submitLogoutButton').click(function () {
            window.localStorage.removeItem("accessToken");
            location.reload();
        })
    }


    $('#submitLoginButton').click(function () {
        const formArray = $('#loginForm').serializeArray();

        const returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }

        $.ajax({
            type: "POST",
            url: "/xXEmilioXx/MyBookstore/1.0.0/user/login",
            data: JSON.stringify(returnArray),
            contentType: "application/json",
            error: function (response) {
                console.log(response.responseText);
            },
            success: function (response) {
                const obj = JSON.stringify(response);
                const jsArray = JSON.parse(obj);
                window.localStorage.setItem("accessToken", jsArray.token);
                appendLoginDone();
            }
        });
    });
});