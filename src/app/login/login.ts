import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password='';
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loginUser() {

  if (!this.email || !this.password) {
    alert('Please enter email and password');
    return;
  }

  const result = this.auth.login(this.email, this.password);

  if (result === 'success') {
    alert('Login successful!');
    this.router.navigate(['/explore']);

  } else if (result === 'wrong-password') {
    alert('Wrong password. Please try again.');

  } else {
    alert('No account found. Please register.');
    this.router.navigate(['/register']);
  }
}

}
