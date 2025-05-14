import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  focused = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password)
      .then(() => this.router.navigate(['/dashboard/manager']))
      .catch(err => this.error = 'Invalid credentials.');
  }



  onBlur(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    this.focused = !!input.value;
  }
}
