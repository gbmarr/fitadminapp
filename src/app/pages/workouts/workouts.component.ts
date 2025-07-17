import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit {
  clientes: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.customerService.getAll().subscribe(data => {
      this.clientes = data;
    });
  }

  crearNuevoEntrenamiento(): void {
    this.router.navigate(['/workouts/new']);
  }
}
