import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InstructorGuard implements CanActivate {
  constructor(public auth: AuthGuard, private router: Router) {}

  user = JSON.parse(localStorage.getItem('user') || '{}');

  canActivate() {
    if (this.auth.canActivate() && this.user.role === 'instructor') {
      return true;
    }
    this.router.navigate(['404']);
    return false;
  }
}
