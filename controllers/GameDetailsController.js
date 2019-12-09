class GameDetailsController {

    constructor(id) {       
        this.id = id;
        let gameValue = decodeURI(window.location.href.split('?name=')[1])
        let game = JSON.parse(localStorage[gameValue])
        
        var numero =  this.getReviewsNumber(game.name);
        this.reviews = "";
        this.gameDetails(game);
    }

    gameDetails(details) {   
    
        var totalRatings = details.positiveRatings + details.negativeRatings;
        var media = (details.positiveRatings/totalRatings) * 100;
        var rating = media.toFixed(2) + '%';
        var avaliacao = rating + ' das pessoas aprovam este jogo';

        var imagesList =  '<div>';
        for(var i = 0; i < details.mediaDTO.screenshotDTO.length; i++) {
            imagesList += `<a href="${details.mediaDTO.screenshotDTO[i].fullImage}">` + 
            `<img style="margin:10px; width:30%;height:30%;" src="${details.mediaDTO.screenshotDTO[i].fullImage}" /></a>`;
        }
        imagesList+= '</div>';

        var videoList =  '<div>';
        for(var i = 0; i < details.mediaDTO.videoDTO.length; i++) {
            videoList += `<a href="${details.mediaDTO.videoDTO[i].thumbnailVideo}">` + 
            `<img style="margin:10px; width:30%;height:30%;" src="${details.mediaDTO.videoDTO[i].fullImage}" /></a>`;
        }
        videoList+= '</div>';

        var gameItem = 
        '<div class="container">'+			
			'<div class="row">'+
                '<div class="col-xl-9 col-lg-8 col-md-7 game-single-content">' +                 
                    '<h2 class="gs-title">' + details.name + '</h2>'+
                    '<div class="game-single-preview">'+
				        '<img src="' + details.mediaDTO.headerImage + '" alt="">'+
                    '</div>'+
                    '<h4>Sobre</h4>'+
                    '<p>'+ details.description +'</p>'+
                    '<h4>Desenvolvedores</h4>'+
                    '<p>'+ details.developer +'</p>'+
                    '<h4>Publicador</h4>'+
                    '<p>'+ details.publisher +'</p>'+
                    '<h4>Gêneros</h4>'+
                    '<p>'+ details.genres +'</p>'+                    
                   	'<h4>Avaliações</h4>' + 
                    '<p>' + avaliacao + '</p>'+				
                    '<h4>Data de Lançamento</h4>' + 
                    '<p>' + details.releaseDate + '</p>'+
                    '<h4>Web Site</h4>' + 
                    `<p><a href="${details.website}">` + details.website + '</a></p>'+
                    '<h4>Sistema Recomendado</h4>' + 
                    '<p>' + details.minimumRequirement + '</p>'+	
                    '<h4>Imagens</h4>' + imagesList +
                    '<h4>Vídeos</h4>' + videoList +                                         
				'</div>'+				
            '</div>'+
            '<div class="row>' + 
                '<div class="col-xl-9 col-lg-8 col-md-7 game-single-content">' +                 
                    '<h2 style="color:white; font-size: 60px; margin-top: 70px;">' + "Review" + '</h2>'+

                '</div>'+
            '</div>'+
        '</div>';
        document.getElementById(this.id).innerHTML += gameItem;        
    }

    getReviewsNumber(gameName) {
        Fetch.get(`games/reviews/${gameName}/number`).then(data => {
            this.reviewsNumber = data
        })
        return this.reviewsNumber;
    }

    getReviews(gameTitle) {

        ;
        var gameReviewSearchDTO = {gameTitle: gameTitle, page: 1, size: 10, sortEnum: "RECENT"};
        Fetch.post(`games/reviews/${gameReviewSearchDTO}`).then(data => {
             var reviewsList = data;



        })
    }

}