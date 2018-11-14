// init firebase sdk
import * as fs from 'fs';

// main entry point
(() => {
    // read cli config
    // read file
    fs.readFile('./assets/Base_PID_O18-F19.csv', 'utf8', function (err, contents) {
        let arr: String[] = contents.split('\n');
        arr.forEach(element => {
            console.log(element);
            console.log('\n');
            console.log('\n');
            console.log('\n');
        });
    });

    console.log('after calling readFile');
    // parse objects
    // upload to firebase
})();