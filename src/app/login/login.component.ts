import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {}

  login() {
    this.authService.login(this.email, this.password).then(res => {
      console.log(this.email);
      console.log(this.password);
      console.log(res);
    })
  }

}
