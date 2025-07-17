import { Component, OnInit } from '@angular/core';
import { Workout } from '../../models/workout.model';
import { Customer } from '../../models/customer.model';
import { WorkoutService } from '../../services/workout.service';
import { CustomerService } from '../../services/customer.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html'
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  customers: Customer[] = [];
  loading = true;

  constructor(
    private wourkoutService: WorkoutService,
    private customerService: CustomerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
      this.loadData();
  }

  loadData(): void {
    this.customerService.getAll().subscribe(clientes => {
      this.customers = clientes;

      this.wourkoutService.getAll().subscribe({
        next: workouts => {
          this.workouts = workouts;
          this.loading = false;
        },
        error: () => {
          this.toastService.showToast('Error al cargar entrenamientos');
          this.loading = false;
        }
      });
    });
  }

  getCustomerName(customerId: string): string {
    const cliente = this.customers.find(c => c.id === customerId);
    return cliente ? cliente.nombre : 'Cliente no encontrado';
  }

  eliminar(id: string): void {
    if (!confirm('¿Eliminar este entrenamiento?')) return;

    this.wourkoutService.delete(id).subscribe(() => {
      this.workouts = this.workouts.filter(w => w.id !== id);
      this.toastService.showToast('Entrenamiento eliminado');
    });
  }
}
