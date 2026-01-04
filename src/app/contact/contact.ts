import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ Added RouterModule

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ include RouterModule for routerLink
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  name = '';
  email = '';
  subject = '';
  message = '';

  constructor(private router: Router) {}  // ✅ inject Router

  submitForm() {
    if (!this.name || !this.email || !this.message) {
      alert('Please fill all required fields');
      return;
    }

    console.log({
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    });

    alert('Message sent successfully!');
  }

  // ✅ Add this method to navigate to FAQ
  goToFaq() {
    this.router.navigate(['/faq']);
  }
}
