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
        this.periods = []; // periodo
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
        // get params
        var d = rawData.split(';');
        this.name = d[1] !== '' ? d[1].trim() : null;
        this.area = {
            administrativa: false,
            biologica: false,
            sociohumanistica: false,
            tecnica: false
        };
        if (d[30].toLowerCase().includes('uma') ||
            d[35].toLowerCase().includes('uma') ||
            d[40].toLowerCase().includes('uma') ||
            d[45].toLowerCase().includes('uma') ||
            d[50].toLowerCase().includes('uma')) {
            this.area.sociohumanistica = true;
        }
        if (d[30].toLowerCase().includes('iol') ||
            d[35].toLowerCase().includes('iol') ||
            d[40].toLowerCase().includes('iol') ||
            d[45].toLowerCase().includes('iol') ||
            d[50].toLowerCase().includes('iol')) {
            this.area.biologica = true;
        }
        if (d[30].toLowerCase().includes('cnica') ||
            d[35].toLowerCase().includes('cnica') ||
            d[40].toLowerCase().includes('cnica') ||
            d[45].toLowerCase().includes('cnica') ||
            d[50].toLowerCase().includes('cnica')) {
            this.area.tecnica = true;
        }
        if (d[30].toLowerCase().includes('trativa') ||
            d[35].toLowerCase().includes('trativa') ||
            d[40].toLowerCase().includes('trativa') ||
            d[45].toLowerCase().includes('trativa') ||
            d[50].toLowerCase().includes('trativa')) {
            this.area.administrativa = true;
        }
        // participants
        var i = 3;
        var limit = 22;
        // 6 cedula
        // 7 nombres y apellidos
        // 8 correo
        // 25 departamento
        // 10 seccion
        // 11 asignatura
        // 12 titulacion
        // 13 modalidad
        while (d[i] !== '' && i < limit) {
            var participant = {
                name: d[i] !== '' ? d[i].trim() : null,
                email: d[i + 1] !== '' ? d[i + 1].trim() : null,
                department: d[i + 2] !== '' ? d[i + 2].trim() : null,
                subject: d[i + 3] !== '' ? d[i + 3].trim() : null,
                modality: null //d[i + 7] !== '' ? d[i + 7].trim() : null
            };
            i += 4;
            this.participants.push(participant);
        }
        this.coordinator = d[23] !== '' ? d[23].trim() : null;
        this.strategicLine =
            d[24] !== ''
                ? d[24]
                    .trim()
                    .replace('"', '')
                    .split('\t')
                    .join(' ')
                : null;
        this.type = null;
        if (d[25].includes('Buena')) {
            this.type = 'buena-practica';
        }
        else if (d[25].includes('Coordinados')) {
            this.type = 'proyecto-coordinado';
        }
        else {
            this.type = 'proyecto-actual';
        }
        this.subject = d[28] !== '' ? d[28].trim() : null;
        this.periods.push({
            name: d[26]
                .trim()
                .split(' ')
                .join('')
                .split('-')
                .join(' - ')
        });
        if (!!d[27] && d[27].trim() !== '')
            this.periods.push({
                name: d[27]
                    .trim()
                    .split(' ')
                    .join('')
                    .split('-')
                    .join(' - ')
            });
    }
    return ProyectoInnovacion;
}());
exports.ProyectoInnovacion = ProyectoInnovacion;
