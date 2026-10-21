
import type { Workout, WorkoutInput, ExerciseType } from "@/types/workout";

const API_URL = "http://localhost:3001/api/workouts";

type ApiWorkout = Omit<Workout, "exerciseType" | "date"> & {
  exerciseType: string;
  date: string;
};

function toFrontendWorkout(workout: ApiWorkout): Workout {
  return {
    ...workout,
    exerciseType:
      workout.exerciseType === "StrengthTraining"
        ? "Strength Training"
        : (workout.exerciseType as ExerciseType),
    date: workout.date.slice(0, 10),
  };
}

function toBackendInput(input: WorkoutInput) {
  return {
    ...input,
    exerciseType:
      input.exerciseType === "Strength Training"
        ? "StrengthTraining"
        : input.exerciseType,
  };
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function getWorkouts(): Promise<Workout[]> {
  const data = await request<ApiWorkout[]>(API_URL);
  return data.map(toFrontendWorkout);
}

export async function createWorkout(input: WorkoutInput): Promise<Workout> {
  const data = await request<ApiWorkout>(API_URL, {
    method: "POST",
    body: JSON.stringify(toBackendInput(input)),
  });

  return toFrontendWorkout(data);
}

export async function updateWorkoutFromApi(
  id: string,
  input: WorkoutInput,
): Promise<Workout> {
  const data = await request<ApiWorkout>(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(toBackendInput(input)),
  });

  return toFrontendWorkout(data);
}

export async function deleteWorkoutFromApi(id: string): Promise<void> {
  await request<void>(`${API_URL}/${id}`, { method: "DELETE" });
}
