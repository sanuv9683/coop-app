import {Injectable} from '@angular/core';
import Swal, {SweetAlertOptions, SweetAlertResult} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  fire(options: SweetAlertOptions): Promise<SweetAlertResult<any>> {
    return Swal.fire(options);
  }

  success(title: string, text?: string) {
    return Swal.fire({icon: 'success', title, text});
  }

  myAlert(title: string) {
    return Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  normal(message:string){
    Swal.fire(message);
  }

  error(title: string, text?: string) {
    return Swal.fire({icon: 'error', title, text});
  }

  confirm(title: string, text: string) {
    return Swal.fire({
      title, text, icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    });
  }
}
