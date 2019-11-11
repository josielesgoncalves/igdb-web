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
                '<h2>'+ gameTitle +'</h2>';

                var games = [];
                var gameName;
                var gameImage;
                for(var j = 0; j < data[i].gameDTOList.length; j++){
                    gameImage = data[i].gameDTOList[i].mediaDTO.headerImage;
                    gameName = data[i].gameDTOList[j].name;
                    
                    gameList = gameList + '<h5>' + gameName + '</h5>'+
                    '<img src='+ gameImage +'alt="#">' + '</div>';
                    
                    document.getElementById(this.id).innerHTML += gameList;                    
                    games.push({gameName, gameImage});                    
                }
                this.games.push({gameTitle, games});  
            }
            console.log(this.games);
        })
    }
}
