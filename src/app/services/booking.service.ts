// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';


// //  @Injectable({ providedIn: 'root' })
// // export class BookingService {

// //   private baseUrl = 'http://localhost:8080/api/bookings';

// //   constructor(private http: HttpClient) {}

// //   createBooking(booking: any) {
// //     return this.http.post<any>(this.baseUrl, booking);
// //   }

// //   getBookingById(id: number) {
// //     return this.http.get<any>(`${this.baseUrl}/${id}`);
// //   }
// // }

 
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookingService {

//   private baseUrl = 'http://localhost:8080/api/bookings';

//   constructor(private http: HttpClient) {}

//   // ✅ CREATE booking
//   createBooking(data: any): Observable<any> {
//     return this.http.post<any>(this.baseUrl, data);
//   }

//   // ✅ GET booking by ID (confirmation)
//   getBookingById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.baseUrl}/${id}`);
//   }

//   // ✅ GET bookings of logged-in user
//   getBookingsByUser(email: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/user/${email}`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  // ✅ CREATE a new booking
  createBooking(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  // ✅ GET booking by ID (for confirmation/payment)
  getBookingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // ✅ GET all bookings for a specific user
  getBookingsByUser(email: string): Observable<any[]> {
    const encodedEmail = encodeURIComponent(email);
    return this.http.get<any[]>(`${this.baseUrl}/user/${encodedEmail}`);
  }
}
