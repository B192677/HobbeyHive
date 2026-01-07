import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../services/workshop.service';
import { BookingService } from '../services/booking.service';
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

  constructor(
    private route: ActivatedRoute,
    private workshopService: WorkshopService,
    private bookingService: BookingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/explore']);
      return;
    }

    // 🔹 Fetch single workshop from backend
    this.workshopService.getWorkshopById(id).subscribe({
      next: (data) => {
        this.workshop = data;
        console.log('Workshop image URL:', this.workshop.imageUrl); // Debug
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching workshop:', err);
        this.loading = false;
      }
    });
  }

  bookWorkshop() {
    if (!this.workshop) return;

    const booking = {
      workshopId: this.workshop.id,
      title: this.workshop.title,
      price: this.workshop.price,
     duration: this.workshop.duration,
      imageUrl: this.workshop.imageUrl,
      userName: 'Padma',          // replace with actual logged-in user
      userEmail: 'padma@example.com' // replace with actual logged-in user email
    };

    this.bookingService.createBooking(booking).subscribe({
      next: (savedBooking) => {
        console.log('Booking saved with ID:', savedBooking.id);
        this.router.navigate(['/payment', savedBooking.id]);
      },
      error: (err) => {
        console.error('Booking failed:', err);
        alert('Booking failed. Try again.');
      }
    });
  }
}
