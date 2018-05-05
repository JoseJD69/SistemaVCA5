var file_name = 'marzo18.txt';

var readline = require('readline');
var fs = require('fs');

var lineReader = readline.createInterface({
    input: fs.createReadStream(file_name)
});

var isHeader = false;
var columnNames = [];

function parseLine(line) {
    return line.trim().split('\t')
}

function createRowObject(values) {
    var rowObject = {};

    columnNames.forEach((value,index) => {
        rowObject[value] = values[index];
    });

    return rowObject;
}

var json = {};
json[file_name] = [];

lineReader.on('line', function (line) {
    if(!isHeader) {
        columnNames = parseLine(line);
        isHeader = true;
    } else {
        json[file_name].push(createRowObject(parseLine(line)));
    }
});

lineReader.on('close', function () {
    fs.writeFileSync(file_name + '.json', JSON.stringify(json,null,2));
});