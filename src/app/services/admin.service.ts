import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  getBookings() {
    return this.http.get<any[]>(`${this.baseUrl}/bookings`);
  }

  cancelBooking(id: number) {
    return this.http.put(`${this.baseUrl}/bookings/${id}/cancel`, {});
  }
}
