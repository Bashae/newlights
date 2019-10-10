import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../review.service';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input("locationID") locationID;
  commentText: string = '';
  ratingNumber: number = 5;
  ratings = [1, 2, 3, 4, 5];

  constructor (
    public reviewService: ReviewService,
    public authService: AuthService,
    public firebaseService: FirebaseService,
    public pop: PopoverController
  ) { }

  ngOnInit () {}

  changeRating(num) {
    this.ratingNumber = num;
  }

  submitReview () {
    let date = new Date();

    let review = {
      're': this.commentText,
      'ra': this.ratingNumber,
      'lid': this.locationID,
      'uid': this.authService.userId,
      'ufn': this.authService.userInfo.fn,
      'uln': this.authService.userInfo.ln,
      'dt': date
    }

    this.firebaseService.addReview(review).then(res => {
      this.pop.dismiss();
    })

    // Next Steps:
    // Increase rating on location
    // increase rating count on location
    // consider in ratings doing a table in a table thing.
    // Where we find all reviews based on the locationID, and then there's a table in that, that has multiple reviews.
    // TODO Update Fake Info in Submit Review

    // Add rating to "Max Number"
    // Add +1 to "Amount of Ratings"
    // Use this Algorithm to determine new rating.
    // Set Current Rating + Max Number + Rating Amount
  }

}
