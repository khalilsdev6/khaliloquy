import { async, ComponentFixture, TestBed, getTestBed } from "@angular/core/testing";
import { SearchFriendsPipe } from "../../search-friends.pipe";

import { FriendsComponent } from "./friends.component";
import { Component, Input } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from "selenium-webdriver/http";
import { FriendsService } from "../../core/friends.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Friend } from "../../shared/friend";
import { Conversation } from '../../shared/conversation';
import { Observable, of } from "rxjs";

@Component({
  selector: "app-navigation",
  template: ""
})
class MockAppNavigationComponent {}

@Component({
  selector: "app-conversation",
  template: ""
})
class MockAppConversationComponent {
  @Input('conversation') conversation;
}

const testData = [
  new Friend('stemmllerjs', [], 'https://google.com', false),
  new Friend('joshhomme', [], 'https://google.com', false),
  new Friend('hellokitty', [], 'https://google.com', false),
  new Friend('slight', [], 'https://google.com', false),
  new Friend('hmz.js', [], 'https://google.com', false)
];

const conversationData = [
  new Conversation(new Friend('joshhomme', [], 'https://google.com', false), [])
];

// FriendsServiceStub
// This is a stub that is used to replace the FriendsService.
export class FriendsServiceStub {
  public getFriends(): Observable<Friend[]> {
    return of(testData);
  }

  public getConversation (): Observable<Conversation []> {
    return of(conversationData);
  }
}

describe("FriendsComponent", () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  let injector: TestBed;
  let service: FriendsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendsComponent,
        MockAppNavigationComponent,
        SearchFriendsPipe,
        MockAppConversationComponent
      ],
      imports: [FormsModule, HttpClientModule],
      providers: [
        {
          provide: FriendsService,
          useClass: FriendsServiceStub
        }
      ]
    }).compileComponents();

    // Mock our FriendsService dependency and our Http dependency
    injector = getTestBed();
    service = injector.get(FriendsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should return an Observable<Friend[]>', () => {
    service.getFriends().subscribe(friends => {
      expect(friends.length).toBe(5);
      expect(friends).toEqual(testData);
    });
  });

  xit('should switch to the first conversation if there are conversations', () => {

  });
});
