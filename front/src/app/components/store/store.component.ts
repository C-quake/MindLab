import { ProfileService } from './../../services/profile.service';
import { StoreService } from './../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  query: string = '';
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  file: any;
  video: any;
  store: any = [];
  constructor(
    private sanitizer: DomSanitizer,
    private storeService: StoreService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    console.log('here', this.user.store);
    for (var ele of this.user.store) {
      this.store.push(ele._id);
    }
  }
  Logout() {
    localStorage.clear();
  }

  deleteCourse(id: any) {
    for (var i = 0; i < this.user.store.length; i++) {
      if (id === this.user.store[i]._id) {
        this.user.store.splice(i, 1);
        break;
      }
    }

    for (var i = 0; i < this.store.length; i++) {
      if (this.store[i] === id) {
        this.store.splice(i, 1);
      }
    }

    localStorage.setItem('user', JSON.stringify(this.user));

    this.profileService
      .update(this.user._id, { store: this.store })
      .subscribe(() => console.log('profile updated'));

    this.storeService
      .deleteService(id)
      .subscribe(() => console.log('course deleted'));
  }

  getfile(f: any) {
    console.log(f);
    this.file = '';
    this.file = this.sanitizer.bypassSecurityTrustResourceUrl(
      "http://res.cloudinary.com/dtl8igxn0/image/upload/v1610292027/nfn1hakqfibttdnsdxbe.pdf"
    );
  }

  getCourse(id: any) {
    this.router.navigate(['/coursedetails', id]);
  }

  getresult(query: any) {
    this.router.navigate(['/result', query]);
  }
}
