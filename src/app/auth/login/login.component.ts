import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin2025' && this.password === 'admin') {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/dashboard/manager']);
    } else {
      this.error = 'Wrong username or password!';
    }
  }
}
