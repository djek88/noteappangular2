import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, SubscriptionLike, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Note } from './shared/note';
import { NoteService } from './shared/note.service';
import { ReshapeService } from './shared/reshape.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  searchTerms: Subject<string>;
  private subscription: SubscriptionLike;
  addMode = false;

  constructor(
    private noteService: NoteService,
    private reshapeService: ReshapeService,
    private router: Router) { }

  ngOnInit() {
    this.searchTerms = new Subject<string>();
    this.subscription = this.searchTerms
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(this.searchNotes.bind(this));

    this.getNotes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackByNotes(index: number, note: Note): number { return note.id; }

  search(term: string) {
    this.searchTerms.next(term);
  }

  searchNotes(value) {
    forkJoin(
      this.noteService.getNotes([{ key: 'title', value }]),
      this.noteService.getNotes([{ key: 'content', value }])
    ).subscribe((findedNotes: Note[][]) => {
      const results = new Map();

      findedNotes[0].concat(...findedNotes[1])
        .forEach(note => results.set(note.id, note));
      this.notes = Array.from(results.values()).sort((a, b) => a.id - b.id);
    });
  }

  getNotes() {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  gotoDetail(note: Note) {
    this.router.navigate(['notes', note.id]);
  }

  addNote(note: Note) {
    this.toggleAddMode();
    this.noteService.create(note)
      .subscribe(this.notes.push.bind(this.notes));
  }

  updateNote(updatedNote: Note, i: number) {
    this.noteService.update(updatedNote)
      .subscribe(note => Object.assign(this.notes[i], note));
  }

  deleteNote(note: Note) {
    this.noteService.delete(note.id)
      .subscribe(() => this.notes = this.notes.filter(n => n !== note));
  }

  toggleAddMode() {
    this.addMode = !this.addMode;
  }

  reshape() {
    this.reshapeService.requestReshape();
  }

  resetNotes() {
    this.noteService.resetNotes()
      .subscribe(() => this.getNotes());
  }
}
