$(document).ready(function (){

    function breadCrumbDouble(lastPage, name){
        $("#orderedListBreadCrumb").append('' +
            '<li class="breadcrumb-item"><a href="'+ lastPage.url +'">'+ lastPage.name +'</a></li>' +
            '<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
    }

    const name = "Registration";
    const url = "registration.html";

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

    $('#submitRegisterButton').click(function(){

        const formArray = $('#registrationForm').serializeArray();

        const returnArray = {};
        for (let i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }

        $.ajax({
            type: "POST",
            url: "/hypermedia2019/api/user/register",
            data: JSON.stringify(returnArray),
            contentType: "application/json",
            error: function (response) {
                $("#registrationFailedAlert").modal();
            },
            success: function (response) {
                window.location.href = "../../index.html"
            }
        });

    });
});
