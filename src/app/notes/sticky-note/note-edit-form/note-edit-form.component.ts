import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Note } from '../../shared/note';

@Component({
  selector: 'app-note-edit-form',
  templateUrl: './note-edit-form.component.html',
  styleUrls: ['./note-edit-form.component.css']
})
export class NoteEditFormComponent implements OnInit {
  @Input() note: Note;
  @Output() onDone: EventEmitter<Note> = new EventEmitter();

  noteForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      title: [this.note && this.note.title, Validators.required],
      content: [this.note && this.note.content, Validators.required],
    });
  }

  onSubmit() {
    if (!this.noteForm.invalid) {
      const note = this.note ? Note.clone(this.note) : new Note();
      note.title = this.noteForm.value.title;
      note.content = this.noteForm.value.content;

      this.onDone.emit(note);
    }
  }
}
