import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged(user => this.user = user);
  }

  login(email: string, password: string) {
    console.log(signInWithEmailAndPassword(this.auth, email, password));
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    signOut(this.auth);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
