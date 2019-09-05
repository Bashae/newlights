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
import { IonSlides, ModalController} from '@ionic/angular';
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
    public imagePicker: ImagePicker
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
        _that.mapLocation = location['formatted_address'];
        _that.mapLocationId = location['place_id'];
        _that.changeRef.detectChanges();
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
          let location = results[0].geometry.location;
          _that.showTopContent();
          _that.slides.slideNext().then(function() {
            _that.buildLocationMap(location.lat(), location.lng());
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
      this.newLocation.latLng = myLocation.latLng;

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
    let loc = {pos: {}};


    loc['ad'] = this.mapLocation;
    loc['geo_id'] = this.mapLocationId;
    loc['pos']['geohash'] = this.geo.getGeoPoint(this.newLocation.latLng.lat, this.newLocation.latLng.lng).hash;
    loc['pos']['geopoint'] = new firebase.firestore.GeoPoint(this.newLocation.latLng.lat, this.newLocation.latLng.lng)
    
    this.firebaseService.addLocation(loc).then(function(res) {
      console.log(res);
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
