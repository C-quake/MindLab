import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  image: any;
  file: any;
  update: boolean = false;
  experiences: any = [];
  addExperience: boolean = false;
  token: any;
  imgSelectErr: boolean = false;

  constructor(private profileService: ProfileService,private router:Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.profileService
      .getUserById(this.user._id, this.user.role)
      .subscribe((data: any) => {
        this.updateUser(data);
        this.experiences = this.user.experience;
        console.log(this.user);
      });
  }
  onChange(img: any) {
    this.image = img.files[0].name.toLowerCase();
    this.file = img.files[0];
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
    if (!this.image || !this.file) {
      this.imgSelectErr = true;
      return;
    }
    const formData = new FormData();
    formData.append('file', this.file);
    var obj = { image: '../../../assets/images/' + this.image };

    this.profileService.update(this.user._id, obj).subscribe(() => {
      this.profileService.image(formData).subscribe(() => {
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
  getresult(query:any){
    this.router.navigate(['/result',query])
  }
  getVipSession(){
    
  }
}
