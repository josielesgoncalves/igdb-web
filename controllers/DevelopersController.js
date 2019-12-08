class DevelopersController {

    constructor(id) {
        this.developersList = ""

        this.catalogController = new CatalogController();
    
        this.getDevelopers(id);
    }

    getDevelopers(id) {
        Fetch.get('games/catalog/developers').then(data => {
            this.developersList = data

            var gameList = "";
            data.forEach(function (distributors, index) {
                gameList += `
                    <h1>${distributors.title}</h1>
                    <div class="wrapper">
                        ${this.catalogController.buildGamesItemList(distributors.gameDTOList, distributors.title)}
                    </div>
                `
            }, this);

            this.catalogController.createView(id, gameList, data);
        })
    };   
}
