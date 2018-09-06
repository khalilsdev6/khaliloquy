import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../user';

/*
 * app/shared/services/account.service.ts
 * @class used for all Account creation and login
 * HTTP services.
 */

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private API_ROOT: String = `http://localhost:8000/v1`;

  constructor(private http: Http) { }

  /*
   * createAccount
   * @desc Creates a new user account.
   * @param {User} the new user
   * @return {Promise}
   */

  createAccount (user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 2000);
    });
    // return this.http.post(`${this.API_ROOT}/account`, user).toPromise();
  }

  /*
   * login
   * @desc Logs a user in.
   * @param {User} the new user
   * @return {Promise}
   */

  login (user: User) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 2000);
    });
    // return this.http.post(`${this.API_ROOT}/account/login`, user).toPromise();
  }

  editAccount () {}

  deleteAccount () {}
}
