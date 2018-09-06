import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtService: JwtHelperService) { }

  /*
   * isAuthenticated
   * @function that will tell us if the current user is 
   * authenticated by checking the auth token expiry.
   */

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('khaliloquy-auth-token');
    if (token === null) { return false; }
    return !this.jwtService.isTokenExpired(token);
  }
}
