import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Note } from '../../shared/note';
import { forbiddenNoteEqualityValidator } from '../../shared/forbidden-note-equality.validator';
import { UniqueTitleValidator } from '../../shared/unique-title.validator';

@Component({
  selector: 'app-note-edit-form',
  templateUrl: './note-edit-form.component.html',
  styleUrls: ['./note-edit-form.component.css']
})
export class NoteEditFormComponent implements OnInit {
  @Input() note: Note;
  @Output() submit: EventEmitter<Note> = new EventEmitter();

  noteForm: FormGroup;

  constructor(private fb: FormBuilder, private uniqueTitleValidator: UniqueTitleValidator) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      title: [
        this.note && this.note.title,
        {
          updateOn: 'blur',
          validators: [ Validators.required, Validators.minLength(3) ],
          asyncValidators: this.uniqueTitleValidator.validate.bind(this.uniqueTitleValidator)
        }
      ],
      content: [
        this.note && this.note.content,
        [ Validators.required, Validators.minLength(3) ]
      ],
    }, {
      validators: [ forbiddenNoteEqualityValidator ] // <-- add custom validator at the FormGroup level
    });
  }

  onSubmit() {
    if (!this.noteForm.invalid) {
      const note = this.note ? Note.clone(this.note) : new Note();
      note.title = this.noteForm.value.title;
      note.content = this.noteForm.value.content;

      this.submit.emit(note);
    } else {
      console.error('Form errors: ', this.noteForm.errors);
      console.error('Title errors: ', this.noteForm.get('title').errors);
      console.error('Content errors: ', this.noteForm.get('content').errors);
    }
  }
}
