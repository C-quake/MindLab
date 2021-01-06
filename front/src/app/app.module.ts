import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SignupInstructorComponent } from './components/signup-instructor/signup-instructor.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { LoginComponent } from './components/login/login.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { NgxPayPalModule } from 'ngx-paypal';
import { GoogleLoginProvider } from 'angularx-social-login';
import { StoreComponent } from './components/store/store.component';
import { NewcourseComponent } from './components/newcourse/newcourse.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { LibraryComponent } from './components/library/library.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { AuthGuard } from './guards/auth.guard';
import { ResultComponent } from './components/result/result.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupInstructorComponent,
    SignupStudentComponent,
    ProfileComponent,
    HomeUserComponent,
    LoginComponent,
    StoreComponent,
    NewcourseComponent,
    CourseDetailsComponent,
    LibraryComponent,
    PaypalComponent,
    ResultComponent,
    AdminDashboardComponent,
   
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgxPayPalModule,
    NgbModule
  ],
  providers: [
    AuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '907192844725-nnml0u376jpjs0imhgrjqodr5rtk2jls.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
