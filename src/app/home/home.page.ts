import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  zipCode: string = "";

  constructor(
    private nav: NavController,
    private routes: Router,
    public search: SearchService
    ) {}

    zipCodeSearch() {
      
    }

    myLocationSearch() {

    }

    saveSettings() {
      this.nav.navigateRoot('/list');
    }

}
