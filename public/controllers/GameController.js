class GameController {

    constructor(id){
        this.id = id;
        this.getAllGameCatalog();
        this.games = [];
    }

    getAllGameCatalog() {
        Fetch.get('games/catalog').then(data => {

            var gameList  = "";
                            
            for(var i = 0; i < data.length; i++) {    
                var gameTitle = data[i].title;                
                gameList = '<div class="game-item">'+ 
                '<h2>'+  data[i].title +'</h2>';

                var games = [];
                var gameName;
                var gameImage;
                for(var j = 0; j < data[i].gameDTOList.length; j++){
                    gameImage = data[i].gameDTOList[j].mediaDTO.headerImage;
                    gameName = data[i].gameDTOList[j].name;
                    
                    gameList = gameList + '<h5>' + data[i].gameDTOList[j].name + '</h5>'+
                    '<img src='+ data[i].gameDTOList[j].mediaDTO.headerImage +'alt="#">' + '</div>';
                    games.push({gameName, gameImage});                    
                }
                document.getElementById(this.id).innerHTML += gameList;                    
            }
        })
    }
}
