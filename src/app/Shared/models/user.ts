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
  activitiesFavsIds?: Array<string>;
  activitiesJoinedIds?: Array<string>;
  activitiesCreatedIds?: Array<string>;
}

export class User implements IUser {
  constructor(
    public name: string,
    public surname: string,
    public type: UserType,
    public email: string,
    public password: string,
    public profile: TouristProfile | CompanyProfile,
    public activitiesFavsIds?: Array<string>,
    public activitiesJoinedIds?: Array<string>,
    public activitiesCreatedIds?: Array<string>,
    public id?: number,
  ) {}
}
