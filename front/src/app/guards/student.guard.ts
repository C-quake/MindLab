import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(public auth: AuthGuard) {}

  user = JSON.parse(localStorage.getItem('user') || '{}');

  canActivate() {
    if (this.auth.canActivate() && this.user.role === 'student') {
      return true;
    }
    return false;
  }
}
