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

  userAlreadyInscribed = false;

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

  ngOnDestroy(): void {
    if (this.isLoggedSub$) { this.isLoggedSub$.unsubscribe(); }
    if (this.activityServiceSub$) { this.activityServiceSub$.unsubscribe(); }
  }
}
