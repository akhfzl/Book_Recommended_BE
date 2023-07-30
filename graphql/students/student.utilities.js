const { PythonShell } = require("python-shell");
const fs = require('fs');

async function RunScriptPython(filename, args){
    let book_type;
    let options = {
        mode: 'text',
        scriptPath: 'graphql/students/python/',
        args
    };

    let output = await PythonShell.run(filename, options)
        .then(messages=>{
            return JSON.parse(messages)
        })
        .catch(err => {
            console.log('Rekomendasi gagal -> ', err)
        })

    output.map(book => {
        if(book === 1){
            book_type = 'sains-tech';
        }else if(book === 2){
            book_type = 'social-humanaria';
        }else{
            book_type = 'general'
        }
    })

    if(!book_type){
        return null
    }
    
    return book_type
}

async function randomArray(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

async function randomArrays(arr){
    let i = arr.length;
    while (--i > 0) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    }
    return arr;
}

function csvHandler(filename) {
    const readFile = fs.readFileSync(filename, 'utf-8')
    let file = JSON.parse(readFile)
    return file
}

module.exports = {
    RunScriptPython,
    randomArray,
    randomArrays,
    csvHandler
}