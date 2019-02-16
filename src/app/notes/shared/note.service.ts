import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Note } from './note';

interface RequestParam {
  key: string;
  value: string;
}

@Injectable()
export class NoteService {
  private notesUrl = 'api/notes';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getNotes(params: RequestParam[] = []): Observable<Note[]> {
    let url = this.notesUrl;
    params.forEach((param, index) => {
      url += `${index === 0 ? '/?' : '&&'}${param.key}=${param.value}`;
    });

    return this.httpClient
      .get<Note[]>(url)
      .pipe(catchError(this.handleError));
  }

  getNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;

    return this.httpClient
      .get<Note>(url)
      .pipe(catchError(this.handleError));
  }

  create(note: Note): Observable<Note> {
    note.title = note.title.trim();
    note.content = note.content.trim();
    note.createdAt = new Date();
    note.updatedAt = new Date();
    delete note.id;

    return this.httpClient
      .post<Note>(this.notesUrl, note, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(note: Note): Observable<Note> {
    note.title = note.title.trim();
    note.content = note.content.trim();
    note.updatedAt = new Date();

    const url = `${this.notesUrl}/${note.id}`;
    return this.httpClient
      .put(url, note, this.httpOptions)
      .pipe(
        map(() => note),
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<Object> {
    const url = `${this.notesUrl}/${id}`;

    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  resetNotes(): Observable<Object> {
    return this.httpClient
      .post('commands/resetdb', { clear: true })
      .pipe(catchError(this.handleError));
  }
}
