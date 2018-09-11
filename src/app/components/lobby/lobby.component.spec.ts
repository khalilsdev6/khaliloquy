import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyComponent } from './lobby.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  template: ''
})
class MockAppNavigationComponent {
}

describe('LobbyComponent', () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyComponent, MockAppNavigationComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
