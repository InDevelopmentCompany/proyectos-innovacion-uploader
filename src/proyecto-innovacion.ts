import { Area } from "./area";
import { Participants } from "./participants";
import { TypeProject } from "./type";

export class ProyectoInnovacion {

    private name: string;
    private topic: string;
    private coordinator: string;
    private modality: string;
    private participants: Participants[];
    private strategicLine: string;
    private type: TypeProject;
    private subject: TypeProject;

    private img: string;
    private certification: string;

    private documents: string[];
    private area: Area;

    constructor(
        rawData: string
    ) {
        // get params
        const d: string[] = rawData.split(',');
        console.log(d);

    }
}