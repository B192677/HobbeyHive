import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { WorkshopService } from '../services/workshop.service';
import { AuthService } from '../services/auth.service';   // ✅ ADD

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './explore.html',
  styleUrls: ['./explore.css']
})
export class Explore implements OnInit {

  workshops: any[] = [];
  loading = true;

  constructor(
    private workshopService: WorkshopService,
    private auth: AuthService,        // ✅ ADD
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 🔒 User login check
    const user = this.auth.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadWorkshops();
  }

  loadWorkshops(): void {
    this.loading = true;

    this.workshopService.getAllWorkshops().subscribe({
      next: (data) => {
        this.workshops = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openWorkshop(id: number): void {
    this.router.navigate(['/workshop', id]);
  }

  // 🚪 LOGOUT FUNCTION
  logout(): void {
    this.auth.logout();
    alert('Logged out successfully');
    this.router.navigate(['/login']);
  }
}
