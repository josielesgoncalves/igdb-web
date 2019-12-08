class CatalogController{

    buildGamesItemList(gameList, catalogTitle) {
        var sectionGroup = ""
        var itemCount = 0;
        var sectionNumber = 0
        gameList.forEach(function (game, index) {
            if (itemCount == 0) {
                sectionGroup += `
                    <section id="${catalogTitle}${sectionNumber}">
                        <a href="#${catalogTitle}${sectionNumber - 1}">‹</a>
                            ${this.createGameDiv(game)}
                `;
                itemCount++;
            } else {
                sectionGroup += `
                        ${this.createGameDiv(game)}
                `;
                itemCount++;
            }

            if (itemCount == 5 || gameList.lenth == index + 1) {
                sectionGroup += `
                        <a href="#${catalogTitle}${sectionNumber + 1}">›</a>
                    </section>
                `;
                itemCount = 0;
                sectionNumber++;
            }
        }, this);
        return sectionGroup;
    };

    createGameDiv(game) {
        var div = `
            <div id="${game.name}" class="item">
                    <img src="${game.mediaDTO.headerImage}" />
            </div>
        `;
        return div;
    }

    addEventClick(data) {
        data.forEach(function (catalog, index) {
            catalog.gameDTOList.forEach(function (game, index) {
                document.getElementById(game.name).onclick = function() {
                    localStorage[game.name] = JSON.stringify(game)
                    window.location.href = `game-single.html?name=${game.name}`
                  }; 
            }, this);
        }, this);
    }

    createView(id, gameList, data) {
        document.getElementById(id).innerHTML += gameList;
        this.addEventClick(data);
        $(".loader").fadeOut();
        $("#preloder").delay(400).fadeOut("slow");
    }

}