import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export function CallToAction() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-border">
        <Image
          src="/images/cta-training.jpg"
          alt="A person performing a kettlebell workout"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="relative bg-background/80 px-6 py-16 sm:px-12">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground">
            Your next session deserves a record.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Open the dashboard, add today&apos;s workout, and start building a
            history you can actually use.
          </p>
          <div className="mt-8">
            <ButtonLink href="/dashboard">Go to Dashboard</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
