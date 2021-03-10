import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyProfile, TouristProfile } from 'src/app/Shared/models/profile';
import { UserType } from 'src/app/Shared/models/user';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { CheckConfirmationPassword } from '../../Shared/directives/confirm-password.validators';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit, OnDestroy {
  pwSub$: Subscription;
  loggedInSub$: Subscription;

  firstBehaviorSubjectSetUpAbortion = false;
  userAlreadyExistsNotification = false;

  public name: FormControl;
  public surname: FormControl;
  public type: FormControl;
  public email: FormControl;
  public password: FormControl;
  public repeatPassword: FormControl;
  public joinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern('^(?! )[A-Za-z ]*(?<! )$')
    ]);
    this.surname = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern('^(?! )[A-Za-z ]*(?<! )$')
    ]);
    this.type = new FormControl(UserType.Tourist, [Validators.required]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]);
    this.password = new FormControl('', [ Validators.required, Validators.minLength(8) ]);

    this.repeatPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);

    this.joinForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      type: this.type,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword
    });

    this.pwSub$ = this.password.valueChanges.subscribe(pw => {
      this.repeatPassword.setValidators(CheckConfirmationPassword.checkConfirmationPw(pw));
    });

    this.loggedInSub$ = this.authService.userLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/home']);
        console.log(loggedIn);
      } else {
        if (this.firstBehaviorSubjectSetUpAbortion) { this.userAlreadyExistsNotification = true; }
      }
      this.firstBehaviorSubjectSetUpAbortion = true;
    });
  }

  submitJoinNow(): void {
    const isTourist = this.type.value === UserType.Tourist;
    this.authService.registerUser({
      name: this.name.value,
      surname: this.surname.value,
      type: isTourist ? UserType.Tourist : UserType.Company,
      email: this.email.value,
      password: this.password.value,
      profile: isTourist
        ? new TouristProfile(this.name.value, null, null, [], this.surname.value)
        : new CompanyProfile(this.name.value, null, null, [], null, null, null, this.surname.value)
    });
  }

  ngOnDestroy(): void {
    this.pwSub$.unsubscribe();
    this.loggedInSub$.unsubscribe();
  }
}
