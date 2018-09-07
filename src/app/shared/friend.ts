
/*
 * Friend
 * Users have many friends (hopefully).
 */

export class Friend {
  public username: string;
  public messages: string [];
  public profilePictureUrl: string;
  public isOnline: boolean;
  constructor (
    username,
    messages = [],
    profilePictureUrl = '',
    isOnline = true
  ) {
    this.username = username;
    this.messages = messages;
    this.profilePictureUrl = profilePictureUrl;
    this.isOnline = isOnline;
  }

  getLastMessage (): String | null {
    if (this.messages.length !== 0) {
      return this.messages[0];
    } else {
      return null;
    }
  }
}
