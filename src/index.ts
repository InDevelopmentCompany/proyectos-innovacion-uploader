// init firebase sdk
import * as fs from 'fs';
const firebase = require("firebase");
require("firebase/firestore");

import { ProyectoInnovacion } from "./proyecto-innovacion";

// init firebase 
var config = {
    apiKey: "AIzaSyDemX_yG-2ZDJCwvpcY-H2MaovvOY1TiXg",
    authDomain: "innovaciondocente-utpl.firebaseapp.com",
    databaseURL: "https://innovaciondocente-utpl.firebaseio.com",
    projectId: "innovaciondocente-utpl",
    storageBucket: "innovaciondocente-utpl.appspot.com",
    messagingSenderId: "1011505668181"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
let proyectosCollection = db.collection('innovacion-docente').doc('proyectos-innovacion').collection('proyectos');

// read cli config
// read file
fs.readFile('./assets/Base_PID_O18-F19.csv', 'utf8', (err, contents) => {
    const arr: string[] = contents.trim().split('\n');
    for (let i = 0; i < arr.length; i++) {
        const data: string = arr[i];

        // parse objects
        const p: ProyectoInnovacion = new ProyectoInnovacion(data);
        // store in firestore
        let date = new Date();
        proyectosCollection.add({
            ...p,
            created: date,
            edited: date,
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

});