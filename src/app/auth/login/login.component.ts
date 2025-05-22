import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {AlertService} from "../../services/alert.service";

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

  constructor(private authService: AuthService, private router: Router,private alert:AlertService) {
  }

  login() {
    // this.authService.signIn(this.username, this.password).subscribe(() => this.router.navigate(['/dashboard/manager']));
    this.authService.signIn(this.username,this.password).subscribe({next:res=>{
      this.alert.success("Successfully Login!");
        this.router.navigate(['/dashboard/manager'])
      },error:err=>{
        this.alert.error("Login Error.!","Invalid Username or Password.!");
      }});
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
