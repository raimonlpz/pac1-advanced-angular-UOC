export enum EducationType {
  TituloUniversitario = 'Título Universitario',
  CicloFormativo = 'Ciclo Formativo'
}

export enum EducationLevelUniversitario {
  Grado = 'Grado',
  Diplomado = 'Diplomado',
  Licenciado = 'Licenciado',
  Ingeniero = 'Ingeniero',
  Master = 'Máster',
  Doctorado = 'Doctorado'
}

export enum EducationLevelFormativo {
  GradoSuperior = 'Grado Superior',
  GradoMedio = 'Grado Medio'
}

export interface IEducation {
  id: string;
  type: EducationType;
  level: EducationLevelUniversitario | EducationLevelFormativo;
  name: string;
  university: string;
  finishDate?: string;
}

export class Education implements IEducation {
  constructor(
    public id: string,
    public type: EducationType,
    public level: EducationLevelUniversitario | EducationLevelFormativo,
    public name: string,
    public university: string,
    public finishDate?: string
  ) {}
}
