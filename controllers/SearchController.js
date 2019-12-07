class SearchController {

    constructor(id) {
        this.searchPreview = "";
    
        this.searchGames(id);

       
    }

    searchGames(id) {
        let value = "valve";
        let size = 2;
        let page = 0;
         Fetch.get("games/search?value=counter&size=10&page=0").then(data => {
            this.searchPreview = data;

           // document.getElementById(id).innerHTML += searchPreview;
            $(".loader").fadeOut();
            $("#preloder").delay(400).fadeOut("slow");
           
        })
        
    };   
}
