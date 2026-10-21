import { createId } from "@/lib/create-id";
import type { Workout, WorkoutInput } from "@/types/workout";

export function addWorkout(workouts: Workout[], input: WorkoutInput): Workout[] {
  const workout: Workout = {
    id: createId(),
    ...input,
  };

  return [workout, ...workouts];
}

export function updateWorkout(
  workouts: Workout[],
  id: string,
  input: WorkoutInput,
): Workout[] {
  return workouts.map((workout) =>
    workout.id === id ? { ...workout, ...input } : workout,
  );
}

export function deleteWorkout(workouts: Workout[], id: string): Workout[] {
  return workouts.filter((workout) => workout.id !== id);
}

export function findWorkout(workouts: Workout[], id: string): Workout | undefined {
  return workouts.find((workout) => workout.id === id);
}
