import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AccountService } from './account.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState = null;

  constructor(
    private afAuth: AngularFireAuth,
    private accountService: AccountService,
    private router: Router
  ) { }

  init () {
    console.log('[Auth]: Observing changes on Auth Status');
    this.afAuth.auth.onAuthStateChanged(this.handleAuthStateChanges);
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  handleAuthStateChanges (user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
      // Redirect them to the front page.
      console.log('[Auth]: User status changes from Logged In to Logged Out.');
      this.router.navigate(['signup']);
    }
  }

  /**
   * goGithubLogin
   * @function that performs a GitHub Firebase Authentication. At the
   * end of this function, we should be sure that the current status
   * of the user is Authenticated. To check Authentication status,
   * set an Observable on the Auth object.
   */

  async doGithubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('user');
    try {
      const response = await this.afAuth.auth.signInWithPopup(provider);
      const token = response.credential;
      const githubProfile: any = response.additionalUserInfo.profile;
      const { username } = response.additionalUserInfo;
      const { avatar_url } = githubProfile;
      const user = new User(username, '', avatar_url);
      await this.accountService.createUserIfNotExists(user);
    } catch (err) {
      console.log(err);
    }
  }

  /*
   * isAuthenticated
   * @function that will tell us if the current user is
   * authenticated by checking the auth token expiry.
   */

  public isAuthenticated(): boolean {
    return !this.authState === null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }
}
