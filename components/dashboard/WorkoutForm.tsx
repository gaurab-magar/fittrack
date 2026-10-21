"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { todayIsoDate } from "@/lib/dates";
import { validateWorkoutForm } from "@/lib/workouts/validation";
import { EXERCISE_TYPES, type Workout, type WorkoutFieldErrors, type WorkoutInput } from "@/types/workout";

type WorkoutFormProps = {
  editingWorkout: Workout | null;
  onSubmit: (input: WorkoutInput) => void;
  onCancelEdit: () => void;
};

type FormState = {
  name: string;
  exerciseType: string;
  durationMinutes: string;
  date: string;
};

function createEmptyForm(): FormState {
  return {
    name: "",
    exerciseType: "",
    durationMinutes: "",
    date: todayIsoDate(),
  };
}

function formFromWorkout(workout: Workout): FormState {
  return {
    name: workout.name,
    exerciseType: workout.exerciseType,
    durationMinutes: String(workout.durationMinutes),
    date: workout.date,
  };
}

export function WorkoutForm({
  editingWorkout,
  onSubmit,
  onCancelEdit,
}: WorkoutFormProps) {
  return (
    <WorkoutFormFields
      key={editingWorkout?.id ?? "new"}
      editingWorkout={editingWorkout}
      onSubmit={onSubmit}
      onCancelEdit={onCancelEdit}
    />
  );
}

function WorkoutFormFields({
  editingWorkout,
  onSubmit,
  onCancelEdit,
}: WorkoutFormProps) {
  const nameId = useId();
  const typeId = useId();
  const durationId = useId();
  const dateId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(
    editingWorkout ? formFromWorkout(editingWorkout) : createEmptyForm(),
  );
  const [errors, setErrors] = useState<WorkoutFieldErrors>({});

  useEffect(() => {
    if (editingWorkout || window.location.hash === "#workout-form") {
      nameRef.current?.focus();
    }
  }, [editingWorkout]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateWorkoutForm(form);

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
    if (!editingWorkout) {
      setForm(createEmptyForm());
    }
  }

  function fieldErrorId(field: keyof WorkoutFieldErrors) {
    return errors[field] ? `${field}-error` : undefined;
  }

  return (
    <section
      id="workout-form"
      className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
    >
      <h2 className="text-xl font-semibold text-foreground">
        {editingWorkout ? "Edit workout" : "Add workout"}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {editingWorkout
          ? "Update the details below, then save your changes."
          : "Fill in the details of a completed session."}
      </p>

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor={nameId} className="mb-2 block text-sm font-medium text-foreground">
            Workout name
          </label>
          <input
            ref={nameRef}
            id={nameId}
            name="name"
            type="text"
            autoComplete="off"
            value={form.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={fieldErrorId("name")}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
          />
          {errors.name ? (
            <p id="name-error" role="alert" className="mt-2 text-sm text-danger">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={typeId} className="mb-2 block text-sm font-medium text-foreground">
            Exercise type
          </label>
          <select
            id={typeId}
            name="exerciseType"
            value={form.exerciseType}
            onChange={handleChange}
            aria-invalid={Boolean(errors.exerciseType)}
            aria-describedby={fieldErrorId("exerciseType")}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <option value="">Select a type</option>
            {EXERCISE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.exerciseType ? (
            <p id="exerciseType-error" role="alert" className="mt-2 text-sm text-danger">
              {errors.exerciseType}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={durationId} className="mb-2 block text-sm font-medium text-foreground">
              Duration in minutes
            </label>
            <input
              id={durationId}
              name="durationMinutes"
              type="number"
              min={1}
              step={1}
              value={form.durationMinutes}
              onChange={handleChange}
              aria-invalid={Boolean(errors.durationMinutes)}
              aria-describedby={fieldErrorId("durationMinutes")}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
            />
            {errors.durationMinutes ? (
              <p id="durationMinutes-error" role="alert" className="mt-2 text-sm text-danger">
                {errors.durationMinutes}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={dateId} className="mb-2 block text-sm font-medium text-foreground">
              Workout date
            </label>
            <input
              id={dateId}
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={fieldErrorId("date")}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
            />
            {errors.date ? (
              <p id="date-error" role="alert" className="mt-2 text-sm text-danger">
                {errors.date}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            {editingWorkout ? "Save Changes" : "Add Workout"}
          </Button>
          {editingWorkout ? (
            <Button variant="secondary" onClick={onCancelEdit}>
              Cancel Edit
            </Button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
