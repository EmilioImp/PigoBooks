$(document).ready(function () {



    $.ajax({
        type : 'GET',
        url : '/xXEmilioXx/MyBookstore/1.0.0/user',
        datatype : 'json',
        headers : {'x-auth-token' : window.localStorage.getItem("accessToken")},
        success : function(response){
            visualizeProfile(response);
        }
    });




    function visualizeProfile(response) {
        var obj = JSON.stringify(response);
        var jsArray = JSON.parse(obj); //converting the json array in js objects array
        var arrayLength = jsArray.length;

        for(let i=0; i < arrayLength; i++){
            $('#profileContainer').append('<div class="card">' +
                '<div class="row">' +
                '<div class="col">' +
                '<div class="card-text"><h5>Your username:</h5></div>' +
                '</div>' +
                '<div class="col">' +
                '<h5>' + jsArray[i].username + '</h5>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col">' +
                '<div class="card-text"><h5>Your first name:</h5></div>' +
                '</div>' +
                '<div class="col">' +
                '<h5>' + jsArray[i].firstName + '</h5>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col">' +
                '<div class="card-text"><h5>Your last name:</h5></div>' +
                '</div>' +
                '<div class="col">' +
                '<h5>' + jsArray[i].lastName + '</h5>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col">' +
                '<div class="card-text"><h5>Your email:</h5></div>' +
                '</div>' +
                '<div class="col">' +
                '<h5>' + jsArray[i].email + '</h5>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col">' +
                '<div class="card-text"><h5>Your phone number:</h5></div>' +
                '</div>' +
                '<div class="col">' +
                '<h5>' + jsArray[i].phone + '</h5>' +
                '</div>' +
                '</div>' +
                '</div>'
                );
        }
    }



});