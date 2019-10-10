import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
  fName: string = "";
  lName: string = "";
  email: string = "";
  password: string = "";
  newUser = {
    i: "",
    e: "",
    fn: "",
    ln: ""
  }

  constructor(
    public authService: AuthService
  ) { }

  createUser(uid) {
    let user = {
      'i': uid,
      'e': this.email,
      'fn': this.fName,
      'ln': this.lName
    }
    
    this.authService.userId = uid;
    this.authService.addUser(user);
  }

  submitRegistration() {
    this.authService.registerAccount( this.email, this.password ).then(res => { 
      console.log('what is reg res');
      console.log(res);
     this.createUser(res['user']['uid']);
    })
  }

  logUserOut() {
    this.authService.logout();
  }

}
