import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { NotesRoutingModule } from './notes-routing.module';

import { NotesComponent } from './notes.component';
import { StickyNoteComponent } from './sticky-note/sticky-note.component';
import { NoteEditFormComponent } from './sticky-note/note-edit-form/note-edit-form.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

import { NoteService } from './shared/note.service';
import { ReshapeService } from './shared/reshape.service';
import { UniqueTitleValidator } from './shared/unique-title.validator';

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    NotesRoutingModule
  ],
  declarations: [
    NotesComponent,
    StickyNoteComponent,
    NoteEditFormComponent,
    NoteDetailComponent
  ],
  providers: [
    NoteService,
    ReshapeService,
    UniqueTitleValidator,
  ]
})
export class NotesModule { }
