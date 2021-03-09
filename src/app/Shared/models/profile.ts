import { Education, IEducation } from './education';

export enum Nationality { ES = 'ES', FR = 'FR', IT = 'IT', PT = 'PT' }

export interface IProfile {
  name: string;
  surname?: string;
  birthDate?: Date;
  phone?: number;
  nationality: Nationality;
  nif: string;
  aboutMe?: string;
  education: IEducation[];
  companyName?: string;
  companyDescription?: string;
  cif?: string;
}

export class TouristProfile implements IProfile {
  constructor(
    public name: string,
    public nationality: Nationality,
    public nif: string,
    public education: Education[],
    public surname?: string,
    public birthDate?: Date,
    public phone?: number,
    public aboutMe?: string,
  ) {}
}

export class CompanyProfile implements IProfile {
  constructor(
    public name: string,
    public nationality: Nationality,
    public nif: string,
    public education: Education[],
    public companyName: string,
    public cif: string,
    public companyDescription?: string,
    public surname?: string,
    public birthDate?: Date,
    public phone?: number,
    public aboutMe?: string,
  ) {}
}
