import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<string>();
  toast$ = this.toastSubject.asObservable();

  showToast(mensaje: string) {
    this.toastSubject.next(mensaje);
  }
}
