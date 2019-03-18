import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const forbiddenNoteEqualityValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const title = control.get('title');
  const content = control.get('content');

  return title && content && title.value === content.value ? { 'equalityRevealed': true } : null;
};
