import { FormControl } from '@angular/forms';

export class BasicValidators {

  static email(control: FormControl) {

    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

    return EMAIL_REGEXP.test(control.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  static cpf(control: FormControl) {

    const CPF_REGEXP = /^[0-9]{11}$/;

    return CPF_REGEXP.test(control.value) ? null : {
      validateCpf: {
        valid: false
      }
    };
  }

  static date(control: FormControl) {

    const DATRE_REGEXP = /\d{4}-\d{2}-\d{2}/;

    return DATRE_REGEXP.test(control.value) ? null : {
      validateDate: {
        valid: false
      }
    };
  }
}
