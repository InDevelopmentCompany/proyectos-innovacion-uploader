// init firebase sdk
var fs = require('fs');

// read cli config

fs.readFile('./assets/Base_PID_O18-F19.csv', 'utf8', function (err, contents) {
    let arr = contents.split('\n');
    arr.forEach(element => {
        console.log(element);
        console.log('\n');
        console.log('\n');
        console.log('\n');
    });
});

console.log('after calling readFile');
// read file
// parse objects
// upload to firebase