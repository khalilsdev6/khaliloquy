
/*
 * app/shared/user.ts
 * Shared user component.
 */

export class User {
  public username: string;
  private password: string;
  public profilePictureUrl: string;
  constructor (
    username: string = '',
    password: string = '',
    profilePictureUrl: string = "https://khalilstemmler.com/static/me.9d170f1d.jpg"
  ) {
    this.username = username;
    this.password = password;
    this.profilePictureUrl = profilePictureUrl;
  }
}
