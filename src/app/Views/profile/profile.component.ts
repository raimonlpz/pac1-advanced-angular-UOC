import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyProfile, TouristProfile } from 'src/app/Shared/models/profile';
import { User } from 'src/app/Shared/models/user';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: TouristProfile | CompanyProfile;

  userLoggedIn: User;
  isLoggedSub$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isLoggedSub$ = this.authService.userLoggedIn.subscribe(userLogged => {
      if (userLogged) {
        this.userLoggedIn = userLogged;
        this.profile = this.userLoggedIn.profile;
      } else {
        this.profile = null;
        this.userLoggedIn = null;
      }
    });
  }

  updateProfileInfo(): void {
    this.router.navigateByUrl('/profile/update');
  }

  updateEducation(educationId: string): void {
    this.router.navigateByUrl(`/profile/education/${educationId}`);
  }

  deleteEducation(educationId: string): void {
    const educationToDelete = this.userLoggedIn.profile.education.filter(edu => edu.id === educationId)[0];
    const indexToSlice = this.userLoggedIn.profile.education.indexOf(educationToDelete);
    this.userLoggedIn.profile.education.splice(indexToSlice, 1);

    this.userService.updateUser({
      ...this.userLoggedIn
    }).subscribe(_ => {});
  }

  ngOnDestroy(): void {
    this.isLoggedSub$.unsubscribe();
  }
}
