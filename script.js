var memoryCards = ['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h','i','i','j','j','k','k'];

Array.prototype.memory_card_shuffle = function() {
  var i = this.length, k, temp;
  while(--i > 0) {
    k = Math.floor(Math.random() * (i+1));
    temp = this[k];
    this[k] = this [i];
    this [i] = temp;
  }
}
  for(var i= 0; i <memoryCards.length; i++) {
    $(".card").eq(i).html(memoryCards[i]);
  }
function newBoard() {
  cardsFlipped= 0;
  var output = '';
  memoryCards.memory_card_shuffle();
  for(var i = 0; i < memory_cards.length; i++) {
    output += '<div id="card_'+i+'" onclick="memoryFlipCard"(this,\''+memoryCards[i]+'\')"></div>';
  }
  document.getElementById('memoryBoard').innerHTML = output;
}
