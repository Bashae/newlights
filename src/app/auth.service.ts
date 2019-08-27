import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public firebaseService: FirebaseService
  ) { }

  addUser(value){
    this.firebaseService.addUser(value)
    .then( res => {
      console.log('created successfully');
    }, err => {
      console.log(err)
    })
  }

  
}
