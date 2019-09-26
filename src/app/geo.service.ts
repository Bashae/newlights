import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  geo = geofirex.init(firebase);
  nearbyLocations: any = [];
  currentLocation: any = {};

  constructor() { }

  getGeoPoint(lat, lon) {
    return this.geo.point(lat, lon);
  }

  getAreaLocations(lat, lon, rad) {
    const field = 'pos';
    let center = this.getGeoPoint(lat, lon);

    return this.geo.collection('l').within(center, rad, field);
  }

  setCurrentLocation(loc) {
    this.currentLocation = {lat: loc.lat, lon: loc.lng};
  }
}
