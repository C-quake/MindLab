import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  user: any = localStorage.getItem('user');

  constructor(private router: Router) {}

  canActivate() {
    if (this.user) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
