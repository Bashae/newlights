import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { LocationService } from '../location.service';

import { AddCommentComponent } from '../add-comment/add-comment.component';
import { AddImageComponent } from '../add-image/add-image.component';

import { PopoverController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

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
    public modalCtrl: ModalController,
    public popoverController: PopoverController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.selectedLocation = this.loc.currentLocation
    console.log(this.selectedLocation);
  }

  dismissModal() {
    this.loc.currentLocation = "";
    this.modalCtrl.dismiss();
  }

  loadRatings(segment) {
    this.selectedTab = segment;
  }

  segmentChanged($evt) {
    this.selectedTab = $evt.detail.value;
  }

  async presentAddCommentPopover(ev: any) {

    const popover = this.authService.getAuthStatus() ? await this.popoverController.create({
      component: AddCommentComponent,
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
