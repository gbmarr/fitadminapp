export interface Workout {
    id?: string;
    customerId: string;
    nombre: string;
    fecha?: string;
    ejercicios: WorkoutExercise[];
}

export interface WorkoutExercise {
    ejercicioId: string;
    nombre: string;
    series: number;
    repeticiones: number;
};