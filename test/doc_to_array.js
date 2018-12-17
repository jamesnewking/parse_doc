//to run in node.js
//node doc_to_array filename.txt
let wordCount = {};
var fs = require('fs');
const fileName = process.argv[2];
const regex = /\s\||[^\w]/;
let wordCountArray = [];

//let array = fs.readFileSync(fileName).toString().split("\n");
//let array = fs.readFileSync(fileName).toString().split(" ");
let array = fs.readFileSync(fileName).toString().split(regex);
for(i in array) {
    let word = array[i].toLowerCase();
    if( wordCount[word]===undefined ){
        wordCount[word] = 1;
    } else {
        wordCount[word]++;
    }
    //console.log(array[i]);
}
for (j in wordCount){
    let tempObj = {};
    tempObj[j] = wordCount[j];
    wordCountArray.push(tempObj);
}
wordCountArray.sort((a,b) => Object.keys(b).map(k => b[k]) - Object.keys(a).map(k => a[k]));
for (k in wordCountArray){
    console.log(wordCountArray[k]);
}

// for(k in wordCount){
//     console.log(`${k} ${wordCount[k]}`);
// }