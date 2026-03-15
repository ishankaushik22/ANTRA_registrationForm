import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: [''],
      preferredContact: ['email']
    }, { validators: [this.passwordMatchValidator, this.phoneRequiredValidator] });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsNotMatching: true };
    }
    return null;
  }

  phoneRequiredValidator(control: AbstractControl): ValidationErrors | null {
    const preferredContact = control.get('preferredContact');
    const phoneNumber = control.get('phoneNumber');

    if (preferredContact?.value === 'phone' && !phoneNumber?.value) {
      return { phoneRequired: true };
    }
    
    return null;
  }

  get username() { return this.registrationForm.get('username'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }
  get phoneNumber() { return this.registrationForm.get('phoneNumber'); }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.registrationForm.reset({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        preferredContact: 'email'
      });
    }
  }
}
