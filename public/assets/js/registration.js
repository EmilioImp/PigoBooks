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


    $.ajax({
        type: "POST",
        url: "http://localhost:8080/xXEmilioXx/MyBookstore/1.0.0/user/register",
        data: JSON.stringify($('#registrationForm').serialize()),
        contentType: "application/json;",
        dataType: "json",
    });
    
});
})