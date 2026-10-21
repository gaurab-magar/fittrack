"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDisplayDate } from "@/lib/dates";
import type { Workout } from "@/types/workout";

type WorkoutListProps = {
  workouts: Workout[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function WorkoutList({ workouts, onEdit, onDelete }: WorkoutListProps) {
  if (workouts.length === 0) {
    return (
      <section
        aria-label="Workout history"
        className="rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center"
      >
        <h2 className="text-lg font-semibold text-foreground">No workouts yet</h2>
        <p className="mt-2 text-sm text-muted">
          Add your first session with the form above. Your history will appear here.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Workout history" className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Workout history</h2>
      <ul className="grid gap-4">
        {workouts.map((workout) => (
          <li
            key={workout.id}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {workout.name}
                </h3>
                <dl className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-3">
                  <div>
                    <dt className="font-medium text-foreground">Type</dt>
                    <dd>{workout.exerciseType}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Duration</dt>
                    <dd>{workout.durationMinutes} minutes</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Date</dt>
                    <dd>{formatDisplayDate(workout.date)}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="px-3"
                  onClick={() => onEdit(workout.id)}
                >
                  <Pencil aria-hidden="true" size={16} />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="px-3"
                  onClick={() => onDelete(workout.id)}
                >
                  <Trash2 aria-hidden="true" size={16} />
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
