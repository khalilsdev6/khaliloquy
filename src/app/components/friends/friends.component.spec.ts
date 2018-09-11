import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchFriendsPipe } from "../../search-friends.pipe";

import { FriendsComponent } from "./friends.component";
import { Component, Input } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

describe("FriendsComponent", () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendsComponent,
        MockAppNavigationComponent,
        SearchFriendsPipe,
        MockAppConversationComponent
      ],
      imports: [FormsModule, HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
