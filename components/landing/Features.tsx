import { Activity, ClipboardList, History } from "lucide-react";

const features = [
  {
    title: "Track Workouts",
    description:
      "Log each session with a name, exercise type, duration, and date so nothing gets lost.",
    icon: ClipboardList,
  },
  {
    title: "Monitor Activity",
    description:
      "See totals for workouts, minutes trained, and how active you have been this week.",
    icon: Activity,
  },
  {
    title: "Maintain Workout History",
    description:
      "Review, edit, or remove past workouts from one dashboard as your training evolves.",
    icon: History,
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Built for consistent training
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Three focused tools, one place to start. No clutter, just the records
          you need to stay accountable.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Icon aria-hidden="true" size={22} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
