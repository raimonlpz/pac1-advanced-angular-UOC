import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/Shared/models/activity';
import { ActivityService } from 'src/app/Shared/services/activity.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit, OnDestroy {
  @Output() activityToSeeInDetail = new EventEmitter<Activity>();
  activityList: Activity[];
  activitiesSub$: Subscription;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activitiesSub$ = this.activityService.getActivities().subscribe(activities => {
      this.activityList = activities;

      this.activityToSeeInDetail.emit(this.activityList[0]);
    });
  }

  onActionClicked(activity: Activity): void {
    this.activityToSeeInDetail.emit(activity);
  }

  ngOnDestroy(): void {
    this.activitiesSub$.unsubscribe();
  }
}
