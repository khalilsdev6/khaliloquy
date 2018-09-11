import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { inject } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpModule,
        HttpClientModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'khaliloquy'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("khaliloquy");
  }));
  it("should render a single app-container div", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".app-container")).toBeTruthy();
  }));
});
