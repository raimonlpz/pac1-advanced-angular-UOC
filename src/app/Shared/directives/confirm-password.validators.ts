import { FormControl, ValidatorFn } from '@angular/forms';

export class CheckConfirmationPassword {
  public static checkConfirmationPw(pw: string): ValidatorFn {
    return (control: FormControl): {[key: string]: any} | null => {
      const invalid = pw !== control.value;
      return invalid ? {invalidPassword : {value: control.value}} : null;
    };
  }
}
