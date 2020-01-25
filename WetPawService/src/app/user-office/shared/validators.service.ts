import { AbstractControl } from '@angular/forms';

export class CustomValidator {

  static passwordMatchValidator(control: AbstractControl): void {
    const password: string = control.get('password').value;
    const passwordRepeat: string = control.get('passwordRepeat').value;

    if (password !== passwordRepeat) {
      control.get('passwordRepeat').setErrors({ noPasswordMatch: true });
    }
  }
}
