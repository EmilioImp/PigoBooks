$(document).ready(function () {

    const name = "Ordering and shipping info";
    const url = "ordering&shipping.html";

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

});