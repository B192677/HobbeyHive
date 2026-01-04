// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './Home.component.html',
//   styleUrls: ['./Home.component.css']
// })
// export class HomeComponent {
//   workshops = [
//     {
//       title: 'Introduction to Spring Boot',
//       category: 'Backend',
//       date: 'Oct 24, 2023',
//       time: '10:00 AM',
//       location: 'Conference Room B',
//       seats: 12,
//       duration: '3 Hours',
//       status: 'Available'
//     },
//     {
//       title: 'Angular Masterclass',
//       category: 'Frontend',
//       date: 'Oct 26, 2023',
//       time: '1:00 PM',
//       location: 'Innovation Lab A',
//       seats: 2,
//       duration: '4 Hours',
//       status: 'Filling Fast'
//     }
//   ];
// }
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink  } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgFor, RouterLink ],
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {} // ✅ inject Router

  // Navigate to FAQ page
  goToFaq() {
    this.router.navigate(['/faq']);
  }
  goToContact() {
    this.router.navigate(['/contact']);
  }
  workshops = [
    {
      id: 1,
      category: 'Art',
      title: 'Watercolor Painting',
      date: '10 Jan 2026',
      time: '10:00 AM',
      location: 'Hyderabad',
      seats: 12,
      description: 'Learn watercolor techniques from expert artists.'
    },
    {
      id: 2,
      category: 'Craft',
      title: 'Pottery Basics',
      date: '15 Jan 2026',
      time: '2:00 PM',
      location: 'Bangalore',
      seats: 8,
      description: 'Hands-on pottery workshop for beginners.'
    },
    {
      id: 3,
      category: 'Music',
      title: 'Guitar for Beginners',
      date: '20 Jan 2026',
      time: '4:00 PM',
      location: 'Chennai',
      seats: 5,
      description: 'Start your guitar journey with simple chords.'
    }
  ];
}
