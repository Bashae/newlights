import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(
    public authService: AuthService,
    public pop: PopoverController
  ) { }

  ngOnInit() {}

  login() {
    this.authService.login(this.email, this.password).then(res => {
      this.pop.dismiss();
    })
  }

}
