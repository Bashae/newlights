import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LocationService,
  MyLocation,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { GeoService } from '../geo.service';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  GoogleAutocomplete = new google.maps.places.AutocompleteService();

  autocomplete = { input: '' };
  autocompleteItems = [];

  constructor(
    private nav: NavController,
    private routes: Router,
    public search: SearchService,
    public geo: GeoService
    ) {}

    zipCodeSearch() {
      
    }

    selectMyLocation() {
      console.log('Selecting Location.');
      LocationService.getMyLocation().then((myLocation: MyLocation) => {
        console.log('Location Selected');
        console.log(myLocation.latLng);
        this.getLocationsByGeo(myLocation.latLng);

        // myLocation = 
        //   accuracy: 205243
        //   altitude: null
        //   bearing: null
        //   elapsedRealtimeNanos: 0
        //   hashCode: "dummy"
        //   latLng: LatLng
        //   lat: 40.7568384
        //   lng: -73.7828864
        //   __proto__: Object
        //   provider: "geolocationapi"
        //   speed: null
        //   status: true
        //   time: 1567609380357
      });
    }

    getLocationsByGeo(latLng) {
      console.log('Getting Nearby Locations');
      console.log(latLng.lat);
      console.log(latLng.lng);
      let groups = this.geo.getAreaLocations(latLng.lat, latLng.lng, 10);
    
      groups.subscribe(res => {
        console.log('the locations are');
        console.log(res);
      });
    }

    saveSettings() {
      this.nav.navigateRoot('/list/listed');
    }

}