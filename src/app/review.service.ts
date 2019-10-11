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

  getNewRating(totalRating, userRating, currentAmt) {
    let newReview;
    let a = totalRating + userRating;
    let b = a / (currentAmt + 1);
    return b;
  }

  incrementMax(totalRating, userRating) {
    return (totalRating + userRating);
  }

  incrementReviews(value) {
    return value++;
  }

  // amtr
  // curr
  // max

  updateLocationReview(locationID, location, userRating) {
    let newMax    = this.incrementMax(location.max, userRating); // max
    let newCount  = this.incrementReviews(location.amtr); // amtr
    let newRating = this.getNewRating(location.max, userRating, location.amtr); // curr
    
    let data = {
      'amtr': newCount,
      'curr': newRating,
      'max' : newMax
    };
    
    this.locCollection.doc(locationID).update(data);
  }
}
