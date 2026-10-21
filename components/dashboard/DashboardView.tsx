"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { StatusMessage } from "@/components/dashboard/StatusMessage";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { WorkoutForm } from "@/components/dashboard/WorkoutForm";
import { WorkoutList } from "@/components/dashboard/WorkoutList";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useWorkouts } from "@/hooks/useWorkouts";
import type { WorkoutInput } from "@/types/workout";

type Feedback = {
  type: "success" | "error";
  message: string;
};

export function DashboardView() {
  const { workouts, stats, create, update, remove, getById } = useWorkouts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const editingWorkout = editingId ? getById(editingId) ?? null : null;
  const pendingDelete = pendingDeleteId ? getById(pendingDeleteId) : undefined;

  function showFeedback(type: Feedback["type"], message: string) {
    setFeedback({ type, message });
  }

  function handleSubmit(input: WorkoutInput) {
    if (editingId) {
      const existing = getById(editingId);
      if (!existing) {
        showFeedback("error", "That workout could not be found. It may already have been deleted.");
        setEditingId(null);
        return;
      }

      update(editingId, input);
      setEditingId(null);
      showFeedback("success", "Workout updated.");
      return;
    }

    create(input);
    showFeedback("success", "Workout added.");
  }

  function handleEdit(id: string) {
    setEditingId(id);
    document.getElementById("workout-form")?.scrollIntoView({ behavior: "smooth" });
  }

  function confirmDelete() {
    if (!pendingDeleteId) {
      return;
    }

    remove(pendingDeleteId);
    if (editingId === pendingDeleteId) {
      setEditingId(null);
    }
    setPendingDeleteId(null);
    showFeedback("success", "Workout deleted.");
  }

  return (
    <>
      <SiteHeader
        links={[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
        ]}
        cta={{ href: "#workout-form", label: "Add Workout" }}
      />
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Your Workout Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Add, review, update, and delete workouts on this page. Totals update
          automatically from the list below.
        </p>

        <div className="mt-8">
          <SummaryCards stats={stats} />
        </div>

        {feedback ? (
          <div className="mt-6">
            <StatusMessage type={feedback.type} message={feedback.message} />
          </div>
        ) : null}

        <div className="mt-8">
          <WorkoutForm
            editingWorkout={editingWorkout}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditingId(null)}
          />
        </div>

        <div className="mt-8">
          <WorkoutList
            workouts={workouts}
            onEdit={handleEdit}
            onDelete={setPendingDeleteId}
          />
        </div>
      </main>
      <SiteFooter />

      {pendingDelete ? (
        <ConfirmDialog
          title="Delete this workout?"
          description={`This will permanently remove “${pendingDelete.name}” from your current session.`}
          confirmLabel="Delete workout"
          onConfirm={confirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      ) : null}
    </>
  );
}
