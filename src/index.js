"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// init firebase sdk
var fs = require("fs");
var proyecto_innovacion_1 = require("./proyecto-innovacion");
var firebase = require('firebase');
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
var proyectosCollection = db
    .collection('innovacion-docente')
    .doc('proyectos-innovacion')
    .collection('proyectos');
// read cli config
// read file
fs.readFile('./assets/base.csv', 'utf8', function (err, contents) {
    var arr = contents.trim().split('\n');
    for (var i = 0; i < arr.length; i++) {
        var data = arr[i];
        // parse objects
        var p = new proyecto_innovacion_1.ProyectoInnovacion(data);
        // store in firestore
        var date = new Date();
        console.log(p);
        proyectosCollection
            .add(__assign(__assign({}, p), { created: date, edited: date, newProject2: true }))
            .then(function (docRef) {
            console.log('Document written with ID: ', docRef.id);
        })["catch"](function (error) {
            console.error('Error adding document: ', error);
        });
    }
});
