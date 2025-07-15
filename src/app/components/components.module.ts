import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { ExercisePickerComponent } from './exercise-picker/exercise-picker.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent,
    WorkoutListComponent,
    WorkoutFormComponent,
    ExercisePickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CustomerListComponent,
    WorkoutListComponent
  ]
})
export class ComponentsModule { }
