import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;
  acceptedTerms = false;

  passwordInvalid = false;

  // 🔹 Toast state
  showPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' = 'success';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // ✅ PASSWORD VALIDATION
  isPasswordValid(password: string): boolean {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    return hasLetter && hasNumber && hasSymbol;
  }

  registerUser() {

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.showError('Please fill all details');
      return;
    }

    if (!this.isPasswordValid(this.password)) {
      this.passwordInvalid = true;
      return;
    } else {
      this.passwordInvalid = false;
    }

    if (this.password !== this.confirmPassword) {
      this.showError('Passwords do not match');
      return;
    }

    if (!this.acceptedTerms) {
      this.showError('Please accept terms and conditions');
      return;
    }

    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.showSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },
      error: () => {
        this.showError('Registration failed. Try again.');
      }
    });
  }

  // 🔹 Toast helpers
  showSuccess(msg: string) {
    this.popupType = 'success';
    this.popupMessage = msg;
    this.showPopup = true;
    this.autoClose();
  }

  showError(msg: string) {
    this.popupType = 'error';
    this.popupMessage = msg;
    this.showPopup = true;
    this.autoClose();
  }

  autoClose() {
    setTimeout(() => {
      this.showPopup = false;
    }, 5000);
  }
}
