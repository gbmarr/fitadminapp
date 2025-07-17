import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Workout, WorkoutExercise } from '../../models/workout.model';
import { CustomerService } from '../../services/customer.service';
import { WorkoutService } from '../../services/workout.service';
import { ToastService } from '../../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html'
})
export class WorkoutFormComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomerId = '';
  nombre = '';
  ejercicios: WorkoutExercise[] = [];

  workoutId?: string;
  editMode = false;

  constructor(
    private customerService: CustomerService,
    private workoutService: WorkoutService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.customerService.getAll().subscribe(data => {
        this.customers = data;

        if (this.customers.length === 0) {
          this.toastService.showToast('No hay clientes disponibles. Crea uno primero.');
          this.router.navigate(['/clientes/nuevo']);
        }
      });

      this.workoutId = this.route.snapshot.paramMap.get('id') ?? undefined;
      if (this.workoutId) {
        this.editMode = true;

        this.workoutService.getById(this.workoutId).subscribe(workout => {
          this.nombre = workout.nombre;
          this.selectedCustomerId = workout.customerId;
          this.ejercicios = workout.ejercicios;
        });
      }
  }

  agregarEjercicio(e: Exercise): void {
    if (this.ejercicios.length >= 10) {
      this.toastService.showToast('Máximo 10 ejercicios por entrenamiento');
      return;
    }

    const yaExiste = this.ejercicios.find(ej => ej.ejercicioId === e.id);
    if (yaExiste) {
      this.toastService.showToast('El ejercicio seleccionado ya existe');
      return;
    }
    
    this.ejercicios.push({
      ejercicioId: e.id,
      nombre: e.name,
      series: 3,
      repeticiones: 10
    });
  }

  eliminarEjercicio(id: string): void {
    this.ejercicios = this.ejercicios.filter(e => e.ejercicioId !== id);
  }

  guardar(): void {
    if (!this.selectedCustomerId || !this.nombre || this.ejercicios.length === 0) {
      this.toastService.showToast('Completa todos los campos');
      return;
    }
    
    const workout: Workout = {
      id: this.workoutId,
      customerId: this.selectedCustomerId,
      nombre: this.nombre,
      fecha: new Date().toISOString(),
      ejercicios: this.ejercicios
    };

    if (this.editMode && this.workoutId){
      this.workoutService.update(workout).subscribe(() => {
        this.toastService.showToast('Entrenamiento actualizado');
        this.router.navigate(['/workouts']);
      });
    } else {
      this.workoutService.create(workout).subscribe(() => {
        this.toastService.showToast('Entrenamiento creado');
        this.router.navigate(['/workouts']);
      });
    }

  }

  validarRango(e: WorkoutExercise, campo: 'series' | 'repeticiones', min: number, max: number): void {
    const valor = e[campo];
    if (valor < min) e[campo] = min;
    if (valor > max) e[campo] = max;
  }
}
