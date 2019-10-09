import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(
    public firebaseService: FirebaseService,
    public afAuth: AngularFireAuth
  ) { }

  addUser(value){
    this.firebaseService.addUser(value)
    .then( res => {
      console.log('created successfully');
    }, err => {
      console.log(err)
    })
  }

  getAuthStatus() {
    return this.isLoggedIn;
  }

  setAuthSubscription() {
    this.afAuth.authState.subscribe(function(res) {
      console.log(res);
      if(res != null) {
        this.isLoggedIn = res;
      }
    })
  }

  login(email, password) {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // console.log(this.afAuth.authState);
    // console.log(this.isLoggedIn);
    // if(this.isLoggedIn) {
    // }
    // this.afAuth.auth.isSignInWithEmailLink('ice.andrew.media@gmail.com');
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerAccount(fname, lname, email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log(res);
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
