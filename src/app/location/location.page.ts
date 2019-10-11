import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { LocationService } from '../location.service';

import { AddCommentComponent } from '../add-comment/add-comment.component';
import { AddImageComponent } from '../add-image/add-image.component';

import { PopoverController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  selectedLocation: any;
  selectedTab: string = "info";
  locationReviews: any;

  constructor(
    public nav: NavController,
    public loc: LocationService,
    public modalCtrl: ModalController,
    public popoverController: PopoverController,
    public authService: AuthService,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.selectedLocation = this.loc.currentLocation
  }

  dismissModal() {
    this.loc.currentLocation = "";
    this.modalCtrl.dismiss();
  }

  loadRatings(segment) {
    this.selectedTab = segment;
  }

  segmentChanged($evt) {
    let tabValue = $evt.detail.value;
    this.selectedTab = tabValue;
    if(tabValue === "comments") {
      this.loadReviews();
    }
  }

  loadReviews() {
    this.firebaseService.getReviews(this.selectedLocation.id).valueChanges().subscribe(res => {
      this.locationReviews = res;
    });
  }

  async presentAddCommentPopover(ev: any) {
    const popover = this.authService.getAuthStatus() ? await this.popoverController.create({
      component: AddCommentComponent,
      componentProps: {locationID: this.selectedLocation.id, location: this.selectedLocation},
      event: ev,
      translucent: true
    }) : await this.popoverController.create({
      component: LoginComponent,
      event: ev,
      translucent: true
    });

    return await popover.present();
  }

  async presentAddImagePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddImageComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
