import { Area } from "./area";
import { Participant } from "./participants";

export class ProyectoInnovacion {

    // csv data
    private name: string = null; // titulo de la propuesta
    private coordinator: string = null; // nombre cordinador
    private modality: string = null; // modalidad
    private participants: Participant[] = []; // participantes
    private strategicLine: string = null; // linea estrategica
    private type: String = null; // tipo de propuesta
    private period: string[] = []; // periodo
    private subject: string = null; // asignatura

    // other data
    private img: string = null;
    private infografic: string = null;
    private videoID: string = null;
    private documents: string[] = [];
    private area: Area = {
        administrativa: false,
        biologica: false,
        sociohumanistica: false,
        tecnica: false,
    };

    constructor(
        rawData: string
    ) {
        // get params
        const d: string[] = rawData.split(';');

        this.name = (d[1] !== '') ? d[1].trim() : null;
        this.coordinator = (d[4] !== '') ? d[4].trim() : null;
        this.modality = (d[6] !== '') ? d[6].trim() : null;
        this.strategicLine = (d[29] !== '') ? d[29].trim() : null;;
        this.type = d[30].includes('Buena') ? 'buena-practica' : 'proyecto-actual';
        this.subject = (d[33] !== '') ? d[33].trim() : null;;

        this.period.push(d[31].trim());
        if (d[32] !== '')
            this.period.push(d[32].trim());
        // participants
        let i: number = 8;
        const limit: number = 28;
        while (d[i] !== '' && i < limit) {
            let participant: Participant = {
                name: d[i] !== '' ? d[i].trim() : null,
                email: d[i + 1] !== '' ? d[i + 1].trim() : null,
                department: d[i + 2] !== '' ? d[i + 2].trim() : null,
                subject: d[i + 3] !== '' ? d[i + 3].trim() : null,
            };
            i += 4;
            this.participants.push(participant);
        }
    }
}