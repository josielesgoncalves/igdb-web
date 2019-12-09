class GameDetailsController {

    constructor(id) {       
        this.id = id;
        let gameValue = decodeURI(window.location.href.split('?name=')[1])
        let game = JSON.parse(localStorage[gameValue])
        
        this.reviews = "";
        this.reviewsNumber = 0;


        this.getReviewsNumber(game.name);
        this.getReviews(game.name);
        this.createAnalisisChart(game.positiveRatings, game.negativeRatings)

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
                    '<h4>Data de Lançamento</h4>' + 
                    '<p>' + details.releaseDate + '</p>'+
                    '<h4>Web Site</h4>' + 
                    `<p><a href="${details.website}">` + details.website + '</a></p>'+
                    '<h4>Sistema Recomendado</h4>' + 
                    '<p>' + details.minimumRequirement + '</p>'+	
                    '<h4>Imagens</h4>' + imagesList +
                    '<h4>Vídeos</h4>' + videoList +
                    '<hr style="background-color:white;">'+                                        
                    `<div><h2 class="gs-title">Análises</h2>
                    <h4>Total de Avaliações: <label style="color: white;"> ${totalRatings}</label></h4> 
                    <h4>${avaliacao}</h4>
                    <div style="display: flex; align-items: center;">${this.chart}</div>
                    </div>
                    <div>                    
                    </div>
                    ${this.reviews}` 
				'</div>'+				
            '</div>'+            
            
            
        '</div>';
        document.getElementById(this.id).innerHTML += gameItem;        
    }

    getReviewsNumber(gameName) {
        Fetch.get(`games/reviews/${gameName}/number`).then(data => {
            this.reviewsNumber = data;
        })
    }

    getReviews(gameTitle) {

        var gameReviewSearchDTO = {gameTitle: gameTitle, page: 1, size: 10, sortEnum: "RECENT"};
        Fetch.post(`games/reviews/`, gameReviewSearchDTO).then(data => {
             if(data != null && data.length > 0){    
                this.createReviewDiv(data);
             }
             else{return;}
        })
    }

    createReviewDiv(listDto){
        this.reviews = `<div class="container">`;
        listDto.forEach(function (dto, index) {
            this.reviews+=
            `<div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
                            <p class="text-secondary text-center">${dto.datePosted}</p>
                        </div>
                        <div class="col-md-10">
                            <p>
                                <strong>${dto.userName}</strong>
                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>

                            </p>
                            <div class="clearfix"></div>
                            <p>${dto.review}</p>
                            <p>
                            <a class="float-right btn btn-outline-primary ml-2"> <i class="fa fa-reply"></i> Reply</a>
                            <a class="float-right btn text-white btn-danger"> <i class="fa fa-heart"></i> Like</a>
                            </p>
                        </div>
                    </div>	        	
                </div>
            </div>`            
        });
        
            
        this.reviews+= `</div>`;
    }

    createAnalisisChart(positiveRatings, negativeRatings){
        
        
        var total = positiveRatings + negativeRatings;
        var percentValue = parseInt((positiveRatings * 100) / total);
        var over50 = '';
        if (percentValue > 50) {
            over50 = 'over50';
            percentValue = percentValue > 100 ? 100 : percentValue;
        }        
        
        this.chart =       
            `<span class="outer-circle" style= " margin-right: 30px;height:${parseInt((positiveRatings/total)*500)}px; width:${parseInt((positiveRatings/total)*500)}px;">
             <div style="margin-top: 100px; color: white;">Avaliações positivas: <br>${((positiveRatings/total)*100).toFixed(2)}%</div> </span>
            <span class="positive-circle" style="height:${parseInt((negativeRatings/total)*500)}px; width:${parseInt((negativeRatings/total)*500)}px;">
            <div style="margin-top: 100px; color: white;">Avaliações negativas:  <br>${((negativeRatings/total)*100).toFixed(2)}%</div></span>` ; 

    }


}