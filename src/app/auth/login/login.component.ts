import {Component} from '@angular/core';
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
  usernameFocused = false;
  passwordFocused = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.signIn(this.username, this.password)
      .subscribe(() => this.router.navigate(['/dashboard/manager']))
  }


  onBlurUsername(e: FocusEvent) {
    const v = (e.target as HTMLInputElement).value;
    this.usernameFocused = !!v;
  }

  onBlurPassword(e: FocusEvent) {
    const v = (e.target as HTMLInputElement).value;
    this.passwordFocused = !!v;
  }
}
