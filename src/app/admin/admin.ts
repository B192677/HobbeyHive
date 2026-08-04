import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,

  // ✅ HttpClientModule ADD CHEYYALI (VERY IMPORTANT)
  imports: [
    CommonModule,
    HttpClientModule
  ],

  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {

  users: any[] = [];
  bookings: any[] = [];

  showUsers = true;
  showBookings = false;

  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadBookings();
  }

  // ================= USERS =================

  loadUsers() {
    this.http.get<any[]>(`${this.baseUrl}/users`)
      .subscribe({
        next: data => this.users = data,
        error: err => console.error('Users load error', err)
      });
  }

  deleteUser(id: number) {
    this.http.delete(`${this.baseUrl}/users/${id}`)
      .subscribe({
        next: () => this.loadUsers(),
        error: err => console.error('Delete user error', err)
      });
  }

  // ================= BOOKINGS =================

  loadBookings() {
    this.http.get<any[]>(`${this.baseUrl}/bookings`)
      .subscribe({
        next: data => this.bookings = data,
        error: err => console.error('Bookings load error', err)
      });
  }

  cancelBooking(id: number) {
    this.http.put(`${this.baseUrl}/bookings/${id}/cancel`, {})
      .subscribe({
        next: () => this.loadBookings(),
        error: err => console.error('Cancel booking error', err)
      });
  }

  // ================= UI TOGGLE =================

  openUsers() {
    this.showUsers = true;
    this.showBookings = false;
  }

  openBookings() {
    this.showUsers = false;
    this.showBookings = true;
  }
}
