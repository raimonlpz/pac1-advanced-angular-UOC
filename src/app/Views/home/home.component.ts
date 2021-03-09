import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/Shared/models/activity';
import { ActivityService } from 'src/app/Shared/services/activity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activitySelected: Activity;
  // activitySub$: Subscription;
  // activitiesSub$: Subscription;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    // this.activitiesSub$ = this.activityService.getActivities().subscribe(acts => {
    //   if (acts.length > 0) {
    //     this.onActivitySelected(acts[0]);
    //   }
    // });
  }

  onActivitySelected(activity: Activity): void {
    this.activitySelected = activity;
  }

  // ngOnDestroy(): void {
  //   if (this.activitySub$) {
  //     this.activitySub$.unsubscribe();
  //   }
  //   this.activitiesSub$.unsubscribe();
  // }
}
