import { Component, OnInit } from '@angular/core';
import { GeoService } from '../geo.service';
import { Events, ModalController } from '@ionic/angular';
import { LocationService } from '../location.service';
import { LocationPage } from '../location/location.page';


@Component({
  selector: 'app-listed',
  templateUrl: './listed.page.html',
  styleUrls: ['./listed.page.scss'],
})
export class ListedPage implements OnInit {
  locations: any;

  constructor(
    public geo: GeoService,
    public ev: Events,
    public loc: LocationService,
    public modalCtrl: ModalController
  ) { 
    ev.subscribe('location:created', (loc, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', loc, 'at', time);
      console.log('what is location');
      console.log(loc);
      // this.locations = this.geo.getAreaLocations();
    });
  }

  viewLocation(loc) {
    this.loc.currentLocation = loc;
    this.presentLocationModal();
  }

  async presentLocationModal() {
    const modal = await this.modalCtrl.create({
      component: LocationPage
    });
    return await modal.present();
  }

  ngOnInit() {
    console.log('nearbylocations is');  
    console.log(this.geo.nearbyLocations);
  }

}
