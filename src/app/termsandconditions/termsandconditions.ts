import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,               // ✅ REQUIRED
  imports: [FormsModule, RouterModule], // ✅ REQUIRED
  templateUrl: './termsandconditions.html',
  styleUrls: ['./termsandconditions.css']
})
export class TermsComponent {

  accepted = false;

  constructor(private router: Router) {}

  continueRegistration() {
    this.router.navigate(['/register']);
  }
}