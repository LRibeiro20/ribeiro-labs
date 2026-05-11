const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('Luis Ribeiro Resume.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('resume.txt', data.text);
    console.log('Done extracting text to resume.txt');
}).catch(function(error){
    console.error(error);
});
