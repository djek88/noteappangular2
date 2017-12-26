import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NotesComponent } from './notes.component';
import { StickyNoteComponent } from './sticky-note/sticky-note.component';
import { NoteEditFormComponent } from './sticky-note/note-edit-form/note-edit-form.component';
import { DateToggleDirective } from './sticky-note/date-toggle.directive';

import { NoteService } from './note.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    NotesComponent,
    StickyNoteComponent,
    NoteEditFormComponent,
    DateToggleDirective
  ],
  providers: [NoteService],
  exports: [NotesComponent]
})
export class NotesModule { }
