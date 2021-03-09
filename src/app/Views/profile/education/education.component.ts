import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Education, EducationLevelFormativo, EducationLevelUniversitario, EducationType } from 'src/app/Shared/models/education';
import { User } from 'src/app/Shared/models/user';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, OnDestroy {
  private routeSub$: Subscription;
  educationId: string;
  educationToEdit: Education = null;

  readonly educationTypes: Array<string>
    = Object.values(EducationType);
  readonly educationLevelUniversitarios: Array<string>
    = Object.values(EducationLevelUniversitario);
  readonly educationLevelFormativos: Array<string>
    = Object.values(EducationLevelFormativo);

  public type: FormControl;
  public level: FormControl;
  public name: FormControl;
  public university: FormControl;
  public finishDate: FormControl;
  public educationForm: FormGroup = null;

  private userLogged: User;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe(params => {
      this.educationId = params.id;

      this.auth.userLoggedIn.subscribe(userLogged => {
        this.userLogged = userLogged;
        if (this.educationId) {
          this.educationToEdit = this.userLogged.profile.education.filter(ed => ed.id === this.educationId)[0];
          this.populateEducationForm(this.educationToEdit);
        } else {
          this.populateEducationForm();
        }
      });
    });
  }

  populateEducationForm(education?: Education): void {
    this.type = new FormControl(
      education ? education.type : EducationType.TituloUniversitario, [Validators.required]
    );
    this.level = new FormControl(
      education ? education.level : EducationLevelUniversitario.Grado, [Validators.required]
    );
    this.name = new FormControl(education ? education.name : '', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);
    this.university = new FormControl(education ? education.university : '', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55)
    ]);
    this.finishDate = new FormControl(education ? education.finishDate : '', [
      Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$')
    ]);

    this.educationForm = this.formBuilder.group({
      type: this.type,
      level: this.level,
      name: this.name,
      university: this.university,
      finishDate: this.finishDate
    });
  }

  onEduTypeChangeAssignValueToLevel(): void {
    this.level =
      new FormControl(this.type.value === EducationType.TituloUniversitario
          ? EducationLevelUniversitario.Grado
          : EducationLevelFormativo.GradoSuperior,
          [Validators.required]
      );
  }

  submitEducationChangesToUserProfile(): void {
    if (this.educationId) {
      this.userLogged.profile.education[
        this.userLogged.profile.education.indexOf(this.educationToEdit)] = new Education(
        this.educationId,
        this.type.value,
        this.level.value,
        this.name.value,
        this.university.value,
        this.finishDate.value ? this.finishDate.value : null
      );
    } else {
      this.userLogged.profile.education.push(new Education(
        String(Date.now()), // mock ID
        this.type.value,
        this.level.value,
        this.name.value,
        this.university.value,
        this.finishDate.value ? this.finishDate.value : null
      ));
    }

    this.userService.updateUser({
      ...this.userLogged
    }).subscribe(_ => {
      this.router.navigateByUrl('/profile');
    });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }
}
