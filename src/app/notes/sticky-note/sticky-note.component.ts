import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Subscription, Subject, ReplaySubject } from 'rxjs';

import { Note } from '../shared/note';

import { ReshapeService } from '../shared/reshape.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit, OnDestroy {
  @Input() note: Note;
  noteClasses: string;
  editMode = false;
  addMode = false;

  @Output() save: EventEmitter<Note> = new EventEmitter();
  @Output() delete: EventEmitter<null> = new EventEmitter();
  @Output() detail: EventEmitter<null> = new EventEmitter();
  @Output() cancel: EventEmitter<null> = new EventEmitter();

  private unsubscribe = new ReplaySubject<any>(1);

  constructor(private reshapeService: ReshapeService) {
    this.reshape();
  }

  ngOnInit() {
    this.reshapeService.reshapeRequested$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(this.reshape.bind(this));

    if (!this.note) {
      this.addMode = true;
      this.editMode = true;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  saveEmit(note: Note) {
    this.addMode = false;
    this.editMode = false;
    this.save.emit(note);
  }

  cancelEmit() {
    this.editMode = false;
    this.cancel.emit();
  }

  private reshape() {
    this.noteClasses = `rotate-${this.getRandomInt(1, 4)} bg-${this.getRandomInt(1, 6)}`;
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
