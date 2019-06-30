$(document).ready(function(){

    function createBreadcrumb(name, url){

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
    }

    $.ajax({  //GET to receive the data regarding the event plus the book presented
        type : 'GET',
        url : '/xXEmilioXx/MyBookstore/1.0.0/event/' + getURLQueryParameter(),
        datatype : 'json',
        success : function(response) {
            const event = JSON.parse(JSON.stringify(response));
            createBreadcrumb(event[0].name, 'event.html?parameter='+ getURLQueryParameter() +'')
            adjustEventPage(event);
        }
    });

    function iconControl(){
        $("#noPages").hide();
        $("a.socialicon i").hide();
        $("a.socialicon").each(function(){
            if ($(this).attr("href") !== '#'){
                $(this).find('i').show();
            }
        });
    }

    function adjustEventPage(event){
        $(".card-img").attr("src", event[0].image_path); //saving the event's image
        document.getElementById("eventid").innerHTML = "Event" + " " + "#" + event[0].eventID;
        document.getElementById("eventname").innerHTML = event[0].name;
        document.getElementById("bookname").innerHTML = event[0].book.name;
        document.getElementById("location").innerHTML = event[0].location;
        document.getElementById("date").innerHTML = event[0].date;
        document.getElementById("time").innerHTML = event[0].time;
        document.getElementById("booklink").innerHTML = event[0].book.name;
        document.getElementById("eventInfo").innerHTML = event[0].description;
        $("#booklink").attr("href", "book.html?parameter=" + event[0].book.bookID);
        $("#bookmarkLink").attr("href", "book.html?parameter=" + event[0].book.bookID);
        //lines of code dynamically showing social icons IF their value in the database is different from #
        $("#facebookIcon").attr("href", event[0].fblink);
        $("#instagramIcon").attr("href", event[0].instagramlink);
        $("#twitterIcon").attr("href", event[0].twitterlink);

        if ($("#facebookIcon").attr("href") === '#' && $("#instagramIcon").attr("href") === '#' && $("#twitterIcon").attr("href") === '#'){
            $("a.socialicon i").hide();  //if there are no social pages regarding the event, we hide all the icons and only keep the text
        }
        else {  //otherwise, we hide the text and only show the icons for the socials on which the event has a page
            iconControl();
        }
    }
});