import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  loggedInSub$: Subscription;

  userNotFoundNotification = false;
  firstBehaviorSubjectSetUpAbortion = false;

  public email: FormControl;
  public password: FormControl;
  public signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]);
    this.password = new FormControl('', [ Validators.required ]);

    this.signinForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });

    this.loggedInSub$ = this.authService.userLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/home']);
        console.log(loggedIn);
      } else {
        if (this.firstBehaviorSubjectSetUpAbortion) { this.userNotFoundNotification = true; }
      }
      this.firstBehaviorSubjectSetUpAbortion = true;
    });
  }

  submitSignin(): void {
    this.authService.loginUser({
      email: this.email.value,
      password: this.password.value
    });
  }

  ngOnDestroy(): void {
    this.loggedInSub$.unsubscribe();
  }
}
