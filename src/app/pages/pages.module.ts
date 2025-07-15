import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { CustomersComponent } from './customers/customers.component';
import { WorkoutsComponent } from './workouts/workouts.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    CustomersComponent,
    WorkoutsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
