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
            res.image =
              '../../../assets/images/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg';
            localStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          } else {
            user.username = user.name;
            user.image = user.photoUrl;
            user.role = 'instructor';
            user.social = {
              facebook: '',
              twitter: '',
              linkedin: '',
              github: '',
            };
            user.store = [];
            this.instructorService.addInstructor(user).subscribe((res) => {
              localStorage.setItem('user', JSON.stringify(res));
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });
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
      image:
        '../../../assets/images/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg',
      about: '',
      firstName: '',
      lastName: '',
      mobile: '',
      location: '',
      experience: [],
      social: {
        facebook: '',
        twitter: '',
        linkedin: '',
        github: '',
      },
      store: [],
      role: 'instructor',
    };
    this.instructorService.addInstructor(obj).subscribe((res) => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
  }
}
