import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from './notes.component';

const routes: Routes = [
  { path: 'notes', component: NotesComponent },
  // { path: 'notes/:id', component: NoteDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class NotesRoutingModule {}
