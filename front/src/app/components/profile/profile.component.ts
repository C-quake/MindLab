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
  query:string;
  user: any;
  image: any;
  file: any;
  experiences: any = [];
  token: any;
  numExp: number = 0;

  constructor(private profileService: ProfileService,private router:Router) {}
  update: boolean = false;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user);
    this.profileService
      .getUserById(this.user._id, this.user.role)
      .subscribe((data: any) => {
        this.updateUser(data);
      });
  }
  onChange(img: any) {
    this.image = img.files[0].name.toLowerCase();
    this.file = img.files[0];
  }
  changeView(view: boolean) {
    this.image = '';
    this.numExp = 0;
    this.experiences = [];
    this.update = view;
  }

  addExp(f: any) {
    var obj = {
      title: f.title,
      description: f.description,
      date: f.date,
    };
    this.experiences.push(obj);
    this.numExp++;
  }

  updateProfile(id: string, f: any) {
    var social = [];
    social.push(
      { facebook: f.facebook },
      { linkedin: f.linkedin },
      { twitter: f.twitter },
      { github: f.github }
    );

    const formData = new FormData();
    formData.append('file', this.file);

    var obj = {
      image: '../../../assets/images/' + this.image,
      about: f.about,
      firstName: f.firstName,
      lastName: f.lastName,
      mobile: f.mobile,
      location: f.location,
      experience: this.experiences,
      social: social,
    };
    this.profileService.update(id, obj).subscribe(() => {
      this.profileService.image(formData).subscribe(() => {
        this.profileService
          .getUserById(id, this.user.role)
          .subscribe((data: any) => {
            this.updateUser(data);
          });
      });
    });
  }

  updateUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
  Logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }
  getresult(query:any){
    this.router.navigate(['/result',query])
  }
}
