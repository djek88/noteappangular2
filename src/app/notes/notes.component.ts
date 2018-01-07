import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }                       from '@angular/router';

import { Subject }       from 'rxjs/Subject';
import { ISubscription } from "rxjs/Subscription";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Note }           from './shared/note';
import { NoteService }    from './shared/note.service';
import { ReshapeService } from './shared/reshape.service';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  searchTerms: Subject<string>;
  private subscription: ISubscription;
  addMode: boolean = false;

  constructor(
    private noteService: NoteService,
    private reshapeService: ReshapeService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchTerms = new Subject<string>();
    this.subscription = this.searchTerms
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(value => {
        Promise.all([
          this.noteService.getNotes([{key: 'title', value}]),
          this.noteService.getNotes([{key: 'content', value}])
        ]).then((findedNotes: Note[][]) => {
          const results = new Map();

          findedNotes[0].concat(...findedNotes[1]).forEach(note => results.set(note.id, note));
          this.notes = Array.from(results.values()).sort((a, b) => a.id - b.id);
        });
      });

    this.noteService.getNotes()
      .then(notes => this.notes = notes);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  trackByNotes(index: number, note: Note): number { return note.id; }

  search(term: string) {
    this.searchTerms.next(term);
  }

  gotoDetail(note: Note): void {
    //this.router.navigate(['notes/detail', note.id]);
  }

  addNote(note: Note): void {
    this.toggleAddMode();
    this.noteService.create(note)
      .then(this.notes.push.bind(this.notes));
  }

  updateNote(updatedNote: Note, i: number): void {
    this.noteService.update(updatedNote)
      .then(note => Object.assign(this.notes[i], note));
  }

  deleteNote(note: Note): void {
    this.noteService.delete(note.id)
      .then(() => this.notes = this.notes.filter(n => n !== note));
  }

  toggleAddMode(): void {
    this.addMode = !this.addMode;
  }

  reshape(): void {
    this.reshapeService.requestReshape();
  }
}
