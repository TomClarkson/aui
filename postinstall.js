var fs = require('fs');
var path = require('path');


const script = `
    console.log(Hey there!);
`;

fs.writeFile("dist.js", script, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
