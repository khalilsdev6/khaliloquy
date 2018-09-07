import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/*
 * AuthGuard
 * @class that handles deciding whether the current route should
 * be activated or not.
 *
 * The order that the 5 types of guards that get called are as follows:
 * - CanActivate
 * - CanActivateChild
 * - CanDeactivate
 * - CanLoad
 * - Resolve
 *
 * @see app.module.ts for how we're protecting routes in the
 * routes config.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  /*
   * canActivate
   * We need to add the canActivate property as per the CanActivate
   * interface that we're implementing. It must return a true or 
   * false as to whether we should activate the route or not.
   */

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // TODO: Make this work on the backend.
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    return true;
  }
}