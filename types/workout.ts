export const EXERCISE_TYPES = [
  "Running",
  "Strength Training",
  "Cycling",
  "Walking",
  "Swimming",
  "Other",
] as const;

export type ExerciseType = (typeof EXERCISE_TYPES)[number];

export type Workout = {
  id: string;
  name: string;
  exerciseType: ExerciseType;
  durationMinutes: number;
  date: string;
};

export type WorkoutInput = Omit<Workout, "id">;

export type WorkoutFieldErrors = {
  name?: string;
  exerciseType?: string;
  durationMinutes?: string;
  date?: string;
};
