$(document).ready(function () {

    const name = "Login";
    const url = "login.html";

    if (!window.sessionStorage.getItem("lastPage")) {
        $("#orderedListBreadCrumb").append('<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
    }
    else {
        const lastPage = JSON.parse(window.sessionStorage.getItem("lastPage"));
        $("#orderedListBreadCrumb").append('' +
            '<li class="breadcrumb-item"><a href="'+ lastPage.url +'">'+ lastPage.name +'</a></li>' +
            '<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
    }
    window.sessionStorage.setItem("lastPage", JSON.stringify({url: url, name: name}));

    $('#submitLoginButton').click(function () {
        const formArray = $('#loginForm').serializeArray();

        const returnArray = {};
        for (let i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }

        $.ajax({
            type: "POST",
            url: "/hypermedia2019/api/user/login",
            data: JSON.stringify(returnArray),
            contentType: "application/json",
            error: function (response) {
                $("#loginFailedAlert").modal();
            },
            success: function (response) {
                const obj = JSON.stringify(response);
                const jsArray = JSON.parse(obj);
                window.localStorage.setItem("accessToken", jsArray.token);
                window.location.href = "../../index.html"
            }
        });
    });
});