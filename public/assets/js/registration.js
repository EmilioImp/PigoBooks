$(function (){

    $('#submitRegisterButton').click(function(){

        const formArray = $('#registrationForm').serializeArray();

        const returnArray = {};
        for (let i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }

        $.ajax({
            type: "POST",
            url: "/xXEmilioXx/MyBookstore/1.0.0/user/register",
            data: JSON.stringify(returnArray),
            contentType: "application/json",
            error: function (response) {
                $("#registrationFailedAlert").modal();
            },
        });

    });
});
