import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopService } from '../services/workshop.service';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';
import { Workshop } from '../models/workshop';

@Component({
  selector: 'app-workshop-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workshop-details.html',
  styleUrls: ['./workshop-details.css']
})
export class WorkshopDetails implements OnInit {

  workshop!: Workshop;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private workshopService: WorkshopService,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/explore']);
      return;
    }

    this.workshopService.getWorkshopById(id).subscribe({
      next: (data: Workshop) => {
        this.workshop = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error fetching workshop:', err);
        this.errorMessage = 'Failed to load workshop details.';
        this.loading = false;
      }
    });
  }

  bookWorkshop() {
    if (!this.workshop) return;

    const user = this.authService.getUser();
    if (!user) {
      alert('You must be logged in to book a workshop.');
      this.router.navigate(['/login']);
      return;
    }

    const booking = {
      workshopId: this.workshop.id,
      title: this.workshop.title,
      price: this.workshop.price,
      duration: this.workshop.duration,
      userName: user.name,
      userEmail: user.email
    };

    this.bookingService.createBooking(booking).subscribe({
      next: (savedBooking: any) => {
        console.log('Booking saved:', savedBooking);
        this.router.navigate(['/payment', savedBooking.id]);
      },
      error: (err: any) => {
        console.error('Booking failed:', err);
        alert('Booking failed. Please try again.');
      }
    });
  }
}
