import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesModule } from './notes/notes.module';

const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: '**', redirectTo: 'notes', pathMatch: 'full'}
];

@NgModule({
  imports: [
    NotesModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
