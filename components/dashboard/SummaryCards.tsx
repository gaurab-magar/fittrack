import { Activity, Clock3, Dumbbell } from "lucide-react";
import type { WorkoutStats } from "@/lib/workouts/stats";

type SummaryCardsProps = {
  stats: WorkoutStats;
};

const cards = [
  {
    key: "totalWorkouts" as const,
    label: "Total workouts",
    icon: Dumbbell,
  },
  {
    key: "totalDurationMinutes" as const,
    label: "Total minutes",
    icon: Clock3,
  },
  {
    key: "workoutsThisWeek" as const,
    label: "This week",
    icon: Activity,
  },
];

export function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <section aria-label="Workout summary" className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.key}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{card.label}</p>
              <Icon aria-hidden="true" className="text-accent" size={18} />
            </div>
            <p className="mt-4 text-3xl font-semibold text-foreground">
              {stats[card.key]}
            </p>
          </article>
        );
      })}
    </section>
  );
}
