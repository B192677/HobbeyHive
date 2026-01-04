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
  acceptedTerms = false;

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  registerUser() {

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill all details');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!this.acceptedTerms) {
      alert('Please accept terms and conditions');
      return;
    }

    // ✅ SAVE USER
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    });

    alert('Registration successful! Please login.');
    this.router.navigate(['/login']);
  }
}
