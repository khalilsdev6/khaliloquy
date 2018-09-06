
/*
 * UserInfo
 * @class that holds all possibe information about a
 * user.
 */

export class UserInfo {
  public username: string;
  public firstName: string;
  public lastName: number;
  public profilePictureUrl: string;
  constructor(userInfo: any) {
    this.username = userInfo.username;
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    this.profilePictureUrl = userInfo.profilePictureUrl;
  }
}
