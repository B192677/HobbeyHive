import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation.html',
  styleUrls: ['./confirmation.css']
})
export class ConfirmationComponent implements OnInit {

  bookingId!: number;
  booking: any = null;  // ✅ initialize as null
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
   public router: Router,
    private cdr: ChangeDetectorRef // ✅ inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookingId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.bookingId) {
      console.warn('No booking ID provided, redirecting to explore.');
      this.router.navigate(['/explore']);
      return;
    }

    this.bookingService.getBookingById(this.bookingId).subscribe({
      next: (data) => {
        this.booking = data;
        this.loading = false;

        // ✅ Force Angular to update the template
        this.cdr.detectChanges();

        console.log('Booking confirmed:', this.booking);
      },
      error: (err) => {
        console.error('Booking not found:', err);
        alert('Booking not found. Redirecting...');
        this.router.navigate(['/explore']);
      }
    });
  }
}
