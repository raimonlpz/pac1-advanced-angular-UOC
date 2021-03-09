import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Activity } from '../models/activity';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(): { users: Array<User>, activities: Array<Activity> } {
    const users: Array<User> = [];
    const activities: Array<Activity> = [];
    return { users, activities };
  }

  genId<T extends User | Activity>(table: T[]): number {
    return table.length > 0 ? Math.max(...table.map(t => t.id)) + 1 : 0;
  }
}
