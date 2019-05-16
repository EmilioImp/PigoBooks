$(function (){

    var $username = $('#registerUsername');
    var $firstName = $('#registerFirstname');
    var $lastName = $('#registerLastname');
    var $password = $('#registerPassword');
    var $email = $('#registerEmail');
    var $phone = $('#registerPhoneNumber');

    $('#submitButton').click(function(){

        var formArray = $('#registrationForm').serializeArray();

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }

        console.log(JSON.stringify(returnArray));


        $.ajax({
            type: "POST",
            url: "/xXEmilioXx/MyBookstore/1.0.0/user/register",
            data: JSON.stringify(returnArray),
            contentType: "application/json",
            dataType: "json",
        });

    });
})
