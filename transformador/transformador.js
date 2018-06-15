var filename = '2017sist.txt';
var fs = require('fs')
fs.readFile(filename, 'utf8', function(err, data)
{
    if (err)
    {
        // check and handle err
    }
    var linesExceptFirst = data.split('\n').slice(1).join('\n');
    fs.writeFile(filename, linesExceptFirst);
});