import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*
 * https://medium.com/@amcdnl/organizing-your-angular-application-2694ff67d335
 * 
 * The way I see it (and I think the style guide presents 
 * things the same way) is that the Shared Module in an 
 * application is explicitly for shared things. Shared 
 * components, shared directives, shared services (use 
 * ForRoot() and https://angular.io/api/core/ModuleWithProviders 
 * for Singletons per app and regular providers array in 
 * SharedModule for singletons per module), ect…
 */

@NgModule({
  imports: [
    CommonModule
  ]
})
export class Shared { }