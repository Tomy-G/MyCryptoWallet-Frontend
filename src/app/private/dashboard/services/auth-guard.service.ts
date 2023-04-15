import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!sessionStorage.getItem('user')) {
      this._router.navigate(['']);
      return false;
    }
    return true;
  }
}
