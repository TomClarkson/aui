var fs = require('fs');
var path = require('path');


const buildPath = path.join(__dirname + '/dist/index.js');

fs.writeFile(buildPath, "console.log(Hey there!);", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
