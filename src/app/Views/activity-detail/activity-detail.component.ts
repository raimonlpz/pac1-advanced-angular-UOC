import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/Shared/models/activity';
import { User } from 'src/app/Shared/models/user';
import { ActivityService } from 'src/app/Shared/services/activity.service';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit, OnDestroy {
  @Input() activitySelected: Activity;
  @Input() userIsSignedUp: boolean;
  @Output() cancelSubscription = new EventEmitter();
  @Output() cancelFavs = new EventEmitter();

  userAlreadyInscribed = false;
  @Input() userIsInFavs = false;

  userLoggedIn: User = null;
  isLoggedSub$: Subscription;
  activityServiceSub$: Subscription;

  constructor(
    private authService: AuthService,
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    this.isLoggedSub$ = this.authService.userLoggedIn.subscribe(userIsLogged => {
      if (userIsLogged) {
        this.userLoggedIn = userIsLogged;
      } else {
        this.userLoggedIn = null;
      }
    });
  }

  signUpUser(): void {
    if (this.activitySelected.peopleRegistered.indexOf(this.userLoggedIn.id) === -1) {
      this.activitySelected.peopleRegistered.push(this.userLoggedIn.id);
      this.activityServiceSub$ = this.activityService.updateActivity({
        ...this.activitySelected
      }).subscribe(() => {});
    } else {
      this.userAlreadyInscribed = true;
      setTimeout(() => {
        this.userAlreadyInscribed = false;
      }, 2000);
    }
  }

  cancelSignUpUser(): void {
    this.activitySelected.peopleRegistered.splice(this.activitySelected.peopleRegistered.indexOf(this.userLoggedIn.id), 1);
    this.activityServiceSub$ = this.activityService.updateActivity({
      ...this.activitySelected
    }).subscribe(() => {
      this.cancelSubscription.emit();
    });
  }

  saveInFavs(): void {
    let currentStorage = JSON.parse(window.localStorage.getItem(`FavActivities-User${this.userLoggedIn.id}`));
    if (currentStorage) {
      if (currentStorage.indexOf(this.activitySelected.id) === -1) {
        currentStorage = [...currentStorage, this.activitySelected.id];
      }
    } else { currentStorage = [this.activitySelected.id]; }

    window.localStorage.setItem(`FavActivities-User${this.userLoggedIn.id}`, JSON.stringify(currentStorage));
  }

  removeFromFavs(): void {
    const currentStorage = JSON.parse(window.localStorage.getItem(`FavActivities-User${this.userLoggedIn.id}`));
    if (currentStorage) {
      if (currentStorage.indexOf(this.activitySelected.id) !== -1) {
        currentStorage.splice(currentStorage.indexOf(this.activitySelected.id), 1);
      }
      window.localStorage.setItem(`FavActivities-User${this.userLoggedIn.id}`, JSON.stringify([...currentStorage]));
      this.cancelFavs.emit();
    }
  }

  ngOnDestroy(): void {
    if (this.isLoggedSub$) { this.isLoggedSub$.unsubscribe(); }
    if (this.activityServiceSub$) { this.activityServiceSub$.unsubscribe(); }
  }
}
