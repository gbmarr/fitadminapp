import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { CustomersComponent } from './pages/customers/customers.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'clientes', component: CustomersComponent },
	{ path: 'clientes/nuevo', component: CustomerFormComponent },
	{ path: 'clientes/:id', component: CustomerFormComponent },
	{ path: 'workouts', component: WorkoutsComponent },
	{ path: 'workouts/new', component: WorkoutFormComponent },
	{ path: 'workouts/:id', component: WorkoutFormComponent },
	{ path: 'sobre', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
