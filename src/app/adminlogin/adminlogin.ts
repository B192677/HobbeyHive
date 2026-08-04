import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminlogin.html',
  styleUrls: ['./adminlogin.css']
})
export class AdminloginComponent {

  email = '';
  password = '';
  errorMsg = '';

  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient,
              private router: Router) {}

  login() {
    const body = {
      email: this.email,
      password: this.password
    };

    // ✅ Added responseType 'text' because backend returns plain text
    this.http.post(
      `${this.baseUrl}/login`,
      body,
      { responseType: 'text' }
    )
    .subscribe({
      next: (res) => {
        console.log('Login success:', res);
        this.router.navigate(['/admin']); // Navigate to admin dashboard
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMsg = 'Invalid admin credentials';
      }
    });
  }
}
