import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { MnzMark } from "./MnzMark";
import logoImg from "@/assets/mnz-logo.png";

const links = [
  { label: "Work", href: "#work" },
  { label: "Why MNZ", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <Link to="/" className="flex h-10 items-center gap-3 md:h-12">
          <img
            src={logoImg}
            alt="MNZ Signs & Prints"
            className={`h-full w-auto transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            loading="eager"
            decoding="async"
            aria-hidden={!scrolled}
          />
          <span className="sr-only">MNZ Signs &amp; Prints — Your Vision Amplified</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bone transition-all hover:bg-mnz-red"
          >
            Free Estimate
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-full border border-border bg-card p-2"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col p-5 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-bone"
            >
              Free Estimate <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-3 md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <MnzMark size={48} />
            <div>
              <div className="font-display text-xl">MNZ SIGNS &amp; PRINTS</div>
              <div className="font-italic text-xs text-bone/60">Your Vision Amplified!</div>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm text-bone/70">
            High-quality custom signage, printing, and digital displays — designed
            and manufactured in-house. 5-year warranty. Free estimates.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <div className="mb-4 text-xs uppercase tracking-widest text-bone/50">Products</div>
            <ul className="space-y-2 text-bone/85">
              <li>Pylons</li>
              <li>Channel Letters</li>
              <li>Monument Signs</li>
              <li>Window Graphics</li>
              <li>LED Signage</li>
              <li>Banners</li>
              <li>Wayfinding</li>
              <li>ADA Signage</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs uppercase tracking-widest text-bone/50">Company</div>
            <ul className="space-y-2 text-bone/85">
              <li><a href="#work" className="hover:text-mnz-yellow">Our Work</a></li>
              <li><a href="#why" className="hover:text-mnz-yellow">Why MNZ</a></li>
              <li><a href="#process" className="hover:text-mnz-yellow">Process</a></li>
              <li><a href="#reviews" className="hover:text-mnz-yellow">Reviews</a></li>
              <li><a href="#contact" className="hover:text-mnz-yellow">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="text-sm">
          <div className="mb-4 text-xs uppercase tracking-widest text-bone/50">Get in touch</div>
          <ul className="space-y-3 text-bone/90">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-mnz-yellow" />
              <a href="tel:+13468376523" className="hover:text-mnz-yellow">+1 (346) 837 6523</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-mnz-yellow" />
              <a href="mailto:mnzsignsnprints@gmail.com" className="hover:text-mnz-yellow">mnzsignsnprints@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-bone/55 md:flex-row md:items-center md:px-10">
          <div>© {new Date().getFullYear()} MNZ Signs &amp; Prints. All rights reserved.</div>
          <div>10 Years of Excellence · 5-Year Warranty · Made local in TEXAS</div>
        </div>
      </div>

      {/* Massive watermark wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 w-[120%] -translate-x-1/2 select-none text-center font-display text-[18vw] leading-none text-bone/[0.04]"
      >
        MNZ
      </div>
    </footer>
  );
}
