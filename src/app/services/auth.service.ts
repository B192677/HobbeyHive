import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // 🔹 REGISTER
  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // 🔹 LOGIN
  login(data: any) {
    return this.http
      .post(`${this.baseUrl}/login`, data, { responseType: 'text' })
      .pipe(
        tap((res: string) => {
          // ✅ login success ayithe user ni store cheyyi
          if (res === 'Login successful') {
            localStorage.setItem('user', JSON.stringify(data));
          }
        })
      );
  }

  // 🔹 GET LOGGED-IN USER  ✅ (THIS FIXES YOUR ERROR)
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🔹 LOGOUT (optional but useful)
  logout() {
    localStorage.removeItem('user');
  }
}
