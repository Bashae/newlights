import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  currentUser: any; // This is the user from the 'user database'
  firebaseUser: any; // This is the user that firebase creates, much more technical.
  userInfo: any; // This is the user's actual data from /u
  userId: string = ''; // This is the user's ID.

  constructor(
    public firebaseService: FirebaseService,
    public afAuth: AngularFireAuth
  ) { }

  addUser(value){
    console.log('heres the user toadd');
    console.log(value);
    this.firebaseService.addUser(value).then( res => {
      console.log('created successfully');
    }, err => {
      console.log('err');
      console.log(err)
    })
  }

  getAuthStatus() {
    return this.isLoggedIn;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentUserId() {
    return this.userId;
  }

  setAuthSubscription() {
    let _that = this;
    this.afAuth.authState.subscribe(function(res) {
      if(res && res != null) {
        _that.isLoggedIn = true;
        _that.firebaseUser = res['uid'];
        _that.setCurrentUser(res['uid']);
        _that.firebaseService.getUserInfo(res['uid']).subscribe(res => {
          _that.userInfo = res.data();
        })
      }
    })
  }

  setCurrentUser(uid) {
    this.userId = uid;
  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerAccount(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
