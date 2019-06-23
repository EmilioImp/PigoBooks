$(document).ready(function() {

    $.ajax({
        type: 'GET',
        url: '/xXEmilioXx/MyBookstore/1.0.0/book/bestSellers',
        datatype: 'json',
        success: function (response) {
            getFirstThreeBooks(response);
        }
    });

    function generateAuthorLinks(authorlist) {
        var j = 0;
        var string = "";
        for (j; j < authorlist[j].length-1; j++) {
            string = string + '<a href="author.html?parameter=' + authorlist[j].authorID + '"' + '>' + authorlist[j].firstName + ' ' + authorlist[j].lastName + '</a>' + + ', ';
        }
        string = string + '<a href="author.html?parameter=' + authorlist[j].authorID + '"' + '>' + authorlist[j].firstName + ' ' + authorlist[j].lastName + '</a>';
        return string;
    }

    function getFirstThreeBooks(response){
        var i = 0;
        const maxBooks=3
        var obj = JSON.stringify(response);
        var jsArray = JSON.parse(obj); //converting the json array in js objects array
        for (i; i<maxBooks-1;i++){
            $(".top-books").append('<div class="row featurette" id="top-book">\n' +
                '         <div class="col-md-7 order-md-2">\n' +
                '           <h2 class="featurette-heading">' + jsArray[i].name + '<span class="badge badge-secondary" id="position">' + jsArray[i].placement + '</span></h2>\n' +
                '           <p class="lead" id="authors">'+ generateAuthorLinks(jsArray[i].authors)
                +'</p>\n' +
                '         </div>\n' +
                '         <div class="col-md-5 order md-1">\n' +
                '           <img class="img-fluid" id="book-img" src="'+ jsArray[i].image_path +'" alt="book image">\n' +
                '         </div>\n' +
                '       </div>\n' +
                '         <hr class="featurette-divider">')
        }
    }


})
