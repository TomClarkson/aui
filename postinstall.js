var fs = require('fs');
var path = require('path');

const script = `
import React from 'react';

export default () => React.createElement('h1', {id: 'hi'}, 'Hello world');
`;

fs.writeFile("dist.js", script, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
