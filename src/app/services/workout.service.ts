import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private apiUrl = 'https://668e923dbf9912d4c92eda78.mockapi.io/fit-admin-API/workouts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.apiUrl);
  }

  getByCustomerId(customerId: string): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrl}?customerId=${customerId}`);
  };

  getById(id: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrl}/${id}`);
  }

  create(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(this.apiUrl, workout);
  }

  update(workout: Workout): Observable<Workout> {
    return this.http.put<Workout>(`${this.apiUrl}/${workout.id}`, workout);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
