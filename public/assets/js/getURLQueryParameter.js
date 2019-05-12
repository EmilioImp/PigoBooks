function getURLQueryParameter(){
    var url_string = window.location.href; //salvo in url_string l'url di questa pagina sotto forma di stringa
    var url = new URL(url_string); //lo faccio codificare come effettivo URL
    var param = url.searchParams.get("eventID");
    return param;
}

//es. sono in una pagina con URL "https://helloworld.com/hello/findByWorld?world=earth" e voglio ottenere il valore di world (earth in questo caso)