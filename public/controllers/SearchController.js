class SearchController {

    constructor(id) {
        this.searchPreview = "";
    
        this.searchGames(id);

       
    }

    searchGames(id) {
         Fetch.get('games/search', {value: 'free to play', size: 1, page: 1}).then(data => {
            this.searchPreview = data;

           // document.getElementById(id).innerHTML += searchPreview;
            $(".loader").fadeOut();
            $("#preloder").delay(400).fadeOut("slow");
           
        })
        
    };   
}
