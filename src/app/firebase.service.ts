import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public afs: AngularFirestore
  ) { }

  // addItem(container, value){
  //   return new Promise<any>((resolve, reject) => {
  //     this.afs.collection(container).add(value)
  //     .then(
  //       (res) => {
  //         resolve(res)
  //       },
  //       err => reject(err)
  //     )
  //   })
  // }

  addUser(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/u').doc(value.i).set(value)
      .then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
    })
  }

  addLocation(value) {
    return this.afs.collection('/l').add(value);
  }

  addPost(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/p').add({
        name: value.name,
        surname: value.surname,
        age: parseInt(value.age)
      })
      .then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
    })
  }

  addReview(value) {
    return this.afs.collection('/r').add(value);
  }

}
