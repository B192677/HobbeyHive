import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {

  user: any = null;
  showDropdown = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    console.log('NAVBAR USER 👉', this.user);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.auth.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }

  getFirstLetter(): string {
    if (this.user?.name) return this.user.name.charAt(0);
    if (this.user?.email) return this.user.email.charAt(0);
    return '';
  }

  getDisplayName(): string {
    return this.user?.name || this.user?.email || '';
  }
}
