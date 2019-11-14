class GameDetailsController {

    constructor(id) {       
        this.id = id;
        this.gameDetails(details);
    }

    gameDetails(details) {       
        var gameItem = 
        '<div class="container">'+			
			'<div class="row">'+
				'<div class="col-xl-9 col-lg-8 col-md-7 game-single-content">' + 
					'<h2 class="gs-title">' + details.name + '</h2>'+
					'<h4>Sobre</h4>'+
                    '<p>'+ details.description +'</p>'+
                    '<div class="game-single-preview">'+
				        '<img src="' + details.mediaDTO.headerImage + '" alt="">'+
                    '</div>'+
                    // TODO: ADICIONAR AVALIAÇÕES, DATA DE LANÇAMENTO, WEBSITE, SO's, IMAGENS E VÍDEOS
					'<h4>Sistema Recomendado</h4>' + 
					'<p>' + details.minimumRequirement + '</p>'+					
				'</div>'+				
			'</div>'+
        '</div>';
        document.getElementById(this.id).innerHTML += gameItem;
        }
}