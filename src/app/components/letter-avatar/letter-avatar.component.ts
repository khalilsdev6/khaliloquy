import { Component, OnInit, ElementRef, Input, ViewEncapsulation, OnChanges } from '@angular/core';

/**
 * LetterAvatarComponent
 * @class that renders a letter avatar based on the
 * colors that come from the two letters in your
 * username.
 */

@Component({
  selector: 'app-letter-avatar',
  templateUrl: './letter-avatar.component.html',
  styleUrls: ['./letter-avatar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LetterAvatarComponent implements OnInit, OnChanges {
  private firstLetter: string;
  private secondLetter: string;
  public textColor = "#FFFFFF";
  public backgroundColor = "#D056FD";
  @Input('username') username: string;
  constructor() { }

  ngOnInit() {}

  ngOnChanges(): void {
    if (this.username) {
      this.firstLetter = this.username.substring(0, 1).toUpperCase();
      this.secondLetter = this.username.substring(1, 1).toUpperCase();
      // Change colors
    }
  }

  getText () {
    return this.firstLetter;
  }

  setTextColor (letter: string): void {

  }
}
