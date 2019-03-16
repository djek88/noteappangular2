import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { NotesModule } from './notes/notes.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    NotesModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
