$(document).ready(function(){

    $.ajax({
        type : 'GET',
        url : '/xXEmilioXx/MyBookstore/1.0.0/author',
        dataType : 'json',
        success : function(response){
            console.log(response);
            createPages(response);
        }
    });

    function createPages(response){
        var i = 0;
        var j = 0;
        var pageSize = 10; //max number of Author elements per page
        var obj = JSON.stringify(response);
        var jsArray = JSON.parse(obj); //converting the json array in js objects array
        var arrayLength = jsArray.length;
        var pageCount =  arrayLength / pageSize; //pages necessary to contain all the authors

        for( i; i < arrayLength; i++){  //for each element in the array I create a card with a link to the author's page, his/her image and his/her name
            $(".card-columns").append('<div class="card"><a href="author.html?parameter=' + jsArray[i].authorID + '" class="card-link"><img class="card-img" src="' + jsArray[i].image_path + '" alt="Card img cap"><div class="card-body"><h5 class="card-title">' + jsArray[i].firstName + " " + jsArray[i].lastName + '</h5></div></a></div>');
        }

        //if pageCount > 1 I must append the << symbol first
        if (pageCount > 1){
            $(".pagination").append('<li id="first" class="page-item"><a href="#" aria-label="First"><span aria-hidden="true">&laquo;</span></a></li>');
        }

        for( j ; j < pageCount; j++){ //creating the necessary number of pages to contain the authors
            $(".pagination").append('<li class="page-item"><a href="#">'+(j+1)+'</a></li>');
        }

        //after the creation of the pagination, if pageCount > 1 I add the >> symbol
        if (pageCount > 1){
            $(".pagination").append('<li id="last" class="page-item"><a href="#" aria-label="Last"><span aria-hidden="true">&raquo;</span></a></li>');
        }

        //if there's only one page, then I won't have created the >> e << symbols and so the first page will be "current"
        if (pageCount === 1){
            $(".pagination li").first().find("a").addClass("current");
        }

        //if there is more than one page, I'll have to skip >> while deciding which page is "current"
        else {
            $(".pagination li").first().next().find("a").addClass("current");
        }

        showPage = function(page) {
            $(".card").hide();
            $(".card").each(function(n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        //handling the click on <<
        $("#first").click(function() {
            $(".pagination li a").removeClass("current");
            $("#first").next().find("a").addClass("current");
            showPage(parseInt($("#first").next().find("a").text()))
        });

        //handling the click on >>
        $("#last").click(function() {
            $(".pagination li a").removeClass("current");
            $("#last").prev().find("a").addClass("current");
            showPage(parseInt($("#last").prev().find("a").text()))
        });

        //handling of clicks on generic numerical indexes
        $(".pagination li a").click(function() {
            $(".pagination li a").removeClass("current");
            $(this).addClass("current");
            showPage(parseInt($(this).text()))
        });
    }
});