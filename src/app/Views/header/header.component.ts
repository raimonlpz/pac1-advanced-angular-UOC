import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Shared/models/user';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userLoggedIn: User = null;
  isLoggedSub$: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedSub$ = this.authService.userLoggedIn.subscribe(userIsLogged => {
      if (userIsLogged) {
        this.isLoggedIn = true;
        this.userLoggedIn = userIsLogged;
      } else {
        this.isLoggedIn = false;
        this.userLoggedIn = null;
      }
    });
  }

  logoutUser(): void {
    this.authService.logoutUser();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.isLoggedSub$.unsubscribe();
  }
}
