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

  login() {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // console.log(this.afAuth.authState);
    // console.log(this.isLoggedIn);
    // if(this.isLoggedIn) {

    // }
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
