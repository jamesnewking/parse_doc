//to run in node.js
//node doc_to_array inFileName.txt outFileName.txt
const verbs = require('./verbs'); //633 verbs
const nouns = require('./nouns'); //2332 nouns
const adjectives = require('./adjectives'); //1099 adjectives

let wordCount = {};
var fs = require('fs');
const inFileName = process.argv[2];
const outFileName = process.argv[3];
const regex = /\s\||[^\w]/;
let wordCountArray = [];
let wordsTotal = 0;

function wordType(word){
    let isType = "__";
    if(verbs.indexOf(word)>=0){
        isType = "verb";
    } else if(nouns.indexOf(word)>=0){
        isType = "noun";
    } else if(adjectives.indexOf(word)>=0){
        isType = "adjective";}
    return isType;
}

//let array = fs.readFileSync(inFileName).toString().split("\n");
//let array = fs.readFileSync(inFileName).toString().split(" ");
let array = fs.readFileSync(inFileName).toString().split(regex);
for(i in array) {
    let word = array[i].toLowerCase();
    if(word === ""){
        continue;
    }
    let tempType = wordType(word);
    wordsTotal++;
    if( wordCount[word] === undefined ){
        wordCount[word] = {"count": 1, type: tempType};
    } else {
        wordCount[word].count++;
    }
}
for (j in wordCount){
    let tempObj = {};
    tempObj[j] = wordCount[j];
    wordCountArray.push(tempObj);
}
//wordCountArray.sort((a,b) => Object.keys(b).map(k => b[k]) - Object.keys(a).map(k => a[k]));
//wordCountArray.sort( (a,b) => b.count - a.count );
wordCountArray.sort((a,b) => Object.keys(b).map(k => b[k].count) - Object.keys(a).map(k => a[k].count));

console.log(wordCountArray);
console.log(`Total words in ${inFileName} is ${wordsTotal}`);
console.log(`Output to ${outFileName}`);

let openFile = fs.createWriteStream(outFileName);
openFile.on('error', err => console.log(err));
openFile.write(`Total words in ${inFileName} is ${wordsTotal}` + '\n');
wordCountArray.forEach( v => openFile.write(JSON.stringify(v) + '\n') );
openFile.end();
