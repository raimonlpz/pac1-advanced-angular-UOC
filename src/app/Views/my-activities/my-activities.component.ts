import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/Shared/models/activity';
import { ActivityService } from 'src/app/Shared/services/activity.service';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css']
})
export class MyActivitiesComponent implements OnInit, OnDestroy {
  activitiesSub$: Subscription;
  authSub$: Subscription;

  activitySelected: Activity;
  activities: Array<Activity>;
  userIsSignedUp = true;
  userId: number;

  constructor(
    private activityService: ActivityService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.activitiesSub$ = this.activityService.getActivities().subscribe(activities => {
      if (activities.length > 0) {
        this.authSub$ = this.authService.userLoggedIn.subscribe(userLogged => {
          this.activities = activities;
          this.userId = userLogged.id;
          this.populateChildTemplates();
        });
      } else {
        this.activities = [];
      }
    });
  }

  populateChildTemplates(): void {
    this.activities = this.activities.filter(a => a.peopleRegistered.indexOf(this.userId) !== -1);
    this.activitySelected = this.activities[0];
  }

  onActivitySelected(activity: Activity): void {
    this.activitySelected = activity;
  }

  onSubscriptionCancelled(): void {
    this.populateChildTemplates();
  }

  ngOnDestroy(): void {
    if (this.activitiesSub$) { this.activitiesSub$.unsubscribe(); }
    if (this.authSub$) { this.authSub$.unsubscribe(); }
  }

}
