import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { GoogleLoginProvider } from 'angularx-social-login';
import { StoreComponent } from './components/store/store.component';
import { NewcourseComponent } from './components/newcourse/newcourse.component';
import {CourseDetailsComponent} from './components/course-details/course-details.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { UsersListComponent } from './component/users-list/users-list.component';
import { ChatWindowComponent } from './component/chat-window/chat-window.component';
import { ChatNamePopupComponent } from './component/chat-name-popup/chat-name-popup.component';
import { ChatComponent } from './components/chat/chat.component'
import { ResultComponent } from './components/result/result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

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
    EditCourseComponent,
    UsersListComponent,
    ChatWindowComponent,
    ChatNamePopupComponent,
    ChatComponent,
    ResultComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgbModule,
  ],
  providers: [
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
