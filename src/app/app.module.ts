import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// firebase imports, omit what you don't need for your app
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
// import * as firebase from '@angular/fire/firebase.app.module'

// environment
import { environment } from '../environments/environment';
import { LocationPage } from './location/location.page';
import { AddLocationPage } from './add-location/add-location.page';

import { GoogleMaps } from '@ionic-native/google-maps';
import { FormsModule } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent, LocationPage, AddLocationPage],
  entryComponents: [LocationPage, AddLocationPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
