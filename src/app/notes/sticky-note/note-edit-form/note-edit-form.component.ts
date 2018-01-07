import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Note } from '../../shared/note';

@Component({
  selector: 'app-note-edit-form',
  templateUrl: './note-edit-form.component.html',
  styleUrls: ['./note-edit-form.component.css']
})
export class NoteEditFormComponent implements OnInit {
  @Input() note: Note;
  @Output() onDone: EventEmitter<Note> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.note = this.note ? Note.clone(this.note) : new Note();
  }
}
