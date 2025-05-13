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
    let q = query(collection(this.firestore, 'sales'), where('date', '>=', startDate));
    if (store && store !== 'All') {
      q = query(q, where('store', '==', store));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }
}
