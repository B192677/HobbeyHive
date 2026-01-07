// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { tap } from 'rxjs/operators';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {

// //   private baseUrl = 'http://localhost:8080/api/auth';

// //   constructor(private http: HttpClient) {}

// //   login(data: { email: string; password: string }) {
// //     return this.http
// //       .post(`${this.baseUrl}/login`, data, { responseType: 'text' })
// //       .pipe(
// //         tap((res: string) => {
// //           if (res === 'Login successful') {
// //             localStorage.setItem(
// //               'user',
// //               JSON.stringify({
// //                 email: data.email,
// //                 loggedIn: true
// //               })
// //             );
// //           }
// //         })
// //       );
// //   }

// //   getUser() {
// //     const user = localStorage.getItem('user');
// //     if (!user) return null;

// //     const parsed = JSON.parse(user);
// //     return {
// //       email: parsed.email,
// //       name: parsed.email.split('@')[0], // ✅ auto name
// //       loggedIn: true
// //     };
// //   }

// //   logout() {
// //     localStorage.removeItem('user');
// //   }

// //   isLoggedIn(): boolean {
// //     return !!localStorage.getItem('user');
// //   }
// // }
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private baseUrl = 'http://localhost:8080/api/auth';

//   constructor(private http: HttpClient) {}

//   login(data: { email: string; password: string }) {
//     return this.http
//       .post(`${this.baseUrl}/login`, data, { responseType: 'text' })
//       .pipe(
//         tap((res: string) => {
//           if (res === 'Login successful') {
//             localStorage.setItem(
//               'user',
//               JSON.stringify({
//                 email: data.email,
//                 loggedIn: true
//               })
//             );
//           }
//         })
//       );
//   }

//   getUser() {
//     const user = localStorage.getItem('user');
//     if (!user) return null;

//     const parsed = JSON.parse(user);
//     return {
//       email: parsed.email,
//       name: parsed.email.split('@')[0], // ✅ auto name
//       loggedIn: true
//     };
//   }

//   logout() {
//     localStorage.removeItem('user');
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('user');
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // ✅ REGISTER (FIXED)
  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // ✅ LOGIN
  login(data: { email: string; password: string }) {
    return this.http
      .post(`${this.baseUrl}/login`, data, { responseType: 'text' })
      .pipe(
        tap((res: string) => {
          if (res === 'Login successful') {
            localStorage.setItem(
              'user',
              JSON.stringify({
                email: data.email,
                loggedIn: true
              })
            );
          }
        })
      );
  }

  // ✅ GET LOGGED-IN USER
  getUser() {
    const user = localStorage.getItem('user');
    if (!user) return null;

    const parsed = JSON.parse(user);
    return {
      email: parsed.email,
      name: parsed.email.split('@')[0], // auto name
      loggedIn: true
    };
  }

  // ✅ LOGOUT
  logout() {
    localStorage.removeItem('user');
  }

  // ✅ LOGIN STATUS
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}

