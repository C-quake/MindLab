import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseDetailsComponent} from './components/course-details/course-details.component'
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupInstructorComponent } from './components/signup-instructor/signup-instructor.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { StoreComponent } from './components/store/store.component';
import { NewcourseComponent } from './components/newcourse/newcourse.component';
import {EditCourseComponent} from './components/edit-course/edit-course.component';
import {ChatComponent} from './components/chat/chat.component';
import {ResultComponent} from './components/result/result.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  {path:'coursedetails/:id' , component:CourseDetailsComponent},
  { path: '', component: HomeComponent },
  { path: 'sinupstudent', component: SignupStudentComponent },
  { path: 'singupinstructor', component: SignupInstructorComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'homeuser', component: HomeUserComponent },
  { path: 'store', component: StoreComponent },
  { path: 'newcourse', component: NewcourseComponent },
  {path: 'editCourse/:id' , component: EditCourseComponent},
 { path:'result/:query' , component:  ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
