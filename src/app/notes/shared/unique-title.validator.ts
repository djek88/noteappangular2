import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable, timer } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { NoteService } from './note.service';

@Injectable({ providedIn: 'root' })
export class UniqueTitleValidator implements AsyncValidator {
  constructor(private noteService: NoteService) {}

  validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    return this.noteService.isTitleTaken(ctrl.value).pipe(
      map(isTaken => (isTaken ? { uniqueTitle: true } : null)),
      catchError(() => null)
    );
  }
}
