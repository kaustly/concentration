// var memoryCards = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memoryCards = ["#659ECS", "#659ECS", "#8A9A83", "#8A9A83", "lemonchiffon", "lemonchiffon", "#9797A5", "#9797A5", "#AA97A5", "#AA97A5", "#7AC1ES", "#7AC1ES", "#416294", "#416294", "#111815", "#111815"]
var memoryValues = [];
var memoryIds = [];
var cardsFlipped = 0;
var time = 0;
var timerId = null;

Array.prototype.memoryCardShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}


function newBoard(){
	cardsFlipped = 0;
	var output = '';
    memoryCards.memoryCardShuffle();
	for(var i = 0; i < memoryCards.length; i++){
    memoryCard = memoryCards[i];
		output += '<div id="tile_'+i+'" onclick="memoryCardFlip(this,\''+memoryCard+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}
function memoryCardFlip(tile,cardColor){
	if(tile.innerHTML == "" && memoryValues.length < 2){
		// tile.style.background = '#DCECDC';
    tile.style.background = cardColor;
		// tile.innerHTML = cardColor;
		if(memoryValues.length == 0){
			memoryValues.push(cardColor);
			memoryIds.push(tile.id);
		} else if(memoryValues.length == 1){
			memoryValues.push(cardColor);
			memoryIds.push(tile.id);
			if(memoryValues[0] == memoryValues[1]){
				cardsFlipped += 2;
				// Clear both arrays
				memoryValues = [];
            	memoryIds = [];
				// Check to see if the whole board is cleared
				if(cardsFlipped == memoryCards.length){
					alert("generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();

				}
			} else {
				function flipBack(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memoryIds[0]);
				    var tile_2 = document.getElementById(memoryIds[1]);
				    tile_1.style.background = '#DCECDC';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = '#DCECDC';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memoryValues = [];
            	    memoryIds = [];
				}
				setTimeout(flipBack, 700);
			}
		}
	}
}
newBoard();
