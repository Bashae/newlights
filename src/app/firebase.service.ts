import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public afs: AngularFirestore
  ) { }

  addUser(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/u').add({
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

}
