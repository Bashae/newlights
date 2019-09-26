import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  selectedLocation: any;
  selectedTab: string = "info";

  constructor(
    public nav: NavController,
    public loc: LocationService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.selectedLocation = this.loc.currentLocation
    console.log(this.selectedLocation);
  }

  dismissModal() {
    this.loc.currentLocation = "";
    this.modalCtrl.dismiss();
  }

  segmentChanged($evt) {
    this.selectedTab = $evt.detail.value;
  }
}
