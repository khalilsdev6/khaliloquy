import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms'; // gives us access to ngModel
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { Shared } from './shared/shared.module';
import { LobbyComponent } from './components/lobby/lobby.component';
import { AuthGuard } from './core/auth.guard';
import { FriendsComponent } from './components/friends/friends.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavigationComponent } from './components/navigation/navigation.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  { path: 'lobby', component: LobbyComponent, canActivate: [AuthGuard] },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PageNotFoundComponent,
    LoginComponent,
    LobbyComponent,
    FriendsComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    HttpModule,
    Shared,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('khaliloquy-auth-token');
        },
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
