import { EXERCISE_TYPES, type WorkoutFieldErrors, type WorkoutInput } from "@/types/workout";
import { parseLocalDate } from "@/lib/dates";

export type WorkoutValidationResult =
  | { ok: true; data: WorkoutInput }
  | { ok: false; errors: WorkoutFieldErrors };

type RawWorkoutForm = {
  name: string;
  exerciseType: string;
  durationMinutes: string;
  date: string;
};

export function validateWorkoutForm(form: RawWorkoutForm): WorkoutValidationResult {
  const errors: WorkoutFieldErrors = {};
  const name = form.name.trim();
  const durationValue = Number(form.durationMinutes);
  const date = parseLocalDate(form.date);

  if (!name) {
    errors.name = "Please enter a workout name.";
  } else if (name.length < 2) {
    errors.name = "Workout name must be at least 2 characters.";
  }

  const isKnownType = EXERCISE_TYPES.includes(
    form.exerciseType as (typeof EXERCISE_TYPES)[number],
  );
  if (!form.exerciseType) {
    errors.exerciseType = "Please choose an exercise type.";
  } else if (!isKnownType) {
    errors.exerciseType = "Please choose a valid exercise type.";
  }

  if (form.durationMinutes.trim() === "") {
    errors.durationMinutes = "Please enter the duration in minutes.";
  } else if (!Number.isInteger(durationValue) || durationValue <= 0) {
    errors.durationMinutes = "Duration must be a whole number greater than 0.";
  } else if (durationValue > 24 * 60) {
    errors.durationMinutes = "Duration cannot be longer than 24 hours.";
  }

  if (!form.date) {
    errors.date = "Please choose a workout date.";
  } else if (!date) {
    errors.date = "Please enter a valid date.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      exerciseType: form.exerciseType as WorkoutInput["exerciseType"],
      durationMinutes: durationValue,
      date: form.date,
    },
  };
}
