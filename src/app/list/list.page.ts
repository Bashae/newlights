import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { LocationPage } from '../location/location.page';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage {

  constructor(
    public nav: NavController,
    public modalCtrl: ModalController
  ) { }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: LocationPage
    });
    return await modal.present();
  }
}
