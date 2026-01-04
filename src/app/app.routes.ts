import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { HomeComponent } from './Home/Home.component';
import { FeaturesComponent } from './features/features';
import { WorkshopDetails } from './workshop-details/workshop-details';
import { FaqComponent } from './faq/faq';
import { Login } from './login/login';
import { Register } from './register/register';
import { Payment } from './payment/payment';
import { Explore } from './explore/explore';
import { ContactComponent } from './contact/contact';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy';
import { TermsComponent } from './termsandconditions/termsandconditions';
import { AboutUs } from './about-us/about-us';
import { ConfirmationComponent } from './confirmation/confirmation';

export const routes: Routes = [

  // 🔓 Auth pages (no layout)
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // 🏠 Main website layout
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: HomeComponent },
      { path: 'explore', component: Explore },
      { path: 'features', component: FeaturesComponent },
      { path: 'workshop/:id', component: WorkshopDetails },
      { path: 'payment/:id', component: Payment },
      { path: 'confirmation/:id', component: ConfirmationComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'privacypolicy', component: PrivacyPolicyComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'aboutus', component: AboutUs }
    ]
  },

  // ❌ Unknown route → home
  { path: '**', redirectTo: '' }
];
