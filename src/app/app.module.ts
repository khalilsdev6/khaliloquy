import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // gives us access to ngModel
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
