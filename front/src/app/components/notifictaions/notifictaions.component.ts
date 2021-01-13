import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-notifictaions',
  templateUrl: './notifictaions.component.html',
  styleUrls: ['./notifictaions.component.css'],
})
export class NotifictaionsComponent implements OnInit {
  files: any = [];
  store: any = [];
  isLoading: boolean = false;
  isSent: boolean = false;
  emailForm: any;
  userSelected: any;
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(
    private service: EmailService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {
    this.emailForm = new FormGroup({
      to: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }
  ngOnInit(): void {
    this.userSelected = this.activatedRoute.snapshot.params.email;
  }

  Logout() {
    localStorage.clear();
  }

  onSelectattachment(event: any) {
    console.log(event.target.files);
    this.files.push(event.target.files[0]);
  }

  sendMail() {
    this.isLoading = true;
    this.service
      .sendService(
        this.userSelected,
        this.emailForm.value.subject,
        this.emailForm.value.description
      )
      .subscribe(() => {
        this.isLoading = false;
        this.isSent = true;
      });
  }
  videInput() {
    this.emailForm.value.to = '';
    this.emailForm.value.subject = '';
    this.emailForm.description = '';
  }
}
