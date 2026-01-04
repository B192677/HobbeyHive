import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [NgFor],
  templateUrl: './features.html',
  styleUrls: ['./features.css']
})
export class FeaturesComponent {
  features = [
    {
      icon: 'verified',
      title: 'Expert-Led',
      description: 'Learn directly from industry masters.'
    },
    {
      icon: 'calendar_month',
      title: 'Flexible Time',
      description: 'Book slots that fit your life.'
    },
    {
      icon: 'construction',
      title: 'Hands-on',
      description: 'Practical skills, not just theory.'
    },
    {
      icon: 'location_on',
      title: 'Local & Online',
      description: 'Join near you or stream from home.'
    }
  ];
}
