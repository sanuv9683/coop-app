import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  idToken,
  User
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Emits the current Firebase user (or null) */
  user$: Observable<User | null> = authState(this.auth);

  constructor(private auth: Auth) {}

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signIn(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signOut() {
    return from(signOut(this.auth));
  }

  /** Get a (fresh) ID token */
  getIdToken() {
    return idToken(this.auth);
  }
}
