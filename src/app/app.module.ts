import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NoteService } from './note.service';
import { NotesComponent } from './notes/notes.component';
import { StickyNoteComponent } from './notes/sticky-note/sticky-note.component';
import { NoteEditFormComponent } from './notes/sticky-note/note-edit-form/note-edit-form.component';
import { DateToggleDirective } from './notes/sticky-note/date-toggle.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    StickyNoteComponent,
    NoteEditFormComponent,
    DateToggleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 })
  ],
  providers: [
    NoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
