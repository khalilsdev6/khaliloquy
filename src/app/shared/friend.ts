
/*
 * Friend
 * Users have many friends (hopefully).
 */

export class Friend {
  public username: string;
  public lastMessage: string;
  public profilePictureUrl: string;
  public isOnline: boolean;
  constructor (
    username,
    lastMessage = 'You made a new friend',
    profilePictureUrl = '',
    isOnline = true
  ) {
    this.username = username;
    this.lastMessage = lastMessage;
    this.profilePictureUrl = profilePictureUrl;
    this.isOnline = isOnline;
  }

  getLastMessage (): String | null {
    return this.lastMessage;
  }
}
