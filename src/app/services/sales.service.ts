import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private firestore: Firestore) {}

  addSale(data: any) {
    const salesRef = collection(this.firestore, 'sales');
    return addDoc(salesRef, data);
  }


  async getSales(startDate: string, store?: string) {
    const salesRef = collection(this.firestore, 'sales');
    let q = query(salesRef, where('date', '>=', startDate));
    if (store && store !== 'All') {
      q = query(q, where('store', '==', store));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }


  async saleExists(college: string, date: string): Promise<boolean> {
    // Reference the 'sales' collection
    const salesRef = collection(this.firestore, 'sales');
    // Build a query: where college == college AND date == date
    const q = query(
      salesRef,
      where('college', '==', college),
      where('date', '==', date)
    );

    // Execute the query
    const snapshot = await getDocs(q);
    // Firestore QuerySnapshot has an `empty` boolean property
    let t= snapshot.docs.map(doc => doc.data());
    console.log(t,t.length<=0);
    return t.length<=0;

  }
}
