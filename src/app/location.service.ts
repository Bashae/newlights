import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locCollection: AngularFirestoreCollection;
  currentLocation: any;

  constructor(
    public afs: AngularFirestore
  ) { 
    this.locCollection = this.afs.collection('l');
  }

  addLoc(loc) {
    let _that = this;
    let addLoc = this.locCollection.add(loc);
    
    addLoc.then(function(data) {
      loc['lid'] = data.id;
      _that.updateLoc(data.id, loc)
    })
    .catch(function(err) {
      console.log('err: ' + err);
    })
  }

  updateLoc(loc, data) {
    this.locCollection.doc(loc).update(data);
  }
}
