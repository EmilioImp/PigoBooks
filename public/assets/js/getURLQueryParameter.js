function getURLQueryParameter(){
    var url_string = window.location.href; //saving the url of the actual page as string
    var url = new URL(url_string); //coding the url string as a real URL
    var param = url.searchParams.get("parameter"); //parameter is the general name given to every parameter used (authorid, bookid...)
    return param;
}

//es.  to be used when in a page like "https://helloworld.com/hello/findByWorld?world=earth" and there's the need to extract world's value from the url (earth in this case)