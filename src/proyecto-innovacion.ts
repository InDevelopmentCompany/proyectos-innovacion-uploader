import { Area } from "./area";
import { Participant } from "./participants";

export class ProyectoInnovacion {

    // csv data
    private name: string; // titulo de la propuesta
    private coordinator: string; // nombre cordinador
    private modality: string; // modalidad
    private participants: Participant[]; // participantes
    private strategicLine: string; // linea estrategica
    private type: String; // tipo de propuesta
    private period: string[]; // periodo
    private Subject: string; // asignatura

    // other data
    private img: string;
    private infografic: string;
    private videoID: string;
    private documents: string[];
    private area: Area;

    constructor(
        rawData: string
    ) {
        // get params
        const d: string[] = rawData.split(';');

        this.name = d[1];
        this.coordinator = d[4];
        this.modality = d[6];
        this.strategicLine = d[29];
        this.type = d[30].includes('Buena') ? 'buena-practica' : 'proyecto-actual';
        this.Subject = d[33];

        this.period = [d[31]];
        if (d[32] !== '')
            this.period.push(d[32]);
        // participants
        this.participants = [];
        let i: number = 8;
        const limit: number = 28;
        while (d[i] !== '' && i < limit) {
            let participant: Participant = {
                name: d[i++],
                mail: d[i++],
                department: d[i++],
                subject: d[i++]
            };
            this.participants.push(participant);
        }
    }
}