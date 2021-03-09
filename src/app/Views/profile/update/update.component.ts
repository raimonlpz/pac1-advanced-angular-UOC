import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyProfile, Nationality, TouristProfile } from 'src/app/Shared/models/profile';
import { User, UserType } from 'src/app/Shared/models/user';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {

  userLoggedIn: User;
  isLoggedSub$: Subscription;
  profile: TouristProfile | CompanyProfile;
  readonly nationalities: Array<string> = Object.values(Nationality);

  public name: FormControl;
  public surname: FormControl;
  public birthDate: FormControl;
  public phone: FormControl;
  public nationality: FormControl;
  public nif: FormControl;
  public aboutMe: FormControl;

  public companyName: FormControl;
  public companyDescription: FormControl;
  public cif: FormControl;

  public profileForm: FormGroup = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedSub$ = this.authService.userLoggedIn.subscribe(userLogged => {
      if (userLogged) {
        this.userLoggedIn = userLogged;
        this.profile = this.userLoggedIn.profile;
        this.populateFormControlValues();

      } else {
        this.profile = null;
        this.userLoggedIn = null;
      }
    });
  }

  populateFormControlValues(): void {
    this.name = new FormControl(this.profile.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern('^(?! )[A-Za-z ]*(?<! )$')
    ]);
    this.surname = new FormControl(this.profile.surname, [
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern('^(?! )[A-Za-z ]*(?<! )$')
    ]);
    this.birthDate = new FormControl(this.profile.birthDate, [
      Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$')
    ]);
    this.phone = new FormControl(this.profile.phone);
    this.nationality = new FormControl(
      this.profile.nationality ? this.profile.nationality : Nationality.ES,
      [Validators.required]
    );
    this.nif = new FormControl(this.profile.nif);
    this.aboutMe = new FormControl(this.profile.aboutMe);

    if (this.userLoggedIn.type === UserType.Company) {
      this.companyName = new FormControl((this.profile as CompanyProfile).companyName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern('^[^-\s][a-zA-Z0-9_\s-]+$')
      ]);
      this.companyDescription = new FormControl((this.profile as CompanyProfile).companyDescription);
      this.cif = new FormControl((this.profile as CompanyProfile).cif, [Validators.required]);
    } else {
      /* If user type is Tourist ignore this Form controls validation requirements... */
      this.companyName = new FormControl();
      this.companyDescription = new FormControl();
      this.cif = new FormControl();
    }

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      birthDate: this.birthDate,
      phone: this.phone,
      nationality: this.nationality,
      nif: this.nif, // ¡¡TO-DO!! validation of NIF with directive
      aboutMe: this.aboutMe,
      companyName: this.companyName,
      companyDescription: this.companyDescription,
      cif: this.cif
    });
  }

  submitProfileForm(): void {
    const profileUpdate = this.userLoggedIn.type
      === UserType.Tourist
      ? new TouristProfile(
          this.name.value,
          this.nationality.value,
          this.nif.value,
          this.profile.education,
          this.surname.value,
          this.birthDate.value,
          this.phone.value,
          this.aboutMe.value
        )
      : new CompanyProfile(
          this.name.value,
          this.nationality.value,
          this.nif.value,
          this.profile.education,
          this.companyName.value,
          this.cif.value,
          this.companyDescription.value,
          this.surname.value,
          this.birthDate.value,
          this.phone.value,
          this.aboutMe.value
      );

    this.userLoggedIn.name =  this.name.value;
    this.userLoggedIn.surname = this.surname.value;
    this.userLoggedIn.profile = profileUpdate;
    this.userService.updateUser({
        ...this.userLoggedIn
    }).subscribe(_ => {
      this.router.navigateByUrl('/profile');
    });
  }

  ngOnDestroy(): void {
    this.isLoggedSub$.unsubscribe();
  }

}
