import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  totalClientes = 0;
  totalWorkouts = 0;

  constructor(
    private customerservice: CustomerService,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
      this.customerservice.getAll().subscribe(data => {
        this.totalClientes = data.length;
      });

      this.workoutService.getAll().subscribe(data => {
        this.totalWorkouts = data.length;
      });
  }
}
