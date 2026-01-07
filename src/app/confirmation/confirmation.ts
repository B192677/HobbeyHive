// // // import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { ActivatedRoute, Router } from '@angular/router';
// // // import { BookingService } from '../services/booking.service';

// // // @Component({
// // //   selector: 'app-confirmation',
// // //   standalone: true,
// // //   imports: [CommonModule],
// // //   templateUrl: './confirmation.html',
// // //   styleUrls: ['./confirmation.css']
// // // })
// // // export class ConfirmationComponent implements OnInit {

// // //   bookingId!: number;
// // //   booking: any = null;   // ✅ initialize as null
// // //   loading: boolean = true;

// // //   userName = '';         // ✅ username for UI

// // //   constructor(
// // //     private route: ActivatedRoute,
// // //     private bookingService: BookingService,
// // //     public router: Router,
// // //     private cdr: ChangeDetectorRef
// // //   ) {}

// // //   ngOnInit(): void {
// // //     this.bookingId = Number(this.route.snapshot.paramMap.get('id'));

// // //     if (!this.bookingId) {
// // //       console.warn('No booking ID provided, redirecting to explore.');
// // //       this.router.navigate(['/explore']);
// // //       return;
// // //     }

// // //     this.bookingService.getBookingById(this.bookingId).subscribe({
// // //       next: (data) => {
// // //         this.booking = data;

// // //         // ✅ EMAIL NUNCHI USERNAME TEEYADAM
// // //         if (this.booking?.userEmail) {
// // //           this.userName = this.booking.userEmail.split('@')[0];
// // //         }

// // //         this.loading = false;

// // //         // ✅ Force Angular to update the template
// // //         this.cdr.detectChanges();

// // //         console.log('Booking confirmed:', this.booking);
// // //         console.log('Derived username:', this.userName);
// // //       },
// // //       error: (err) => {
// // //         console.error('Booking not found:', err);
// // //         alert('Booking not found. Redirecting...');
// // //         this.router.navigate(['/explore']);
// // //       }
// // //     });
// // //   }
// // // }

// // import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { BookingService } from '../services/booking.service';

// // @Component({
// //   selector: 'app-confirmation',
// //   standalone: true,
// //   imports: [CommonModule],
// //   templateUrl: './confirmation.html',
// //   styleUrls: ['./confirmation.css']
// // })
// // export class ConfirmationComponent implements OnInit {

// //   bookingId!: number;
// //   booking: any = null;
// //   loading = true;
// //   userName = '';


// //   constructor(
// //     private route: ActivatedRoute,
// //     private bookingService: BookingService,
// //     private router: Router,
// //     private cdr: ChangeDetectorRef
// //   ) {}

// //   ngOnInit(): void {
// //     this.bookingId = Number(this.route.snapshot.paramMap.get('id'));

// //     if (!this.bookingId) {
// //       this.goToExplore();
// //       return;
// //     }

// //     this.bookingService.getBookingById(this.bookingId).subscribe({
// //       next: (data) => {
// //         this.booking = data;

// //         if (this.booking?.userEmail) {
// //           this.userName = this.booking.userEmail.split('@')[0];
// //         }

// //         this.loading = false;
// //         this.cdr.detectChanges();
// //       },
// //       error: () => {
// //         alert('Booking not found');
// //         this.goToExplore();
// //       }
// //     });
// //   }

// //   /** ✅ PUBLIC METHODS FOR TEMPLATE */
// //   goToExplore() {
// //     this.router.navigate(['/explore']);
// //   }

// //   goToMyBookings() {
// //     this.router.navigate(['/my-bookings']);
// //   }
// // }
// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BookingService } from '../services/booking.service';

// @Component({
//   selector: 'app-confirmation',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './confirmation.html',
//   styleUrls: ['./confirmation.css']
// })
// export class ConfirmationComponent implements OnInit {

//   bookingId!: number;
//   booking: any = null;
//   loading = true;
//   userName = '';

//   constructor(
//     private route: ActivatedRoute,
//     private bookingService: BookingService,
//     public router: Router, // ✅ PUBLIC
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.bookingId = Number(this.route.snapshot.paramMap.get('id'));

//     this.bookingService.getBookingById(this.bookingId).subscribe({
//       next: (data) => {
//         this.booking = data;
//         this.userName = data.userEmail.split('@')[0];
//         this.loading = false;
//         this.cdr.detectChanges();
//       },
//       error: () => this.router.navigate(['/explore'])
//     });
//   }
// }
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
  booking: any = null;
  loading = true;
  userName = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    public router: Router, // ✅ PUBLIC
    private cdr: ChangeDetectorRef
  ) {}


  goToExplore() {
    this.router.navigate(['/explore']);
  }

  goToMyBookings() {
    this.router.navigate(['/my-bookings']);
  }

  ngOnInit(): void {
    this.bookingId = Number(this.route.snapshot.paramMap.get('id'));

    this.bookingService.getBookingById(this.bookingId).subscribe({
      next: (data) => {
        this.booking = data;
        this.userName = data.userEmail.split('@')[0];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => this.router.navigate(['/explore'])
    });
  }
}
