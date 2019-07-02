$(document).ready(function () {

    function breadCrumbDouble(lastPage, name){
        $("#orderedListBreadCrumb").append('' +
            '<li class="breadcrumb-item"><a href="'+ lastPage.url +'">'+ lastPage.name +'</a></li>' +
            '<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
    }

    const name = "My profile";
    const url = "profile.html";

    if (!window.sessionStorage.getItem("lastPage")) {
        $("#orderedListBreadCrumb").append('<li class="breadcrumb-item active" aria-current="page">'+ name +'</li>');
    }
    else {
        let lastPage = JSON.parse(window.sessionStorage.getItem("lastPage"));
        if (lastPage.name === name){
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

    $.ajax({
        type : 'GET',
        url : '/hypermedia2019/api/user',
        datatype : 'json',
        headers : {'x-auth-token' : window.localStorage.getItem("accessToken")},
        success : function(response){
            visualizeProfile(response);
        }
    });




    function visualizeProfile(response) {
        const obj = JSON.stringify(response);
        const jsArray = JSON.parse(obj); //converting the json array in js objects array

        document.getElementById("username").innerHTML = jsArray[0].username;
        document.getElementById("firstName").innerHTML = jsArray[0].firstName;
        document.getElementById("lastName").innerHTML = jsArray[0].lastName;
        document.getElementById("email").innerHTML = jsArray[0].email;
        document.getElementById("phone").innerHTML = jsArray[0].phone;


    }


    $('#acceptModal').click(function () {

        $.ajax({
            type: 'DELETE',
            url: '/hypermedia2019/api/user/unregister',
            datatype : 'json',
            headers : {'x-auth-token' : window.localStorage.getItem("accessToken")},
            success: function(response){
                window.localStorage.removeItem("accessToken");
                window.location.href = "../../index.html"
            }
        })
    })



});