// import { FormControl, ValidatorFn } from '@angular/forms';

// export class CheckNIFforESUser {
//   public static checkNIF(nationality: number): ValidatorFn {
//     return (control: FormControl): {[key: string]: any} | null => {
//       const invalid =
//       nationality === 0 && /^(\d{8})([A-HJ-NP-TV-Z])$/.test(control.value)
//       && ("TRWAGMYFPDXBNJZSQVHLCKE"[(RegExp.$1%23)]==RegExp.$2);

//       return invalid ? {invalidNIF : {value: control.value}} : null;
//     };
//   }
// }
