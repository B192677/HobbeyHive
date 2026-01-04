import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="faq-page">
    <!-- Header -->
    <div class="faq-header">
      <h1>Help & Support</h1>
    </div>

    <!-- Search -->
    <div class="search-box">
      <input type="text" placeholder="Search for help" />
    </div>

    <!-- Title -->
    <div class="faq-title">
      <h2>Frequently Asked Questions</h2>
      <p>Here are the most common questions about our workshops.</p>
    </div>

    <!-- FAQ List -->
    <div class="faq-list">
      <div
        class="faq-card"
        *ngFor="let f of faqs; let i = index"
        [class.active]="activeIndex === i"
        (click)="toggle(i)"
      >
        <div class="faq-question">
          <span>{{ f.q }}</span>
          <span class="arrow">{{ activeIndex === i ? '▲' : '▼' }}</span>
        </div>

        <div class="faq-answer" *ngIf="activeIndex === i">
          {{ f.a }}
        </div>
      </div>
    </div>

    <!-- Submit Question -->
    <div class="submit-box">
      <p>Can’t find what you’re looking for?</p>

      <form (ngSubmit)="submitQuestion()">
        <input
          type="text"
          [(ngModel)]="question"
          name="question"
          placeholder="Ask a question"
        />
        <button type="submit">Submit a Question</button>
      </form>

      <p class="success" *ngIf="submitted">
        ✅ Your question has been submitted
      </p>
    </div>
  </div>
  `,
  styles: [`
    .faq-page {
      max-width: 420px;
      margin: auto;
      padding: 24px;
      font-family: 'Inter', sans-serif;
      background: #f9fafb;
      min-height: 100vh;
    }
    .faq-header { text-align: center; margin-bottom: 24px; }
    .faq-header h1 { font-size: 24px; font-weight: 800; }
    .search-box input {
      width: 100%; padding: 14px 16px; border-radius: 14px;
      border: none; background: #f1f5f9; font-size: 14px;
      outline: none; margin-bottom: 28px;
    }
    .faq-title h2 { font-size: 22px; font-weight: 800; margin-bottom: 6px; }
    .faq-title p { font-size: 14px; color: #64748b; margin-bottom: 20px; }
    .faq-list { display: flex; flex-direction: column; gap: 14px; }
    .faq-card {
      background: #ffffff; border-radius: 16px; padding: 16px;
      border: 1px solid #e5e7eb; cursor: pointer; transition: all 0.25s ease;
    }
    .faq-card:hover { transform: scale(1.02); }
    .faq-card.active { border-color: #38bdf8; box-shadow: 0 10px 30px rgba(56,189,248,0.25); }
    .faq-question { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 15px; }
    .arrow { font-size: 14px; color: #38bdf8; }
    .faq-answer { margin-top: 12px; font-size: 14px; color: #475569; line-height: 1.5; }
    .submit-box { margin-top: 40px; text-align: center; }
    .submit-box p { margin-bottom: 12px; font-size: 14px; color: #475569; }
    .submit-box input {
      width: 100%; padding: 14px; border-radius: 14px; border: 1px solid #e5e7eb;
      margin-bottom: 12px;
    }
    .submit-box button {
      width: 100%; padding: 14px; background: #0ea5e9; color: white;
      border: none; border-radius: 14px; font-weight: 700; cursor: pointer;
    }
    .submit-box button:hover { background: #0284c7; }
    .success { margin-top: 12px; color: #16a34a; font-weight: 600; }
  `]
})
export class FaqComponent {
  question: string = '';
  submitted: boolean = false;
  activeIndex: number | null = 0;

  faqs = [
    { q: 'How do I book a workshop?', a: 'Navigate to the Browse section, select your desired workshop, and tap the Book Now button to proceed to payment.' },
    { q: 'Can I cancel a booking?', a: 'Yes, cancellations are allowed up to 24 hours before the workshop starts.' },
    { q: 'Are workshops online or offline?', a: 'We offer both online and in-person workshops depending on availability.' }
  ];

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  submitQuestion() {
    if (this.question.trim()) {
      this.submitted = true;
      this.question = '';
    }
  }
}
