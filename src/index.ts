// init firebase sdk
import * as fs from 'fs';
import { ProyectoInnovacion } from './proyecto-innovacion';
const firebase = require('firebase');
require('firebase/firestore');

// init firebase
var config = {
  apiKey: 'AIzaSyDemX_yG-2ZDJCwvpcY-H2MaovvOY1TiXg',
  authDomain: 'innovaciondocente-utpl.firebaseapp.com',
  databaseURL: 'https://innovaciondocente-utpl.firebaseio.com',
  projectId: 'innovaciondocente-utpl',
  storageBucket: 'innovaciondocente-utpl.appspot.com',
  messagingSenderId: '1011505668181'
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
let proyectosCollection = db
  .collection('innovacion-docente')
  .doc('proyectos-innovacion')
  .collection('proyectos');

// read cli config
// read file
fs.readFile('./assets/base.csv', 'utf8', (err, contents) => {
  const arr: string[] = contents.trim().split('\n');
  for (let i = 0; i < arr.length; i++) {
    const data: string = arr[i];

    // parse objects
    const p: ProyectoInnovacion = new ProyectoInnovacion(data);
    // store in firestore
    let date = new Date();

    console.log(p);

    proyectosCollection
      .add({
        ...p,
        created: date,
        edited: date,
        newProject2: true
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }
});
