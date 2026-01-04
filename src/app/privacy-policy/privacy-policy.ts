import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './privacy-policy.html',
  styleUrls: ['./privacy-policy.css']
})
export class PrivacyPolicyComponent {
  constructor(private router: Router) {}

  goToContact() {
    this.router.navigate(['/contact']);
  }
}