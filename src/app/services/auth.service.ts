import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    { name: 'Test User', email: 'test@example.com', password: '123456' },
    { name: 'Hello User', email: 'hello@world.com', password: 'password' }
  ];

  private currentUser: User | null = null;

  // ✅ LOGIN with status
  login(
    email: string,
    password: string
  ): 'success' | 'wrong-password' | 'no-user' {

    const user = this.users.find(u => u.email === email);

    if (!user) {
      return 'no-user';
    }

    if (user.password !== password) {
      return 'wrong-password';
    }

    this.currentUser = user;
    return 'success';
  }

  // ✅ REGISTER
  register(user: User): boolean {
    const exists = this.users.find(u => u.email === user.email);
    if (exists) {
      return false;
    }
    this.users.push(user);
    return true;
  }

  // ✅ THIS WAS MISSING (ERROR FIX)
  getUser(): User | null {
    return this.currentUser;
  }

  // ✅ LOGOUT
  logout(): void {
    this.currentUser = null;
  }
}
