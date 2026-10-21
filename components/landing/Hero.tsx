import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Fitness tracking
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Make Every Workout Count.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
          FitTrack helps you log workouts, watch your activity add up, and keep a
          clear history of your training. Start simple today, then grow the app
          as you learn.
        </p>
        <div className="mt-8">
          <ButtonLink href="/dashboard">Start Tracking</ButtonLink>
        </div>
      </div>
      <div className="relative min-h-80 overflow-hidden rounded-2xl border border-border sm:min-h-96">
        <Image
          src="/images/hero-gym.jpg"
          alt="People training with free weights in a gym"
          fill
          priority
          className="object-cover object-[70%_center]"
          sizes="(min-width: 1024px) 540px, 100vw"
        />
      </div>
    </section>
  );
}
