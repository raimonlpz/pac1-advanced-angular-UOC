import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn = new BehaviorSubject<User | null>(null);

  constructor(private userService: UserService) {}

  registerUser({name, surname, type, email, password, profile, activitiesFavsIds, activitiesJoinedIds, activitiesCreatedIds }): void {
    this.userService.getUsers().subscribe(users => {
      const user = users.filter(us => us.email === email)[0];
      if (!user) {
        this.userService.addUser({
          name,
          surname,
          type,
          email,
          password,
          profile,
          activitiesFavsIds,
          activitiesJoinedIds,
          activitiesCreatedIds
        }).subscribe(newUser => {
          return this.userLoggedIn.next(newUser);
        });
      } else {
        return this.userLoggedIn.next(null);
      }
    });
  }

  loginUser({ email, password }): void {
    this.userService.getUsers().subscribe(users => {
      const user = users.filter(u => u.email === email && u.password === password)[0];
      if (user) {
        return this.userLoggedIn.next(user);
      }
      return this.userLoggedIn.next(null);
    });
  }

  logoutUser(): void {
    this.userLoggedIn.next(null);
  }
}
