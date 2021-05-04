
export class ValidationMesaage{

  //Birendra 3-23-2021
  // add more valitation for form control
    validation_messages = {
        'UserName': [
            { type: 'required', message: 'username is required.' },
            { type: 'minlength', message: 'username must be at least 5 characters long.' }
        ],
       'EmailValidation': [
          { type: 'required', message: 'email is required.' },
          { type: 'minlength', message: 'email must be at least 10 characters long.' },
          { type: 'maxlength', message: 'email cannot be more than 25 characters long.' },
          { type: 'pattern', message: 'supporting format your@email.com' }
        ],
        'PasswordValidation': [
          { type: 'required', message: 'password is required.' },
          { type: 'minlength', message: 'password must be at least 5 characters long.' },
          // { type: 'pattern', message: 'uppercase,lowercase and numbers validation' }
        ],
        'ConfirmPassValidation': [
          { type: 'required', message: 'password is required.' },
          { type: 'passwordNotMatch', message: 'password not matched.' }
        ],
      
    }
}