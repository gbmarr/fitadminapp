import { Component, OnInit } from '@angular/core';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FitAdmin App';
  showToast = false;
  mensajeToast = '';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
      this.toastService.toast$.subscribe(msj => {
        this.mensajeToast = msj;
        this.showToast = true;
        setTimeout(() => this.showToast = false, 3000);
      })
  }

  cerrarToast() { this.showToast = false; }
}
