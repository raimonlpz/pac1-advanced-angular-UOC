import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './Views/header/header.component';
import { FooterComponent } from './Views/footer/footer.component';
import { HomeComponent } from './Views/home/home.component';
import { SigninComponent } from './Views/signin/signin.component';
import { JoinComponent } from './Views/join/join.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './Shared/inmemory-db/in-memory-data.service';
import { ActivitiesListComponent } from './Views/activities-list/activities-list.component';
import { ActivityDetailComponent } from './Views/activity-detail/activity-detail.component';
import { ProfileComponent } from './Views/profile/profile.component';
import { UpdateComponent } from './Views/profile/update/update.component';
import { EducationComponent } from './Views/profile/education/education.component';
import { MyActivitiesComponent } from './Views/my-activities/my-activities.component';
import { FavoritesComponent } from './Views/favorites/favorites.component';
import { AdminComponent } from './Views/admin/admin.component';
import { ActivityComponent } from './Views/admin/activity/activity.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    JoinComponent,
    ActivitiesListComponent,
    ActivityDetailComponent,
    ProfileComponent,
    UpdateComponent,
    EducationComponent,
    MyActivitiesComponent,
    FavoritesComponent,
    AdminComponent,
    ActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
