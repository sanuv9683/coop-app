import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authSer:AuthService,private router:Router,private alert:AlertService) {
  }

  onLogout() {
    this.alert.confirm("Logout.!","Do you want to Logout.?").then(t=>{
      if (t.isConfirmed){
        this.authSer.signOut();
        this.router.navigate(['/auth/login']);
      }
    });

  }
}
