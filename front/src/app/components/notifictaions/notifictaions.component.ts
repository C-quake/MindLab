import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { EmailService } from '../../services/email.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-notifictaions',
  templateUrl: './notifictaions.component.html',
  styleUrls: ['./notifictaions.component.css']
})
export class NotifictaionsComponent implements OnInit {
  files: any = [];
  store: any = [];

  emailForm: any;
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(
    private service: EmailService,
    private profileService: ProfileService
  ) {
    this.emailForm = new FormGroup({
      to: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),

    });
  }
  Logout() {
    localStorage.clear();
  }
  ngOnInit(): void {
    // for (var ele of this.user.store) {
    //   this.store.push(ele._id);
    // }
  }
  // isValid(controlName: String) {
  //   return (
  //     this.loginForm.get(controlName).invalid &&
  //     this.loginForm.get(controlName).touched
  //   );
  // }

  onSelectattachment(event: any) {
    console.log(event.target.files);
    this.files.push(event.target.files[0]);
  }


  sendMail() {
    console.log('hi')

    this.service
      .sendService(
        this.user._id,
        this.emailForm.value.to,
        this.emailForm.value.subject,
        this.emailForm.value.description
      )
      .subscribe((res: any) => {
        this.videInput();
        // this.store.push(res._id);
        // this.user.store.push(res);
        // localStorage.setItem('user', JSON.stringify(this.user));
        // this.profileService
        //   .update(this.user._id, { store: this.store })
        //   .subscribe(() => console.log('profile updated'));
      });
  }
  videInput() {
    this.emailForm.value.to = '';
    this.emailForm.value.subject = '';
    this.emailForm.description = '';
  }

}

