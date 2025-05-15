
import { Injectable } from '@angular/core';
import {Firestore, collection, query, where, getDocs, collectionData, updateDoc, doc, addDoc, deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { College } from '../dto/college';


@Injectable({ providedIn: 'root' })
export class CollegeService {
  private colRef = collection(this.firestore, 'colleges');

  constructor(private firestore: Firestore) {}

  /** Stream of all colleges (with id) */
  getColleges(): Observable<College[]> {
   this.colRef = collection(this.firestore, 'colleges');
    return collectionData(this.colRef, { idField: 'id' }) as Observable<College[]>;
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
