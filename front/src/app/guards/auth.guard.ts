import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: any = localStorage.getItem('user');
  constructor(private router: Router) {}
  canActivate() {
    if (this.user) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
