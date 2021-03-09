import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/Shared/models/activity';
import { User } from 'src/app/Shared/models/user';
import { ActivityService } from 'src/app/Shared/services/activity.service';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  activitiesSub$: Subscription;
  activityDeletionSub$: Subscription;
  authSub$: Subscription;
  activities: Array<Activity>;
  userLogged: User;

  constructor(
    private activityService: ActivityService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.activitiesSub$ = this.activityService.getActivities().subscribe(activities => {
     this.authSub$ = this.authService.userLoggedIn.subscribe(user => {
        if (user) {
          this.userLogged = user;
          this.activities = activities.filter(act => act.adminId === this.userLogged.id);
        }
      });
    });
  }

  updateActivity(id: string): void {
    this.router.navigateByUrl(`/admin/activity/${id}`);
  }

  deleteActivity(id: number): void {
    this.activityDeletionSub$ = this.activityService.deleteActivity(id).subscribe(() => {
      this.activities = this.activities.filter(a => a.id !== id);
    });
  }

  ngOnDestroy(): void {
    if (this.activitiesSub$) { this.activitiesSub$.unsubscribe(); }
    if (this.authSub$) { this.authSub$.unsubscribe(); }
    if (this.activityDeletionSub$) { this.activityDeletionSub$.unsubscribe(); }
  }

}
