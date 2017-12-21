import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Note } from './note';

interface RequestParam {
  key: string;
  value: string;
}

@Injectable()
export class NoteService {
  private notesUrl = 'api/notes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getNotes(params: RequestParam[] = []): Promise<Note[]> {
    let url = this.notesUrl;
    params.forEach((param, index) => {
      url += `${index === 0 ? '/?' : '&&'}${param.key}=${param.value}`;
    });

    return this.http.get(url)
      .toPromise()
      .then(responce => responce.json().data as Note[])
      .catch(this.handleError);
  }

  getNote(id: number): Promise<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(results => results.json().data as Note)
      .catch(this.handleError);
  }

  create(note: Note): Promise<Note> {
    note.title = note.title.trim();
    note.content = note.content.trim();
    note.createdAt = new Date();
    note.updatedAt = new Date();
    delete note.id;

    return this.http
      .post(this.notesUrl, JSON.stringify(note), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Note)
      // .then(note => {
      //   console.log(note);
      //   return note;
      // })
      .catch(this.handleError);
  }

  update(note: Note): Promise<Note> {
    note.title = note.title.trim();
    note.content = note.content.trim();
    note.updatedAt = new Date();

    const url = `${this.notesUrl}/${note.id}`;
    return this.http
      .put(url, JSON.stringify(note), {headers: this.headers})
      .toPromise()
      .then(() => note)
      // .then(note => {
      //   console.log(note);
      //   return note;
      // })
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  resetNotes(): Promise<void> {
    return this.http.post('commands/resedb', undefined)
      .toPromise()
      .catch(this.handleError);
  }
}
