import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise-picker',
  templateUrl: './exercise-picker.component.html'
})
export class ExercisePickerComponent implements OnInit {
  exercises: Exercise[] = [];
  filtered: Exercise[] = [];
  search = '';

  currentPage = 1;
  pageSize = 10;

  imgAPIUrl = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
  imageIndexMap: { [id: string]: number } = {};

  @Output() onAddExercise = new EventEmitter<Exercise>();

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
      this.exerciseService.getAll().subscribe(data => {
        this.exercises = data;
        this.filtrar();
      });
  }

  filtrar(): void {
    const query = this.search.toLowerCase();
    this.filtered = this.exercises.filter(
      e => e.name.toLowerCase().includes(query)
    )
    this.currentPage = 1;
  }

  seleccionar(ejercicio: Exercise): void {
    this.onAddExercise.emit(ejercicio);
  }

  get pagedExercises(): Exercise[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize);
  }

  cambiarPagina(direccion: 'prev' | 'next'): void {
    if (direccion === 'prev' && this.currentPage > 1) this.currentPage--;
    if (direccion === 'next' && this.currentPage < this.totalPages()) this.currentPage++;
  }

  alternarImagen(id: string): void {
    const actual = this.imageIndexMap[id] ?? 0;
    this.imageIndexMap[id] = actual === 0 ? 1 : 0;
  }

  obtenerImagen(e: Exercise): string {
    const index = this.imageIndexMap[e.id] ?? 0;
    const path = e.images?.[index];

    if (!path) return 'https://uning.es/inicio/image-placeholder/';

    if (path.startsWith('http')) return path;

    return `${this.imgAPIUrl}${path}`;
  }
}
