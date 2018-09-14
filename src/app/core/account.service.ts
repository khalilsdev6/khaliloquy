import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
      this.db = db;
      this.afAuth = afAuth;
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
        .on('value', async snapshot => {
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
          await this.changeUsername(user.username);
          resolve(user);
        }
      });
    });
  }

  changeUsername (username: string) {
    const user = this.afAuth.auth.currentUser;

    return user.updateProfile({
      displayName: username,
      photoURL: user.photoURL
    });
  }
}
