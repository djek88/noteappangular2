import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';

import { Note } from '../shared/note';

import { ReshapeService } from '../shared/reshape.service';

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
  subscription: Subscription;

  @Output() save: EventEmitter<Note> = new EventEmitter();
  @Output() delete: EventEmitter<null> = new EventEmitter();
  @Output() detail: EventEmitter<null> = new EventEmitter();
  @Output() cancel: EventEmitter<null> = new EventEmitter();

  constructor(private reshapeService: ReshapeService) {
    this.reshape();
  }

  ngOnInit() {
    this.subscription = this.reshapeService.reshapeRequested$.subscribe(() => this.reshape());

    if (!this.note) {
      this.addMode = true;
      this.editMode = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
