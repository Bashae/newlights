import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  locCollection: AngularFirestoreCollection;
  reviewCollection: AngularFirestoreCollection;

  constructor(
    public afs: AngularFirestore
  ) {
    this.locCollection = this.afs.collection('l');
    this.reviewCollection = this.afs.collection('r');
  }

  addReview(review) {
    let _that = this;
    // let addRev = this.reviewCollection.add(review);
    
    // addRev.then(function(data) {
    //   // What do we want to do after review is added?
    //   console.log('review added');
    //   // loc['lid'] = data.id;
    //   // _that.updateLoc(data.id, loc)
    // })
    // .catch(function(err) {
    //   console.log('err: ' + err);
    // })
  }

  updateReview() {
    // this.locCollection.doc(loc).update(data);
  }
}
