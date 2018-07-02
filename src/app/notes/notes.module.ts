import { NgModule }   from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule }       from '../shared/shared.module';
import { NotesRoutingModule } from './notes-routing.module'

import { NotesComponent }        from './notes.component';
import { StickyNoteComponent }   from './sticky-note/sticky-note.component';
import { NoteEditFormComponent } from './sticky-note/note-edit-form/note-edit-form.component';

import { NoteService }    from './shared/note.service';
import { ReshapeService } from './shared/reshape.service';

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    NotesRoutingModule
  ],
  declarations: [
    NotesComponent,
    StickyNoteComponent,
    NoteEditFormComponent
  ],
  providers: [
    NoteService,
    ReshapeService
  ]
})
export class NotesModule { }
