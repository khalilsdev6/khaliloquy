import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms'; // gives us access to ngModel
import { HttpClientModule } from '@angular/common/http';
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
import { CoreModule } from './core/core.module';
import { SearchFriendsPipe } from './search-friends.pipe';
import { ConversationComponent } from './components/conversation/conversation.component';
import { MessageComponent } from './components/conversation/message/message.component';

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
    NavigationComponent,
    SearchFriendsPipe,
    ConversationComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    HttpClientModule, // new http module for Angular6
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
    NgxSpinnerModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
