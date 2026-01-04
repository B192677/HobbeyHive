import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopService } from '../services/workshop.service';
import { BookingService } from '../services/booking.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workshop-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workshop-details.html',
  styleUrls: ['./workshop-details.css']
})
export class WorkshopDetails implements OnInit {

  workshop: any;
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

    this.workshopService.getWorkshopById(id).subscribe({
      next: (data) => {
        this.workshop = data;
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
      userName: 'Padma',
      userEmail: 'padma@example.com'
    };

    // ✅ CORRECT METHOD NAME
    this.bookingService.createBooking(booking).subscribe({
      next: (savedBooking) => {
        console.log('Booking saved with ID:', savedBooking.id);

        // ✅ Payment page ki REAL booking ID
        this.router.navigate(['/payment', savedBooking.id]);
      },
      error: (err) => {
        console.error('Error creating booking:', err);
        alert('Booking failed. Try again.');
      }
    });
  }
}
