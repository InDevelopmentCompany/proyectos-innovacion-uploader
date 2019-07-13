"use strict";
exports.__esModule = true;
var ProyectoInnovacion = /** @class */ (function () {
    function ProyectoInnovacion(rawData) {
        // csv data
        this.name = null; // titulo de la propuesta
        this.coordinator = null; // nombre cordinador
        this.modality = null; // modalidad
        this.participants = []; // participantes
        this.strategicLine = null; // linea estrategica
        this.type = null; // tipo de propuesta
        this.period = []; // periodo
        this.subject = null; // asignatura
        // other data
        this.img = null;
        this.infografic = null;
        this.videoID = null;
        this.documents = [];
        this.area = {
            administrativa: false,
            biologica: false,
            sociohumanistica: false,
            tecnica: false
        };
        console.log(rawData);
        // get params
        var d = rawData.split(';');
        this.name = d[1] !== '' ? d[1].trim() : null;
        this.coordinator = d[4] !== '' ? d[4].trim() : null;
        this.modality = d[6] !== '' ? d[6].trim() : null;
        this.strategicLine = d[29] !== '' ? d[29].trim() : null;
        this.type = d[30].includes('Buena') ? 'buena-practica' : 'proyecto-actual';
        this.subject = d[33] !== '' ? d[33].trim() : null;
        this.period.push(d[31].trim());
        if (d[32] !== '')
            this.period.push(d[32].trim());
        // participants
        var i = 8;
        var limit = 28;
        while (d[i] !== '' && i < limit) {
            var participant = {
                name: d[i] !== '' ? d[i].trim() : null,
                email: d[i + 1] !== '' ? d[i + 1].trim() : null,
                department: d[i + 2] !== '' ? d[i + 2].trim() : null,
                subject: d[i + 3] !== '' ? d[i + 3].trim() : null
            };
            i += 4;
            this.participants.push(participant);
        }
    }
    return ProyectoInnovacion;
}());
exports.ProyectoInnovacion = ProyectoInnovacion;
