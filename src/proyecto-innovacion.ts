import { Area } from './area';
import { Participant } from './participants';

export class ProyectoInnovacion {
  // csv data
  private name: string = null; // titulo de la propuesta
  private coordinator: string = null; // nombre cordinador
  private modality: string = null; // modalidad
  private participants: Participant[] = []; // participantes
  private strategicLine: string = null; // linea estrategica
  private type: String = null; // tipo de propuesta
  private periods: any[] = []; // periodo
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
    tecnica: false
  };

  constructor(rawData: string) {
    // get params
    const d: string[] = rawData.split(';');

    this.name = d[1] !== '' ? d[1].trim() : null;

    this.area = {
      administrativa: !!d[2],
      biologica: !!d[3],
      sociohumanistica: !!d[4],
      tecnica: !!d[5]
    };

    // participants
    let i: number = 6;
    const limit: number = 53;
    // 6 cedula
    // 7 nombres y apellidos
    // 8 correo
    // 56 departamento
    // 10 seccion
    // 11 asignatura
    // 12 titulacion
    // 13 modalidad
    while (d[i] !== '' && i < limit) {
      let participant: Participant = {
        name: d[i + 1] !== '' ? d[i + 1].trim() : null,
        email: d[i + 2] !== '' ? d[i + 2].trim() : null,
        department: d[i + 3] !== '' ? d[i + 3].trim() : null,
        subject: d[i + 5] !== '' ? d[i + 5].trim() : null,
        modality: d[i + 7] !== '' ? d[i + 7].trim() : null
      };
      i += 8;
      this.participants.push(participant);
    }

    this.coordinator = d[54] !== '' ? d[54].trim() : null;
    this.strategicLine =
      d[55] !== ''
        ? d[55]
            .trim()
            .split('\t')
            .join(' ')
        : null;

    this.type = null;
    if ((d[56] as any).includes('Buena')) {
      this.type = 'buena-practica';
    } else if ((d[56] as any).includes('Coordinados')) {
      this.type = 'proyecto-coordinado';
    } else {
      this.type = 'proyecto-actual';
      this.subject = d[33] !== '' ? d[33].trim() : null;
    }

    this.periods.push({
      name: d[57]
        .trim()
        .split(' ')
        .join('')
        .split('-')
        .join(' - ')
    });
    if (!!d[58] && d[58].trim() !== '')
      this.periods.push({
        name: d[58]
          .trim()
          .split(' ')
          .join('')
          .split('-')
          .join(' - ')
      });
  }
}
