import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../services/workshop.service';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service'; // 👈 Import AuthService

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
    private cdr: ChangeDetectorRef,
    private auth: AuthService // 👈 Inject AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      console.error('No workshop ID provided');
      this.router.navigate(['/explore']);
      return;
    }

    // 🔹 Load workshop details
    this.workshopService.getWorkshopById(id).subscribe({
      next: (data) => {
        this.workshop = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching workshop:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  bookWorkshop() {
    if (!this.workshop) {
      alert('Workshop not loaded yet');
      return;
    }

    const user = this.auth.getUser(); // 🔹 Get logged-in user
    if (!user) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    const booking = {
      workshopId: this.workshop.id,
      title: this.workshop.title,
      price: this.workshop.price,
      userName: user.name,   // 🔹 Use logged-in user
      userEmail: user.email  // 🔹 Use logged-in user email
    };

    // 🔹 Save booking in backend
    this.bookingService.createBooking(booking).subscribe({
      next: (savedBooking) => {
        console.log('Booking saved with ID:', savedBooking.id);

        // 🔹 Navigate to payment page immediately after saving
        this.router.navigate(['/payment', savedBooking.id]);
      },
      error: (err) => {
        console.error('Booking failed:', err);
        alert('Booking could not be created. Try again.');
      }
    });
  }
}
