import { CallToAction } from "@/components/landing/CallToAction";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader
        links={[
          { href: "/", label: "Home" },
          { href: "/#features", label: "Features" },
          { href: "/dashboard", label: "Dashboard" },
        ]}
        cta={{ href: "/dashboard", label: "Get Started" }}
      />
      <main id="main-content">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  );
}
