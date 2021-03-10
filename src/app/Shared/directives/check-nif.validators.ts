import { FormControl, ValidatorFn } from '@angular/forms';
import { Nationality } from '../models/profile';

export class CheckNIFValidators {
  public static checkNIFforESP(nationality: Nationality): ValidatorFn {
    return (control: FormControl): {[key: string]: any} | null => {
      let invalid = false;
      console.log('debug!!!', nationality);
      if (nationality === Nationality.ES) {
        if ((/^\d{8}[a-zA-Z]$/.test(control.value))) {
          const dniLetter = control.value.substring(8, 9).toUpperCase();
          const dniNum = Number(control.value.substring(0, 8));
          const letters =
            ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
          const correctLetter = letters[dniNum % 23];
          if (dniLetter !== correctLetter) { invalid = true; }
        } else {
          invalid = true;
        }
      }
      return invalid ? {invalidNIF : {value: control.value}} : null;
    };
  }
}
