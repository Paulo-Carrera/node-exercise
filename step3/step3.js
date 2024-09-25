const { readFile, writeFile, access } = require('fs').promises; 
const axios = require('axios');

async function cat(path, outputFile = null) {
    try {
        await access(path); // Check if the file exists
        const data = await readFile(path, 'utf8');
        handleOutput(data, outputFile);
    } catch (err) {
        console.error('ERROR reading file:', err);
        process.exit(1);
    }
}

async function webCat(url, outputFile = null) {
    try {
        const res = await axios.get(url);
        handleOutput(res.data, outputFile);
    } catch (err) {
        console.error('ERROR fetching URL:', err);
        process.exit(1);
    }
}

async function handleOutput(data, outputFile) {
    if (outputFile) {
        try {
            await writeFile(outputFile, data, 'utf8');
            console.log(`Data written to ${outputFile}`);
        } catch (err) {
            console.error('ERROR writing to file:', err);
            process.exit(1);
        }
    } else {
        console.log(data);
    }
}

// Get command-line arguments
const args = process.argv.slice(2);

let outputFile = null;
let input = null;

if (args[0] === '--out') {
    outputFile = args[1];
    input = args[2];
} else {
    input = args[0];
}

// Check if input is provided
if (!input) {
    console.error('ERROR: No file or URL specified!');
    process.exit(1);
}

// Determine if the input is a URL or a file path
if (input.startsWith('http://') || input.startsWith('https://')) {
    webCat(input, outputFile);
} else {
    cat(input, outputFile);
}



// node step3.js https://swapi.dev/api/people/1/ 
// node step3.js three.txt
// node step3.js --out https://swapi.dev/api/people/1/   three.txt
