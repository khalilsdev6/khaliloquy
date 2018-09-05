
/*
 * app/shared/user.ts
 * Shared user component.
 */

export class User {
  public username: string;
  private password: string;
  constructor (username: string = '', password: string = '') {
    this.username = username;
    this.password = password;
  }
}
