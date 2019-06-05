$(document).ready(function(){

    $.ajax({  //GET to receive the data regarding the event plus the book presented
        type : 'GET',
        url : '/xXEmilioXx/MyBookstore/1.0.0/event/1', /*+ getURLQueryParameter(),*/
        datatype : 'json',
        success : function(response) {
            adjustEventPage(response);
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

    function adjustEventPage(eventjson){
        var event = JSON.parse(JSON.stringify(eventjson));
        $(".card-img").attr("src", event[0].image_path); //saving the event's image
        document.getElementById("eventid").innerHTML = "Event" + " " + "#" + event[0].eventID;
        document.getElementById("eventname").innerHTML = event[0].name;
        document.getElementById("bookname").innerHTML = event[0].book.name;
        document.getElementById("location").innerHTML = event[0].location;
        document.getElementById("date").innerHTML = event[0].date;
        document.getElementById("time").innerHTML = event[0].time;
        document.getElementById("booklink").innerHTML = event[0].book.name;
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
        //$("#authorlink").innerHTML = event[0].authorFirstName + " " + event[0].authorLastName;
    }
});