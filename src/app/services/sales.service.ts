import {Injectable} from '@angular/core';
import {addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, where} from '@angular/fire/firestore';
import {SalesRecord} from "../dto/Sales";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private firestore: Firestore) {
  }

  addSale(data: Omit<SalesRecord, 'id'>) {
    const salesRef = collection(this.firestore, 'sales');
    return addDoc(salesRef, data);
  }


  getSales(startDate: string, store?: string): Observable<SalesRecord[]> {
    const salesRef = collection(this.firestore, 'sales');
    let q = query(salesRef, where('date', '>=', startDate));
    if (store && store !== 'All') {
      q = query(q, where('store', '==', store));
    }
    // const snapshot = await getDocs(q);
    // return snapshot.docs.map(doc => doc.data());

    return from(getDocs(q)).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<SalesRecord, 'id'>)
        }))
      )
    );
  }

  getAllSales(store?: string): Observable<SalesRecord[]> {
    const salesRef = collection(this.firestore, 'sales');
    let q = query(salesRef);
    if (store && store !== 'All') {
      q = query(q, where('store', '==', store));
    }
    // const snapshot = await getDocs(q);
    // return snapshot.docs.map(doc => doc.data());

    return from(getDocs(q)).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<SalesRecord, 'id'>)
        }))
      )
    );
  }


  async saleExists(college: string, date: string): Promise<boolean> {
    // Reference the 'sales' collection
    const salesRef = collection(this.firestore, 'sales');
    // Build a query: where college == college AND date == date
    const q = query(
      salesRef,
      where('employeeName', '==', college),
      where('date', '==', date)
    );
    console.log(date);

    // Execute the query
    const snapshot = await getDocs(q);
    // Firestore QuerySnapshot has an `empty` boolean property
    let t = snapshot.docs.map(doc => doc.data());
    return t.length <= 0;

  }

  /** new: deletes a sale by Firestore doc ID */
  deleteSale(id: string) {
    console.log(id);
    const ref = doc(this.firestore, "sales", id);
    return deleteDoc(ref);
  }
}
