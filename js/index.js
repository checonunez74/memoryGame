// Memory Game
// © 2017 Sergio H. Nunez
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)


(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// algorithem to animate tiles and match pairs kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},
        
        // Found this while loop Online to 
        // move the tiles arround so they don't be 
        // in the same place for every game.
		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\ alt="'+ v.name +'" /></div>\
				<div  class="back"><img src="AMBIT_526_NEW.jpg"\ alt="Team526" align="buttom" /></div></div>\</div>';
			});
			return frag;
		}
	};
    
    //Objects array for all tiles in the game
	var cards = [
		{
			name: "AmbitCare",
			img: "images/ambit care.JPG",
			id: 1,
		},
		{
			name: "7benefits",
			img: "images/7benefi.jpg",
			id: 2
		},
		{
			name: "Canada",
			img: "images/canada.jpg",
			id: 3
		},
		{
			name: "jquery",
			img: "images/9D166F4A-3F99-4187-ACE5-EF09734F49C8-867-0000017640A890AC.jpeg",
			id: 4
		}, 
		{
			name: "JDpowers",
			img: "images/ambit-energy-jd-powers.jpg",
			id: 5
		},
		{
			name: "ChrisBoss",
			img: "images/Chris.jpg",
			id: 6
		},
		{
			name: "OldLogo",
			img: "images/AMBIT_526_ORIG.jpg",
			id: 7
		},
		{
			name: "Japan",
			img: "images/Japan.jpg",
			id: 8
		},
		{
			name: "JerreBoss",
			img: "images/jerre.jpg",
			id: 9
		},
		{
			name: "NewLogo",
			img: "images/logo.png",
			id: 10
		},
		{
			name: "MobileApp",
			img: "images/MobileApp.jpg",
			id: 11
		},
		{
			name: "PowerUp",
			img: "images/PowerUp.jpg",
			id: 12
		},
	];
    
	Memory.init(cards);


})();