import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service'; // 👈 Import AuthService

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class Payment implements OnInit {

  bookingId!: number;
  booking: any;

  // Payment form fields
  cardNumber = '';
  cardName = '';
  expiry = '';
  cvv = '';

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private auth: AuthService // 👈 Inject AuthService
  ) {}

  ngOnInit(): void {
    // ✅ Get booking ID from URL
    this.bookingId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.bookingId) {
      alert('Invalid booking ID');
      this.router.navigate(['/explore']);
      return;
    }

    // ✅ Fetch booking from backend
    this.bookingService.getBookingById(this.bookingId).subscribe({
      next: (data) => {
        this.booking = data;

        // ✅ Auto-fill payment name from logged-in user if available
        const user = this.auth.getUser();
        if (user) {
          this.cardName = user.name;
        }

        this.loading = false;
        this.cdr.detectChanges(); // Force template update
        console.log('Booking loaded:', this.booking);
      },
      error: () => {
        alert('Booking not found');
        this.router.navigate(['/explore']);
      }
    });
  }

  payNow() {
    if (!this.cardName || !this.cardNumber || !this.expiry || !this.cvv) {
      alert('Please fill all payment details!');
      return;
    }

    console.log('Paying for booking ID:', this.bookingId);

    // ✅ You can integrate real payment logic here
    alert('Payment successful!');

    // ✅ Navigate to confirmation page
    this.router.navigate(['/confirmation', this.bookingId]);
  }
}
