$(document).ready(function () {



    $('#submitLoginButton').click(function () {
        const formArray = $('#loginForm').serializeArray();

        const returnArray = {};
        for (let i = 0; i < formArray.length; i++){
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
            }
        });
    });
});