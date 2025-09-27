import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const matchPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password || !confirmPassword || password.value === confirmPassword.value) {
    return null;
  }
  confirmPassword.setErrors({passwordMismatch: true});
  return {passwordMismatch: true};
};
