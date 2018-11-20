// init firebase sdk
import * as fs from 'fs';
import { ProyectoInnovacion } from "./proyecto-innovacion";

// main entry point
(() => {
    // read cli config
    // read file
    fs.readFile('./assets/Base_PID_O18-F19.csv', 'utf8', (err, contents) => {
        const arr: string[] = contents.trim().split('\n');
        for (let i = 0; i < arr.length; i++) {
            const data: string = arr[i];

            // parse objects
            const p: ProyectoInnovacion = new ProyectoInnovacion(data);
            // console.log(p);
            break;
        }
    });

    // upload to firebase
})();