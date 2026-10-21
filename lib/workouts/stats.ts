import { parseLocalDate, startOfCurrentWeek } from "@/lib/dates";
import type { Workout } from "@/types/workout";

export type WorkoutStats = {
  totalWorkouts: number;
  totalDurationMinutes: number;
  workoutsThisWeek: number;
};

export function getWorkoutStats(workouts: Workout[], now: Date): WorkoutStats {
  const weekStart = startOfCurrentWeek(now);

  return {
    totalWorkouts: workouts.length,
    totalDurationMinutes: workouts.reduce(
      (total, workout) => total + workout.durationMinutes,
      0,
    ),
    workoutsThisWeek: workouts.filter((workout) => {
      const date = parseLocalDate(workout.date);
      return date !== null && date >= weekStart;
    }).length,
  };
}
