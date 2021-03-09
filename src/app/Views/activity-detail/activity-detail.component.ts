import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/Shared/models/activity';
import { User } from 'src/app/Shared/models/user';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit, OnDestroy {
  @Input() activitySelected: Activity;

  userLoggedIn: User = null;
  isLoggedSub$: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedSub$ = this.authService.userLoggedIn.subscribe(userIsLogged => {
      if (userIsLogged) {
        this.userLoggedIn = userIsLogged;
      } else {
        this.userLoggedIn = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.isLoggedSub$.unsubscribe();
  }
}
