import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = true;

  constructor (
    private customerService: CustomerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
      this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customers = data;
        this.loading = false;
      },
      error: (err) => {
        this.toastService.showToast('Error al cargar clientes');
        this.loading = false;
      }
    });
  }

  eliminarCliente(id: string): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) return;

    this.customerService.delete(id).subscribe(() => {
      this.toastService.showToast('Cliente eliminado');
      this.customers = this.customers.filter(c => c.id !== id);
    });
  }
}
