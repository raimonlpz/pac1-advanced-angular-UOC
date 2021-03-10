import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/Shared/models/activity';
import { ActivityService } from 'src/app/Shared/services/activity.service';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  activitiesSub$: Subscription;
  authSub$: Subscription;

  activitySelected: Activity;
  activities: Array<Activity> = [];
  activitiesIds: Array<number>;

  userId: number;

  constructor(
    private authService: AuthService,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.authSub$ = this.authService.userLoggedIn.subscribe(userLogged => {
      if (userLogged) {
        this.userId = userLogged.id;
        this.populateChildTemplates();
      }
    });
  }

  onActivitySelected(activity: Activity): void {
    this.activitySelected = activity;
  }

  populateChildTemplates(): void {
    this.activitiesIds = JSON.parse(window.localStorage.getItem(`FavActivities-User${this.userId}`));
    this.activities = [];
    if (this.activitiesIds) {
      this.activitiesSub$ = this.activityService.getActivities().subscribe(activities => {
        activities.forEach(a => {
          if (this.activitiesIds.indexOf(a.id) !== -1) {
            this.activities.push(a);
          }
        });
        this.activitySelected = this.activities ?  this.activities[0] : null;
      });
    }
  }

  onFavsCancelled(): void {
    this.populateChildTemplates();
  }

}
