import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';

import { Note } from '../../note';

import { ReshapeService } from '../reshape.service';

@Component({
  selector: 'sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.css']
})
export class StickyNoteComponent implements OnInit, OnDestroy {
  @Input() note: Note;
  noteClasses: string;
  editMode: boolean = false;
  addMode: boolean = false;
  subscription: Subscription;

  @Output() onSave: EventEmitter<Note> = new EventEmitter();
  @Output() onDelete: EventEmitter<null> = new EventEmitter();
  @Output() onDetail: EventEmitter<null> = new EventEmitter();
  @Output() onCancel: EventEmitter<null> = new EventEmitter();

  constructor(private reshapeService: ReshapeService) {
    this.reshape();
  }

  ngOnInit(): void {
    this.subscription = this.reshapeService.reshapeRequested$.subscribe(() => this.reshape());

    if (!this.note) {
      this.addMode = true;
      this.editMode = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(note: Note): void {
    this.addMode = false;
    this.editMode = false;
    this.onSave.emit(note);
  }

  cancel(): void {
    this.editMode = false;
    this.onCancel.emit();
  }

  private reshape(): void {
    this.noteClasses = `rotate-${this.getRandomInt(1, 4)} bg-${this.getRandomInt(1, 6)}`;
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
