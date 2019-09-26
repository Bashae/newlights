import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { Component, OnInit } from '@angular/core';
import { GeoService } from '../geo.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: GoogleMap;

  constructor(
    public geo: GeoService
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCLj4o-j0JRdnX80PE5NpY1WbWvjYbPB4Y',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCLj4o-j0JRdnX80PE5NpY1WbWvjYbPB4Y'
    });

    console.log(this.geo.currentLocation);

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.geo.currentLocation.lat,
           lng: this.geo.currentLocation.lon
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.geo.nearbyLocations.forEach(loc => {
      // loc.pos.geopoint.latitude
      let marker: Marker = this.map.addMarkerSync({
        title: loc.ad,
        icon: 'orange',
        animation: 'DROP',
        position: {
          lat: loc.pos.geopoint.latitude,
          lng: loc.pos.geopoint.longitude
        }
      });
    });

    // for(var i = 0; i < this.geo.nearbyLocations.length; i++) {
    //   let marker: Marker = this.map.addMarkerSync({
    //     title: this.geo.nearbyLocations[i].ad,
    //     icon: 'orange',
    //     animation: 'DROP',
    //     position: {
    //       lat: this.geo.nearbyLocations[i].geopoint._lat,
    //       lng: this.geo.nearbyLocations[i].geopoint._long
    //     }
    //   });
    // }
  }
}
