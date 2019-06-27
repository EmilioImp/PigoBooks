$(document).ready(function(){

    $.ajax({
        type : 'GET',
        url : '/xXEmilioXx/MyBookstore/1.0.0/event',
        dataType : 'json',
        success : function(response){
            createPages(response);
        }
    });

    function createPages(response){
        var i = 0;
        var j = 0;
        var pageSize = 8;
        var obj = JSON.stringify(response);
        var jsArray = JSON.parse(obj);
        var arrayLength = jsArray.length;
        var pageCount =  arrayLength / pageSize;

        for( i; i < arrayLength; i++){
            $(".card-columns").append('<div class="card"><a href="event.html?parameter=' + jsArray[i].eventID + '" class="card-link"><img class="card-img" src="' + jsArray[i].image_path + '" alt="Card img cap"><div class="card-body"><h5 class="card-title">' + jsArray[i].name + " - " + jsArray[i].date + " - " + jsArray[i].time + '</h5></div></a></div>');
        }

        if (pageCount > 1){
            $(".pagination").append('<li id="first" class="page-item"><a href="#" aria-label="First"><span aria-hidden="true">&laquo;</span></a></li>');
        }

        for( j ; j < pageCount; j++){
            $(".pagination").append('<li class="page-item"><a href="#">'+(j+1)+'</a></li>');
        }

        if (pageCount > 1){
            $(".pagination").append('<li id="last" class="page-item"><a href="#" aria-label="Last"><span aria-hidden="true">&raquo;</span></a></li>');
        }

        if (pageCount === 1){
            $(".pagination li").first().find("a").addClass("current");
        }

        else {
            $(".pagination li").first().next().find("a").addClass("current");
        }

        showPage = function(page) {
            $(".card").hide();
            $(".card").each(function(n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        };

        showPage(1);

        $("#first").click(function() {
            $(".pagination li a").removeClass("current");
            $("#first").next().find("a").addClass("current");
            showPage(parseInt($("#first").next().find("a").text()))
        });

        $("#last").click(function() {
            $(".pagination li a").removeClass("current");
            $("#last").prev().find("a").addClass("current");
            showPage(parseInt($("#last").prev().find("a").text()))
        });

        $(".pagination li a").click(function() {
            $(".pagination li a").removeClass("current");
            $(this).addClass("current");
            showPage(parseInt($(this).text()))
        });
    }
});