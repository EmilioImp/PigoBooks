$(function (){
    
    var $username = $('#registerUsername');
    var $firstName = $('#registerFirstname');
    var $lastName = $('#registerLastname');
    var $password = $('#registerPassword');
    var $email = $('#registerEmail');
    var $phone = $('#registerPhoneNumber');
  
$('#submitButton').click(function(){
    
    var submitData = {
        username: $username.val(),
        firstName: $firstName.val(),
        lastName: $lastName.val(),
        email: $email.val(),
        password: $password.val(),
        phone: $phone.val(),
    };
    
    $.post("http://localhost:8080/xXEmilioXx/MyBookstore/1.0.0/user/register", submitData, function (response) {
        console.log(response);
    }, "json").done(function (data) {
        console.log(data);
    })

    /*$.ajax({
        type: "POST",
        url: "http://localhost:8080/xXEmilioXx/MyBookstore/1.0.0/user/register",
        data: JSON.stringify(submitData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    });*/
    
});
})