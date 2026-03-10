import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const ERROR_MESSAGES = {
  INVALIDCREDENTIALS: 'Invalid username or password!',
};

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';
  hidePassword = true;

  /**
   * @param fb - `FormBuilder` to create the `FormGroup`.
   * @param authService - `Auth` service for authentication.
   * @description Usage: Prepares the `loginForm` with `username` and `password` controls, including required validators.
   */
  constructor(private fb: FormBuilder, private authService: Auth) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * @description Usage: Validates the form, calls `Auth.login()` with credentials,
   * and displays an error message if login fails. If the form is invalid,
   * marks all controls as touched to trigger validation messages.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.authService.login(username, password);

      if (!success) {
        this.errorMessage = ERROR_MESSAGES.INVALIDCREDENTIALS;
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
