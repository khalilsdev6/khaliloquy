import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private db: AngularFireDatabase) {
    this.db = db;
  }

  /**
   * createNewUserIfNotExists
   * @function that creates a new user in Firebase if they
   * don't currently exist. If they do exist, then nothing is
   * done.
   */

  async createUserIfNotExists (user: User) {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref(`users/${user.username}`)
        .on('value', snapshot => {
          const firebaseUser = snapshot.val() || null;

          // User already exists.
          if (firebaseUser) {
            resolve(user);
          }

        // User doesn't exist, we need to create
        // them.
        else {
          const newUserRef = this.db.object(`users/${user.username}`);
          newUserRef.set({ ...user });
          resolve(user);
        }
      });
    });
  }

  changeUsername () {
  }
}
