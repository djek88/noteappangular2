import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesModule } from './notes/notes.module';

const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: '**', redirectTo: 'notes', pathMatch: 'full' }
];

@NgModule({
  imports: [
    NotesModule,
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
