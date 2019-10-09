import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  commentText: string = '';
  ratingNumber: number = 5;
  ratings = [1, 2, 3, 4, 5];

  constructor (
    public reviewService: ReviewService
  ) { 

  }

  ngOnInit () {}

  changeRating(num) {
    console.log(num);
    console.log(typeof(num));
    this.ratingNumber = num;
  }

  submitReview () {
    // Add rating to "Max Number"
    // Add +1 to "Amount of Ratings"
    // Use this Algorithm to determine new rating.
    // Set Current Rating + Max Number + Rating Amount
  }

}
