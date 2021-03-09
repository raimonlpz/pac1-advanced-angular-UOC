import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/Shared/models/activity';
import { ActivityService } from 'src/app/Shared/services/activity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  activitiesSub$: Subscription;

  userIsSignedUp = false;
  activitySelected: Activity;
  activities: Array<Activity>;

  constructor(
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    this.activitiesSub$ = this.activityService.getActivities().subscribe(activities => {
      this.activities = activities;
      if (this.activities.length > 0) { this.onActivitySelected(this.activities[0]); }
    });
  }

  onActivitySelected(activity: Activity): void {
      this.activitySelected = activity;
  }

  ngOnDestroy(): void {
    if (this.activitiesSub$) { this.activitiesSub$.unsubscribe(); }
  }
}
