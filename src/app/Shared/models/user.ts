import { TouristProfile, CompanyProfile, IProfile } from './profile';

export enum UserType { Tourist, Company }

interface IUser {
  readonly id?: number;
  readonly name: string;
  readonly surname?: string;
  readonly type: UserType;
  readonly email: string;
  readonly password: string;
  profile: IProfile;
}

export class User implements IUser {
  constructor(
    public name: string,
    public surname: string,
    public type: UserType,
    public email: string,
    public password: string,
    public profile: TouristProfile | CompanyProfile,
    public id?: number,
  ) {}
}
