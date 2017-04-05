var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
window.savedImage = {};
Jimp.read('./img/IMG_3431 FINAL.jpg', function (err, img) {
    console.log(img);
    function convert(integer) {
        var str = Number(integer).toString(16);
        return str.length == 1 ? "0" + str : str;
    };
    window.savedImage = img;
    var idNo = 0;

    for (var i = 0; i < img.bitmap.width; i += img.bitmap.width / memory_array.length) {
        var step = (img.bitmap.width / memory_array.length);
        var randomX = (i > 0 ? i - step : 0) + (step * Math.random());
        var RGBA = Jimp.intToRGBA(
            img.getPixelColor(randomX, Math.floor(Math.random() * img.bitmap.height))
        );
        $('#tile_' + idNo).data("flipColor", [
            '#',
            convert(RGBA.r),
            convert(RGBA.b),
            convert(RGBA.g)
        ].join(''))
        idNo++;
    }
})
Array.prototype.memory_tile_shuffle = function () {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function MemoryTile(value, id) {
    this.value = value;
    this.id = id;
    return this;
}
function newBoard() {
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for (var i = 0; i < memory_array.length; i++) {
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile, val) {
    if (tile.innerHTML == "" && memory_values.length < 2) {

        tile.innerHTML = val;
        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if (memory_values[0] == memory_values[1]) {
                memory_tile_ids.forEach(function (item) {
                    var $selector = $('#' + item);
                    $selector.css('background-color', $selector.data('flipColor') || '#DCECDC');
                })

                tiles_flipped += 2;
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];
                // Check to see if the whole board is cleared
                if (tiles_flipped == memory_array.length) {
                    alert("generating new board");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back() {
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = '#DCECDC';
                    tile_1.innerHTML = "";
                    tile_2.style.background = '#DCECDC';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}
newBoard();
