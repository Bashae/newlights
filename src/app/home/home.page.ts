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
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  GoogleGeocoder = new google.maps.Geocoder();
  map: GoogleMap;

  newLocation: any = {};
  mapLocation: any = "Address";
  mapLocationId: any;

  autocomplete = { input: '' };
  autocompleteItems = [];

  selected_location: any;

  constructor(
    private nav: NavController,
    private routes: Router,
    public search: SearchService,
    public geo: GeoService,
    public admobFree: AdMobFree
    ) {
      const bannerConfig: AdMobFreeBannerConfig = {
        id: "ca-app-pub-9536593816039958/9454480741",
        isTesting: true,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);
      this.admobFree.banner.prepare()
        .then(() => {
          console.log('showing ad');
        })
        .catch(e => console.log(e));
    }

    selectMyLocation() {
      console.log('Selecting Location.');
      LocationService.getMyLocation().then((myLocation: MyLocation) => {
        console.log('Location Selected');
        console.log(myLocation.latLng);
        this.geo.setCurrentLocation(myLocation.latLng);
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
      let groups = this.geo.getAreaLocations(latLng.lat, latLng.lng, 10);
      let _that = this;
    
      groups.subscribe(res => {
        _that.geo.nearbyLocations = res;
        _that.nav.navigateRoot('/list/listed');
      });
    }

    saveSettings() {
      this.selectTextResult();
      this.nav.navigateRoot('/list/listed');
    }

    updateSearchResults(){
      if (this.autocomplete.input == '') {
        this.autocompleteItems = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions !== null) {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        }
      });
    }

    reverseGeoCodeLocation(addy) {
      let _that = this;
      this.GoogleGeocoder.geocode({'address': addy}, function(results, status) {
        console.log('status is');
        console.log(status);
        console.log('results is');
        console.log(results);
        if (status === 'OK') {
          if (results[0]) {
            let location = results[0].geometry.location;
            let lat = location.lat();
            let lng = location.lng();
            
            let groups = _that.geo.getAreaLocations(lat, lng, 10);
            _that.geo.currentLocation = {'lat': lat, 'lon': lng};
          
            groups.subscribe(res => {
              _that.geo.nearbyLocations = res;
              _that.nav.navigateRoot('/list/listed');
            });

          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }

    selectSearchResult(item) {
      this.selected_location = item;
      this.autocomplete = {input: ''};
      this.autocompleteItems = [];
  
      this.mapLocation = item.description;
      this.reverseGeoCodeLocation(item.description);
    }
  
    selectTextResult() {
      if(this.autocomplete.input) {
        this.mapLocation = this.autocomplete.input;
        this.reverseGeoCodeLocation(this.autocomplete.input);
      }
    }

}