var fs = require('fs');
fs.readdir('./img', function(err, files) {
    fs.writeFile('images.json', JSON.stringify(files), function(){
        console.log("done");
    })
})