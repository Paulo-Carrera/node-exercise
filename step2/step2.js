const fs = require('fs');
const axios = require('axios');
const { escape } = require('querystring');

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log('ERROR: ', err);
            process.exit(1);
        }
        console.log('DATA: ', data);
    });
};

function webCat(url){
    axios.get(url)
    .then(function(res){
        console.log(res.data);
    })
    .catch(function(err){
        console.log('ERROR: ', err)
        process.exit(1);
    });
}

const args = process.argv.slice(2);

if (args.length == 0){
    conaole.error('ERROR: No URL specified');
    process.exit(1);
}else {
    const input = args[0];

    if (input.startsWith('http://') || input.startsWith('https://')){
        webCat(input);
    }else {
        cat(input);
    }
}


// node step2.js https://swapi.dev/api/people/1/ 
// node step2.js two.txt