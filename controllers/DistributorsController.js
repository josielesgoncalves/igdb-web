class DistributorsController {

    constructor(id) {
        this.distributorsList = ""
    
        this.catalogController = new CatalogController();
        this.getDistributors(id);
    }

    getDistributors(id) {
        Fetch.get('games/catalog/publishers').then(data => {
            this.distributorsList = data

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
