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

import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonSlides, ModalController, Events} from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { GeoService } from '../geo.service';
import * as firebase from 'firebase/app';

declare var google;

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage {
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  GoogleGeocoder = new google.maps.Geocoder();
  map: GoogleMap;

  newLocation: any = {};
  mapLocation: any = "Address";
  mapLocationLN: any = "Address Long Name";
  mapLocationId: any;

  autocomplete = { input: '' };
  autocompleteItems = [];
  @ViewChild('slides', {static: false}) slides: IonSlides;
  selected_location: any;

  constructor(
    public modalController: ModalController,
    public changeRef: ChangeDetectorRef,
    public firebaseService: FirebaseService,
    public geo: GeoService,
    public imagePicker: ImagePicker,
    public ev: Events
  ) { }

  backToLocation() {
    this.slides.slidePrev();
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      predictions.forEach((prediction) => {
        this.autocompleteItems.push(prediction);
      });
    });
  }

  buildLocationMap(lat, lng) {
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCLj4o-j0JRdnX80PE5NpY1WbWvjYbPB4Y',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCLj4o-j0JRdnX80PE5NpY1WbWvjYbPB4Y'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
          target: {
            lat: lat,
            lng: lng
          },
          zoom: 18,
          tilt: 30
        }
    };

    let element: HTMLElement = document.getElementById('map')

    // this.map = GoogleMaps.create('map', mapOptions);
    let map = GoogleMaps.create(element, mapOptions);

    map.one(GoogleMapsEvent.MAP_READY).then(
      (res) => {
        console.log('Map is ready!');

        let marker: Marker = map.addMarkerSync({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: lat,
            lng: lng
          }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert('clicked');
        });
      }
    ).catch((err) => {
      console.log('err');
    })
  }

  forwardGeoCodeLocation(loc) {
    let _that = this;
    this.GoogleGeocoder.geocode({'location': loc}, function(results, status) {
      if (status === 'OK') {
        let location = results[0];

        console.log('yo location');
          console.log(location);
        
        _that.mapLocation = location['address_components'];
        _that.mapLocationLN = location['formatted_address'];
        _that.mapLocationId = location['place_id'];

        _that.changeRef.detectChanges();
        _that.newLocation.lat = loc.lat;
        _that.newLocation.lon = loc.lng;

        _that.slides.slideNext().then(function() {
           _that.buildLocationMap(loc.lat, loc.lng);
        });
      }
    });
  }

  reverseGeoCodeLocation(addy) {
    let _that = this;
    this.GoogleGeocoder.geocode({'address': addy}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {

          
          let location = results[0];
          let latLng = location.geometry.location;

          console.log('yo location');
          console.log(location);
          
          _that.mapLocation = location['address_components'];
          _that.mapLocationLN = location['formatted_address'];
          _that.mapLocationId = location['place_id'];

          _that.newLocation.lat = latLng.lat();
          _that.newLocation.lon = latLng.lng();

          // 0: {long_name: "378", short_name: "378", types: Array(1)}
          // 1: {long_name: "Cliffwood Street Northwest", short_name: "Cliffwood St NW", types: Array(1)}
          // 2: {long_name: "Concord", short_name: "Concord", types: Array(2)}
          // 3: {long_name: "2, Poplar Tent", short_name: "2, Poplar Tent", types: Array(2)}
          // 4: {long_name: "Cabarrus County", short_name: "Cabarrus County", types: Array(2)}
          // 5: {long_name: "North Carolina", short_name: "NC", types: Array(2)}
          // 6: {long_name: "United States", short_name: "US", types: Array(2)}
          // 7: {long_name: "28027", short_name: "28027", types: Array(1)}
          // 8: {long_name: "0776", short_name: "0776", types: Array(1)}
          // length: 9
          // __proto__: Array(0)
          // formatted_address: "378 Cliffwood St NW, Concord, NC 28027, USA"
          // geometry:
          // bounds: _.Qd {na: Pd, ja: Ld}
          // location: _.Q {lat: ƒ, lng: ƒ}
          // location_type: "ROOFTOP"
          // viewport: _.Qd {na: Pd, ja: Ld}
          // __proto__: Object
          // place_id: "ChIJRelVO5oPVIgR85-Xf-2TC8A"
          // types: ["premise"]


          // console.log(results[0]);
          _that.showTopContent();
          _that.slides.slideNext().then(function() {
            _that.buildLocationMap(latLng.lat(), latLng.lng());
          })
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  selectMyLocation() {
    LocationService.getMyLocation().then((myLocation: MyLocation) => {
      this.forwardGeoCodeLocation(myLocation.latLng);

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

  hideTopContent() {
    let targets = document.getElementsByClassName('hide-on-focus');
    for(let i = 0; i < targets.length; i++) {
      targets[i].classList.add('hide');
    }
  }

  showTopContent() {
    let targets = document.getElementsByClassName('hide-on-focus');
    for(let i = 0; i < targets.length; i++) {
      targets[i].classList.remove('hide');
    }
  }

  addLocation() {
    let _that = this;
    let loc = {pos: {}, ad:{}};

    let street_address = this.mapLocation;
    loc.ad['num'] = street_address[0]['short_name'];
    loc.ad['str'] = street_address[1]['short_name'];
    loc.ad['ci'] = street_address[2]['short_name'];
    loc.ad['st'] = street_address[5]['short_name'];
    loc.ad['co'] = street_address[6]['short_name'];
    loc.ad['zip'] = street_address[7]['short_name'];
    loc.ad['ln'] = this.mapLocationLN;

    loc['geo_id'] = this.mapLocationId;
    loc['pos']['geohash'] = this.geo.getGeoPoint(this.newLocation.lat, this.newLocation.lon).hash;
    loc['pos']['geopoint'] = new firebase.firestore.GeoPoint(this.newLocation.lat, this.newLocation.lon)
    
    this.firebaseService.addLocation(loc).then(function(res) {
      console.log(res);
      _that.ev.publish('location:created', loc);
      _that.modalController.dismiss();
    });
  }

  addMoreInfo() {
    this.slides.slideNext();
  }

  openImagePicker() {
    let options = {
    // max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 10,
      
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 800,
      height: 800,
      
      // quality of resized image, defaults to 100
      quality: 100
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

}
