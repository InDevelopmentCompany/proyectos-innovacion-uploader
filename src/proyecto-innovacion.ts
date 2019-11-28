import { Area } from './area';
import { Participant } from './participants';

export class ProyectoInnovacion {
  // csv data
  public name: string = null; // titulo de la propuesta
  public coordinator: string = null; // nombre cordinador
  public modality: string = null; // modalidad
  public participants: Participant[] = []; // participantes
  public strategicLine: string = null; // linea estrategica
  public type: String = null; // tipo de propuesta
  public periods: any[] = []; // periodo
  public subject: string = null; // asignatura

  // other data
  public img: string = null;
  public infografic: string = null;
  public videoID: string = null;
  public documents: string[] = [];
  public area: Area = {
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
      administrativa: false,
      biologica: false,
      sociohumanistica: false,
      tecnica: false
    };

    if (
      ((d[30] as string).toLowerCase() as any).includes('uma') ||
      ((d[35] as string).toLowerCase() as any).includes('uma') ||
      ((d[40] as string).toLowerCase() as any).includes('uma') ||
      ((d[45] as string).toLowerCase() as any).includes('uma') ||
      ((d[50] as string).toLowerCase() as any).includes('uma')
    ) {
      this.area.sociohumanistica = true;
    }
    if (
      ((d[30] as string).toLowerCase() as any).includes('iol') ||
      ((d[35] as string).toLowerCase() as any).includes('iol') ||
      ((d[40] as string).toLowerCase() as any).includes('iol') ||
      ((d[45] as string).toLowerCase() as any).includes('iol') ||
      ((d[50] as string).toLowerCase() as any).includes('iol')
    ) {
      this.area.biologica = true;
    }
    if (
      ((d[30] as string).toLowerCase() as any).includes('cnica') ||
      ((d[35] as string).toLowerCase() as any).includes('cnica') ||
      ((d[40] as string).toLowerCase() as any).includes('cnica') ||
      ((d[45] as string).toLowerCase() as any).includes('cnica') ||
      ((d[50] as string).toLowerCase() as any).includes('cnica')
    ) {
      this.area.tecnica = true;
    }
    if (
      ((d[30] as string).toLowerCase() as any).includes('trativa') ||
      ((d[35] as string).toLowerCase() as any).includes('trativa') ||
      ((d[40] as string).toLowerCase() as any).includes('trativa') ||
      ((d[45] as string).toLowerCase() as any).includes('trativa') ||
      ((d[50] as string).toLowerCase() as any).includes('trativa')
    ) {
      this.area.administrativa = true;
    }
    // participants
    let i: number = 3;
    const limit: number = 22;
    // 6 cedula
    // 7 nombres y apellidos
    // 8 correo
    // 25 departamento
    // 10 seccion
    // 11 asignatura

    // 12 titulacion
    // 13 modalidad
    while (d[i] !== '' && i < limit) {
      let participant: Participant = {
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
    if ((d[25] as any).includes('Buena')) {
      this.type = 'buena-practica';
    } else if ((d[25] as any).includes('Coordinados')) {
      this.type = 'proyecto-coordinado';
    } else {
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
}
