import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, concatMap } from 'rxjs/operators';

import { Note } from './note';

interface RequestParam {
  key: string;
  value: string;
}

@Injectable()
export class NoteService {
  private notesUrl = 'api/notes';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getNotes(params: RequestParam[] = []): Observable<Note[]> {
    let url = this.notesUrl;
    params.forEach((param, index) => {
      url += `${index === 0 ? '/?' : '&&'}${param.key}=${param.value}`;
    });

    return this.httpClient.get<Note[]>(url)
      .pipe(catchError(this.handleError));
  }

  getNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;

    return this.httpClient.get<Note>(url)
      .pipe(catchError(this.handleError));
  }

  create(note: Note): Observable<Note> {
    note.title = note.title.trim();
    note.content = note.content.trim();
    note.createdAt = new Date();
    note.updatedAt = new Date();
    delete note.id;

    return this.httpClient
      .post<Note>(this.notesUrl, note, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  update(note: Note): Observable<Note> {
    note.title = note.title.trim();
    note.content = note.content.trim();
    note.updatedAt = new Date();

    const url = `${this.notesUrl}/${note.id}`;
    return this.httpClient
      .put(url, note, {headers: this.headers})
      .pipe(map(() => note))
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    const url = `${this.notesUrl}/${id}`;

    return this.httpClient.delete(url, {headers: this.headers})
      .pipe(catchError(this.handleError));
  }

  resetNotes(): Observable<void> {
    return this.httpClient.post('commands/resetdb', { clear: true })
      .pipe(catchError(this.handleError));
  }
}
