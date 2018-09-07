

export class Message {
  public text: string;
  public username: string;
  constructor (text, username) {
    this.text = text;
    this.username = username;
  }

  isMessageFromMe (myUsername: string): boolean {
    return this.username === myUsername;
  }
}
