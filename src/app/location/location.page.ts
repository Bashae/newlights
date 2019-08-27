import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  constructor(
    public nav: NavController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.nav.pop();
  }

}
