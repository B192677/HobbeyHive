import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


 @Injectable({ providedIn: 'root' })
export class BookingService {

  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: any) {
    return this.http.post<any>(this.baseUrl, booking);
  }

  getBookingById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}

 

