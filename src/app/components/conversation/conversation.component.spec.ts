import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationComponent } from './conversation.component';
import { Component } from '@angular/core';

// Mock child component
@Component({
  selector: 'app-message',
  template: ''
})
class MockAppMessagesComponent {
}

describe('ConversationComponent', () => {
  let component: ConversationComponent;
  let fixture: ComponentFixture<ConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationComponent, MockAppMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
