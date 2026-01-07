import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';

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
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.bookingId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.bookingId) {
      alert('Invalid booking ID');
      this.router.navigate(['/explore']);
      return;
    }

    this.bookingService.getBookingById(this.bookingId).subscribe({
      next: (data) => {
        this.booking = data;

        const user = this.auth.getUser();
        if (user?.name) {
          this.cardName = user.name; // autofill card name
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Booking not found');
        this.router.navigate(['/explore']);
      }
    });
  }

  // 🔐 VALIDATIONS
  private validCard(): boolean {
    return /^\d{12,16}$/.test(this.cardNumber);
  }

  private validExpiry(): boolean {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiry);
  }

  private validCVV(): boolean {
    return /^\d{3}$/.test(this.cvv);
  }

  // ✅ FORMAT EXPIRY INPUT
  formatExpiry() {
    let val = this.expiry.replace(/[^0-9]/g, ''); // remove everything except digits

    if (val.length === 1 && parseInt(val) > 1) {
      // single-digit month > 1 → add leading zero
      val = '0' + val;
    }

    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4); // insert slash after 2 digits
    }

    this.expiry = val;
  }

  payNow() {
    if (!this.cardName || !this.cardNumber || !this.expiry || !this.cvv) {
      alert('Please fill all payment details');
      return;
    }

    if (!this.validCard()) {
      alert('Enter valid card number');
      return;
    }

    if (!this.validExpiry()) {
      alert('Expiry must be MM/YY');
      return;
    }

    if (!this.validCVV()) {
      alert('CVV must be 3 digits');
      return;
    }

    alert('Payment successful!');
    this.router.navigate(['/confirmation', this.bookingId]);
  }
}
