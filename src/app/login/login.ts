// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css']
// })
// export class Login {

//   email = '';
//   password = '';
//   showPassword = false;

//   // 🔹 Popup states
//   showPopup = false;
//   popupMessage = '';
//   popupType: 'success' | 'error' = 'success';

//   constructor(
//     private auth: AuthService,
//     private router: Router
//   ) {}

//   togglePassword() {
//     this.showPassword = !this.showPassword;
//   }
//   goToRegister() {
//     this.router.navigate(['/register']);
//   }
//   loginUser() {

//     if (!this.email || !this.password) {
//       this.showError('Please enter email and password');
//       return;
//     }

//     this.auth.login({
//       email: this.email,
//       password: this.password
//     }).subscribe({
//       next: (res: string) => {

//         if (res === 'Login successful') {
//           this.showSuccess('Login successful! Redirecting...');

//           setTimeout(() => {
//             this.router.navigate(['/explore']);
//           }, 5000);

//         } else if (res === 'Invalid password') {
//           this.showError('Wrong password. Please try again.');

//         } else {
//   this.showError('Account not found. Please register to continue.');

//   setTimeout(() => {
//     this.router.navigate(['/register']);
//   }, 5000); 
//       },
//       error: () => {
//         this.showError('Login failed. Try again.');
//       }
//     });
//   }

 
//   showSuccess(msg: string) {
//     this.popupType = 'success';
//     this.popupMessage = msg;
//     this.showPopup = true;
//     this.autoClose();
//   }

//   showError(msg: string) {
//     this.popupType = 'error';
//     this.popupMessage = msg;
//     this.showPopup = true;
//     this.autoClose();
//   }

//   autoClose() {
//     setTimeout(() => {
//       this.showPopup = false;
//     }, 9000);
//   }
// }
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';
  showPassword = false;

  // 🔹 Popup
  showPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' = 'success';

  // 🔹 Password validation error
  passwordError = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  // ✅ PASSWORD VALIDATION
  validatePassword() {
    const hasLetter = /[a-zA-Z]/.test(this.password);
    const hasNumber = /[0-9]/.test(this.password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);

    if (!hasLetter || !hasNumber || !hasSymbol) {
      this.passwordError =
        'Password must include letters, numbers, and symbols';
    } else {
      this.passwordError = '';
    }
  }

  loginUser() {

    if (!this.email || !this.password) {
      this.showError('Please enter email and password');
      return;
    }

    this.validatePassword();

    // ❌ stop login if password invalid
    if (this.passwordError) {
      return;
    }

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: string) => {

        if (res === 'Login successful') {
          this.showSuccess('Login successful! Redirecting...');

          setTimeout(() => {
            this.router.navigate(['/explore']);
          }, 3000);

        } else if (res === 'Invalid password') {
          this.showError('Wrong password. Please try again.');
        } else {
          this.showError('Account not found. Please register to continue.');

          setTimeout(() => {
            this.router.navigate(['/register']);
          }, 3000);
        }
      },
      error: () => {
        this.showError('Login failed. Try again.');
      }
    });
  }

  // 🔹 Popup helpers
  showSuccess(msg: string) {
    this.popupType = 'success';
    this.popupMessage = msg;
    this.showPopup = true;
    this.autoClose();
  }

  showError(msg: string) {
    this.popupType = 'error';
    this.popupMessage = msg;
    this.showPopup = true;
    this.autoClose();
  }

  autoClose() {
    setTimeout(() => {
      this.showPopup = false;
    }, 5000);
  }
}
