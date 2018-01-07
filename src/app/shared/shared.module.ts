import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { DateToggleDirective } from './date-toggle.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DateToggleDirective
  ],
  exports: [
    CommonModule,
    FormsModule,

    DateToggleDirective
  ]
})
export class SharedModule { }
