$(function (){

    $('#submitButton').click(function(){

        var formArray = $('#registrationForm').serializeArray();

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }

        $.ajax({
            type: "POST",
            url: "/xXEmilioXx/MyBookstore/1.0.0/user/register",
            data: JSON.stringify(returnArray),
            contentType: "application/json",
            dataType: "json",
        });

    });
});
