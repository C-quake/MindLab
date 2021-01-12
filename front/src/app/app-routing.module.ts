import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { PaypalComponent } from './components/paypal/paypal.component';
import { LibraryComponent } from './components/library/library.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupInstructorComponent } from './components/signup-instructor/signup-instructor.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { StoreComponent } from './components/store/store.component';
import { NewcourseComponent } from './components/newcourse/newcourse.component';
import { ChatComponent } from './components/chat/chat.component';
import { EditComponent } from './components/edit/edit.component';
import { StudentGuard } from './guards/student.guard';
import { InstructorGuard } from './guards/instructor.guard';
import { HomeGuard } from './guards/home.guard';
import { ResultComponent } from './components/result/result.component';
import {ViewcoursesComponent} from './components/viewcourses/viewcourses.component';
import { ViewinstructorsComponent } from './components/viewinstructors/viewinstructors.component';
import { NotifictaionsComponent } from './components/notifictaions/notifictaions.component';

const routes: Routes = [
  {path:'notifications', component: NotifictaionsComponent},
  { path: 'chat', component: ChatComponent },
  { path: '', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
  { path: 'coursedetails/:id', component: CourseDetailsComponent },
  {
    path: 'signupstudent',
    component: SignupStudentComponent,
    canActivate: [HomeGuard],
  },
  {
    path: 'signupinstructor',
    component: SignupInstructorComponent,
    canActivate: [HomeGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:role/:id', component: ProfileComponent },

  { path: 'home', component: HomeUserComponent },
  { path: 'store', component: StoreComponent, canActivate: [InstructorGuard] },
  {
    path: 'newcourse',
    component: NewcourseComponent,
    canActivate: [InstructorGuard],
  },
  { path: 'library', component: LibraryComponent, canActivate: [StudentGuard] },
  { path: 'paypal', component: PaypalComponent },
  { path: 'result/:query', component: ResultComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'result/:query', component: ResultComponent },
  { path: 'edit/:id', component: EditComponent },
  { path:'viewcourses' , component:  ViewcoursesComponent},
  { path:'viewinstructors' , component:  ViewinstructorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
