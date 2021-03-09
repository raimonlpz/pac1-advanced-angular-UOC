import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Shared/guards/auth.guard';
import { ActivityComponent } from './Views/admin/activity/activity.component';
import { AdminComponent } from './Views/admin/admin.component';
import { FavoritesComponent } from './Views/favorites/favorites.component';
import { HomeComponent } from './Views/home/home.component';
import { JoinComponent } from './Views/join/join.component';
import { MyActivitiesComponent } from './Views/my-activities/my-activities.component';
import { EducationComponent } from './Views/profile/education/education.component';
import { ProfileComponent } from './Views/profile/profile.component';
import { UpdateComponent } from './Views/profile/update/update.component';
import { SigninComponent } from './Views/signin/signin.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'join', component: JoinComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/update', component: UpdateComponent, canActivate: [AuthGuard] },
  { path: 'profile/education', component: EducationComponent, canActivate: [AuthGuard] },
  { path: 'profile/education/:id', component: EducationComponent, canActivate: [AuthGuard] },
  { path: 'my-activities', component: MyActivitiesComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]  },
  { path: 'admin/activity', component: ActivityComponent, canActivate: [AuthGuard] },
  { path: 'admin/activity/:id', component: ActivityComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: 'home', pathMatch: 'prefix'},
  { path: '**', redirectTo: 'home', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
