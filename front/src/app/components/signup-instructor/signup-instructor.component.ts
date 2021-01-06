import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../services/instructor-service.service';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-signup-instructor',
  templateUrl: './signup-instructor.component.html',
  styleUrls: ['./signup-instructor.component.css'],
})
export class SignupInstructorComponent implements OnInit {
  constructor(
    private instructorService: InstructorService,
    private router: Router,
    private authService: SocialAuthService
  ) {}

  err: boolean = false;
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user: any) => {
      this.instructorService
        .findInstructor(user.email)
        .subscribe((res: any) => {
          if (res) {
            localStorage.setItem('user', JSON.stringify(res));
          } else {
            user.username = user.name;
            user.image = user.photoUrl;
            user.role = 'instructor';
            this.instructorService.addInstructor(user).subscribe((res) => {
              localStorage.setItem('user', JSON.stringify(res));
            });
          }
        });
    });
  }

  submit(f: any) {
    if (!f.username || !f.password || !f.email) {
      this.err = true;
      return;
    }
    var obj = {
      username: f.username,
      email: f.email,
      password: f.password,
      image: 'default-profile.jpg',
      about: '',
      firstName: '',
      lastName: '',
      mobile: '',
      location: '',
      experience: [],
      social: [],
      role: 'instructor',
    };
    this.instructorService.addInstructor(obj).subscribe((res) => {
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    });
  }
}
