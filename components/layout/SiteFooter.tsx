import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-lg font-semibold text-foreground">
            Fit<span className="text-accent">Track</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            A simple workout tracker that helps you log sessions, monitor activity,
            and keep a clear history of your training.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
