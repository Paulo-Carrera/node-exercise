const fs = require('fs');

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log('ERROR: ', err);
            process.exit(1);
        }
        console.log('DATA: ', data);
    });
};


// Get command line arguments
const args = process.argv.slice(2); 

if (args.length == 0){
    console.error('ERROR: No file specified');
}else {
    const path = args[0];
    cat(path)
}




