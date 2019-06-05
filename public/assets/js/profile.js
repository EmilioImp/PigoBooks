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
        const obj = JSON.stringify(response);
        const jsArray = JSON.parse(obj); //converting the json array in js objects array

        document.getElementById("username").innerHTML = jsArray[0].username;
        document.getElementById("firstName").innerHTML = jsArray[0].firstName;
        document.getElementById("lastName").innerHTML = jsArray[0].lastName;
        document.getElementById("email").innerHTML = jsArray[0].email;
        document.getElementById("phone").innerHTML = jsArray[0].phone;


    }



});