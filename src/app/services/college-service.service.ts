
import { Injectable } from '@angular/core';
import {Firestore, collection, query, where, getDocs, updateDoc, doc, addDoc, deleteDoc,orderBy} from '@angular/fire/firestore';
import { College } from '../dto/college';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class CollegeService {
  private colRef = collection(this.firestore, 'colleges');

  constructor(private firestore: Firestore) {}

  getColleges(): Observable<College[]> {
    const q = query(this.colRef);

    return from(getDocs(q)).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => ({
          id:    doc.id,
          ...(doc.data() as Omit<College, 'id'>)
        }))
      )
    );
  }



  /** Add a new college */
  addCollege(col: Omit<College, 'id'>) {
    return addDoc(this.colRef, col);
  }

  /** Update an existing college by id */
  updateCollege(id: string, data: Partial<College>) {
    const docRef = doc(this.firestore, 'colleges', id);
    return updateDoc(docRef, data);
  }

  /** Delete a college by id */
  deleteCollege(id: string) {
    const docRef = doc(this.firestore, 'colleges', id);
    return deleteDoc(docRef);
  }
}
