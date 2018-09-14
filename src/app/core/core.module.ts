import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsService } from './friends.service';
import { UserInfoService } from './user-info.service';

/*
 * https://medium.com/@amcdnl/organizing-your-angular-application-2694ff67d335
 *
 * For non-shared parts of your application that
 * are used by the core of your application use a Core Module.
 * 'This module is where you might define the chrome of your
 * UI (headers, footers, sidebars), cross-cutting concerns like
 * authentication services and guards for your base feature module
 * routes and anything else that isn’t part of a feature and isn’t shared.
 *
 * I often call this module ApplicationModule because it’s all the stuff
 * that would go into a normal feature module but this feature happens to
 * be the main application.
 */

@NgModule({
  providers: [FriendsService, UserInfoService]
})
export class CoreModule { }
