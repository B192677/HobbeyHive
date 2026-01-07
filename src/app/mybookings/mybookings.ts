// // // import { Component, OnInit } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { BookingService } from '../services/booking.service';
// // // import { AuthService } from '../services/auth.service';
// // // import { RouterLink } from '@angular/router';

// // // @Component({
// // //   selector: 'app-my-bookings',
// // //   standalone: true,
// // //   imports: [CommonModule, RouterLink],
// // //   templateUrl: './mybookings.html',
// // //   styleUrls: ['./mybookings.css']
// // // })
// // // export class MyBookingsComponent implements OnInit {

// // //   bookings: any[] = [];
// // //   loading: boolean = true;

// // //   constructor(
// // //     private bookingService: BookingService,
// // //     private auth: AuthService
// // //   ) {}

// // //   ngOnInit(): void {
// // //     const user = this.auth.getUser();
// // //     if (!user?.email) return;

// // //     this.bookingService.getBookingsByUser(user.email).subscribe({
// // //       next: (data) => {
// // //         this.bookings = data;
// // //         this.loading = false;
// // //       },
// // //       error: () => {
// // //         this.loading = false;
// // //       }
// // //     });
// // //   }
// // // }
// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { BookingService } from '../services/booking.service';
// // import { AuthService } from '../services/auth.service';
// // import { RouterLink } from '@angular/router';

// // @Component({
// //   selector: 'app-my-bookings',
// //   standalone: true,
// //   imports: [CommonModule, RouterLink],
// //   templateUrl: './mybookings.html',
// //   styleUrls: ['./mybookings.css']
// // })
// // export class MyBookingsComponent implements OnInit {

// //   bookings: any[] = [];
// //   loading = true;

// //   constructor(
// //     private bookingService: BookingService,
// //     private auth: AuthService
// //   ) {}

// //   ngOnInit(): void {
// //     const user = this.auth.getUser();
// //     if (!user?.email) return;

// //     this.bookingService.getBookingsByUser(user.email).subscribe({
// //       next: (data) => {
// //         this.bookings = data;
// //         this.loading = false;
// //       },
// //       error: () => this.loading = false
// //     });
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BookingService } from '../services/booking.service';
// import { AuthService } from '../services/auth.service';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-my-bookings',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './mybookings.html',
//   styleUrls: ['./mybookings.css']
// })
// export class MyBookingsComponent implements OnInit {

//   bookings: any[] = [];
//   loading = true;

//   constructor(
//     private bookingService: BookingService,
//     private auth: AuthService
//   ) {}

//   ngOnInit(): void {
//     const user = this.auth.getUser();
//     if (!user?.email) return;

//     this.bookingService.getBookingsByUser(user.email).subscribe({
//       next: (data) => {
//         this.bookings = data;
//         this.loading = false;
//       },
//       error: () => this.loading = false
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mybookings.html'
})
export class MyBookingsComponent implements OnInit {

  bookings: any[] = [];
  loading = true;

  constructor(
    private bookingService: BookingService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    console.log('Logged-in user:', user);

    if (!user?.email) {
      console.log('No user email found, cannot fetch bookings');
      this.loading = false;
      return;
    }

    this.bookingService.getBookingsByUser(user.email).subscribe({
      next: (data: any[]) => {
        console.log('Bookings fetched:', data); // check API response in console
        this.bookings = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching bookings:', err);
        this.loading = false;
      }
    });
  }
}
