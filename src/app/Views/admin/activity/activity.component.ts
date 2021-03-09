import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Activity, Category, Languages, SubcategoryCYP, SubcategoryEno, SubcategoryPlaya } from 'src/app/Shared/models/activity';
import { ActivityService } from 'src/app/Shared/services/activity.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { User } from 'src/app/Shared/models/user';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {

  readonly categoryTypes: Array<string>
  = Object.values(Category);
  readonly subcategoryTypesCYP: Array<string>
    = Object.values(SubcategoryCYP);
  readonly subcategoryTypesEno: Array<string>
    = Object.values(SubcategoryEno);
  readonly subcategoryTypesPlaya: Array<string>
    = Object.values(SubcategoryPlaya);
  readonly languageTypes: Array<string>
    = Object.values(Languages);

  routeSub$: Subscription;
  activitySub$: Subscription;
  authSub$: Subscription;

  userLogged: User;
  activityId: number;
  activity: Activity;
  isNewActivity = true;

  public name: FormControl;
  public description: FormControl;
  public category: FormControl;
  public subcategory: FormControl;
  public price: FormControl;
  public language: FormControl;
  public date: FormControl;

  public activityForm: FormGroup = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe(params => {
      if (params.id) {
        this.isNewActivity = false;
        this.activityId = params.id;
        this.activitySub$ = this.activityService.getActivity(Number(this.activityId)).subscribe(act => {
          this.activity = act;
          this.populateActivityForm(this.activity);
        });
      } else {
        this.populateActivityForm();
      }
    });

    this.authSub$ = this.authService.userLoggedIn.subscribe(user => {
      this.userLogged = user;
    });
  }

  populateActivityForm(activity?: Activity): void {
    this.name = new FormControl(
        activity ? activity.name : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(55),
    ]);

    this.category = new FormControl(
      activity ? activity.category : Category.CulturaYPatrimonio, [
        Validators.required
    ]);

    this.subcategory = new FormControl(
      activity ? activity.subcategory : SubcategoryCYP.Espectaculo, [
        Validators.required
    ]);

    this.description = new FormControl(activity ? activity.description : '');
    this.language = new FormControl(activity ? activity.language : Languages.Catalan, [Validators.required]);
    this.date = new FormControl(activity ? activity.date : '', [
      Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$')
    ]);
    this.price = new FormControl(activity ? activity.price : 0, [
      Validators.required,
      // Validators.pattern('\d+([.]\d+)?'),
      Validators.min(0)
    ]);

    this.activityForm = this.formBuilder.group({
      name: this.name,
      category: this.category,
      subcategory: this.subcategory,
      description: this.description,
      language: this.language,
      date: this.date,
      price: this.price
    });
  }

  onCategoryChangeAssignValueToSubCat(): void {
    let newDefaultValue: SubcategoryCYP | SubcategoryEno | SubcategoryPlaya;
    switch (this.category.value) {
      case Category.CulturaYPatrimonio:
        newDefaultValue = SubcategoryCYP.Concierto;
        break;
      case Category.Enoturismo:
        newDefaultValue = SubcategoryEno.Bodega;
        break;
      case Category.Playas:
        newDefaultValue = SubcategoryPlaya.ActividadNautica;
        break;
    }
    this.subcategory =
      new FormControl(newDefaultValue, [Validators.required]);
  }

  submitActivityChangesToService(): void {
    if (this.isNewActivity) {
      this.activityService.addActivity({
          adminId: this.userLogged.id,
          name: this.name.value,
          description: this.description.value,
          category: this.category.value,
          subcategory: this.subcategory.value,
          price: this.price.value,
          language: this.language.value,
          date: this.date.value,
          peopleRegistered: []
      }).subscribe(() => {
        this.router.navigateByUrl('/admin');
      });
    } else {
      this.activityService.updateActivity({
        adminId: this.activity.adminId,
        name: this.name.value,
        description: this.description.value,
        category: this.category.value,
        subcategory: this.subcategory.value,
        price: this.price.value,
        language: this.language.value,
        date: this.date.value,
        peopleRegistered: this.activity.peopleRegistered,
        id: this.activity.id
    }).subscribe(() => {
      this.router.navigateByUrl('/admin');
    });
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub$) { this.routeSub$.unsubscribe(); }
    if (this.activitySub$) { this.activitySub$.unsubscribe(); }
  }
}

