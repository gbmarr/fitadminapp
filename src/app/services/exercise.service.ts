import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }
}
