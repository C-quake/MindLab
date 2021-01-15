import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  currentUser: any = JSON.parse(localStorage.getItem('user') || '{}');
  image: any;
  file: any;
  update: boolean = false;
  experiences: any = [];
  addExperience: boolean = false;
  token: any;
  imgSelectErr: boolean = false;
  query: any;
  isCurrentUser: boolean = true;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private activateroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (
      (this.activateroute.snapshot.params.id,
      this.activateroute.snapshot.params.role)
    ) {
      this.isCurrentUser = false;
      this.profileService
        .getUserById(
          this.activateroute.snapshot.params.id,
          this.activateroute.snapshot.params.role
        )
        .subscribe((data: any) => {
          this.user = data;
          this.experiences = this.user.experience;
        });
    } else {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      this.profileService
        .getUserById(this.user._id, this.user.role)
        .subscribe((data: any) => {
          this.updateUser(data);
          this.experiences = this.user.experience;
        });
    }
  }
  onChange(event: any) {
    this.image = event.target.files[0].name.toLowerCase();
    this.file = event.target.files[0];
    this.imgSelectErr = false;
  }
  changeView(view: boolean) {
    this.image = '';
    this.update = view;
  }

  addExp(f: any) {
    if (!f.title || !f.description || !f.date) return;
    var ID = function () {
      return '_' + Math.random().toString(36).substr(2, 9);
    };
    f.id = ID();
    console.log(this.experiences);
    this.experiences.push(f);
    this.profileService
      .update(this.user._id, { experience: this.experiences })
      .subscribe();
  }

  deleteExp(id: string) {
    for (var i = 0; i < this.experiences.length; i++) {
      if (this.experiences[i].id === id) {
        this.experiences.splice(i, 1);
      }
    }
    this.profileService
      .update(this.user._id, { experience: this.experiences })
      .subscribe();
  }

  updateImage() {
    console.log(this.file)
    if (!this.image || !this.file) {
      this.imgSelectErr = true;
      return;
    }
    const formData = new FormData();
    formData.append('file', this.file);
    this.profileService.image(formData).subscribe((res:any) => {
     var obj = { image: res };
     this.profileService.update(this.user._id, obj).subscribe(() => {
        this.profileService
          .getUserById(this.user._id, this.user.role)
          .subscribe((data: any) => {
            this.updateUser(data);
          });
      });
    });
  }

  updateProfile(id: string, f: any) {
    var social = {
      facebook: f.facebook,
      twitter: f.twitter,
      linkedin: f.linkedin,
      github: f.github,
    };

    var obj = {
      about: f.about,
      firstName: f.firstName,
      lastName: f.lastName,
      mobile: f.mobile,
      location: f.location,
      social: social,
    };
    this.profileService.update(id, obj).subscribe(() => {
      this.profileService
        .getUserById(id, this.user.role)
        .subscribe((data: any) => {
          this.updateUser(data);
        });
    });
  }

  updateUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
  Logout() {
    localStorage.clear();
  }

  getresult(query: any) {
    this.router.navigate(['/result', query]).then(() => {
      window.location.reload();
    });
  }
  getVipSession() {
    window.open('http://localhost:3001', '_blank');
  }
  sendNotif(email: any) {
    this.router.navigate(['/notifications', email]).then(() => {
      window.location.reload();
    });
  }
}
