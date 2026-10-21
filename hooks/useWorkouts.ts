
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createWorkout,
  deleteWorkoutFromApi,
  getWorkouts,
  updateWorkoutFromApi,
} from "@/lib/workouts/api";
import { getWorkoutStats } from "@/lib/workouts/stats";
import type { Workout, WorkoutInput } from "@/types/workout";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getWorkouts();
      setWorkouts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load workouts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const create = useCallback(async (input: WorkoutInput) => {
    const workout = await createWorkout(input);
    setWorkouts((current) => [workout, ...current]);
  }, []);

  const update = useCallback(async (id: string, input: WorkoutInput) => {
    const workout = await updateWorkoutFromApi(id, input);
    setWorkouts((current) =>
      current.map((item) => (item.id === id ? workout : item)),
    );
  }, []);

  const remove = useCallback(async (id: string) => {
    await deleteWorkoutFromApi(id);
    setWorkouts((current) => current.filter((item) => item.id !== id));
  }, []);

  const getById = useCallback(
    (id: string) => workouts.find((workout) => workout.id === id),
    [workouts],
  );

  const stats = useMemo(
    () => getWorkoutStats(workouts, new Date()),
    [workouts],
  );

  return {
    workouts,
    stats,
    create,
    update,
    remove,
    getById,
    loading,
    error,
    refresh,
  };
}
