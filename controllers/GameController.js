class GameController {

    constructor(id) {
        this.gameCatalogList = ""

        this.catalogController = new CatalogController();
    
        this.getAllGameCatalog(id);
    }

    getAllGameCatalog(id) {
        Fetch.get('games/catalog').then(data => {
            this.gameCatalogList = data

            var gameList = "";
            data.forEach(function (catalog, index) {
                gameList += `
                    <h1>${catalog.title}</h1>
                    <div class="wrapper">
                        ${this.catalogController.buildGamesItemList(catalog.gameDTOList, catalog.title)}
                    </div>
                `
            }, this);

            this.catalogController.createView(id, gameList, data);
        })
    };
}
