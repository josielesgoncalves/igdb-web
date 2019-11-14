class GameController {

    constructor(id) {
        this.getAllGameCatalog(id);        
    }

    getAllGameCatalog(id) {
        Fetch.get('games/catalog').then(data => {

            var gameList  = "";                            
            for(var i = 0; i < data.length; i++) {    
                gameList = '<div class="game-item">'+ 
                '<h2>'+  data[i].title +'</h2>';
                for(var j = 0; j < data[i].gameDTOList.length; j++){
                    gameList = gameList + '<div><h5>' + data[i].gameDTOList[j].name + '</h5>'+
                    '<a href="/game-single"><img src='+ data[i].gameDTOList[j].mediaDTO.headerImage +'alt="#"></a></div>';                
                }
                document.getElementById(id).innerHTML += gameList + '</div>';                    
            }
        })
    };
}
