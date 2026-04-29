import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Phone, Mail, MapPin, Check, Sparkles, Clock, ShieldCheck, Wrench, Star } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { CornerBlocks } from "@/components/CornerBlocks";
import { MnzMark } from "@/components/MnzMark";
import heroImg from "@/assets/hero-channel-letters.jpg";
import workPylon from "@/assets/work-pylon.jpg";
import workMonument from "@/assets/work-monument.jpg";
import workWindow from "@/assets/work-window.jpg";
import workLed from "@/assets/work-led.jpg";
import workBanner from "@/assets/work-banner.jpg";
import craftImg from "@/assets/craft.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MNZ Signs & Prints — Custom Signage, Channel Letters, Pylons & LED Displays" },
      {
        name: "description",
        content:
          "Award-winning custom signage, channel letters, monuments, pylons, LED displays and printing — designed, built and installed in-house. 5-year warranty. Free estimate.",
      },
      { property: "og:title", content: "MNZ Signs & Prints — Your Vision Amplified" },
      {
        property: "og:description",
        content:
          "Custom signage that makes your brand unforgettable. Channel letters, pylons, monuments, LED & more. 15 years of craft. 5-year warranty.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MNZ Signs & Prints — Your Vision Amplified" },
    ],
  }),
  component: Index,
});

const products = [
  {
    name: "Channel Letters",
    img: heroImg,
    desc: "3D illuminated storefront letters that command attention day and night.",
    accent: "var(--mnz-red)",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Pylons",
    img: workPylon,
    desc: "Tall, road-side pylons built for highway visibility.",
    accent: "var(--mnz-yellow)",
    span: "",
  },
  {
    name: "Monuments",
    img: workMonument,
    desc: "Architectural ground-level signs for premium entrances.",
    accent: "var(--mnz-green)",
    span: "",
  },
  {
    name: "LED Displays",
    img: workLed,
    desc: "High-resolution outdoor and indoor LED video walls.",
    accent: "var(--mnz-cyan)",
    span: "",
  },
  {
    name: "Window Graphics",
    img: workWindow,
    desc: "Vinyl decals and full-window wraps that turn glass into a billboard.",
    accent: "var(--mnz-blue)",
    span: "",
  },
  {
    name: "Banners",
    img: workBanner,
    desc: "Vibrant, weather-tough banners for events, launches and promos.",
    accent: "var(--mnz-red)",
    span: "",
  },
];

const stats = [
  { n: "15+", l: "Years of Craft" },
  { n: "5yr", l: "Warranty on Parts & Labor" },
  { n: "1k+", l: "Signs Installed" },
  { n: "100%", l: "In-House Manufacturing" },
];

const why = [
  {
    icon: ShieldCheck,
    title: "5-Year Warranty",
    body: "Built to outlast the weather. Parts and labor covered for half a decade.",
    color: "var(--mnz-red)",
  },
  {
    icon: Wrench,
    title: "All Under One Roof",
    body: "Design, fabrication, permits, install. One partner, zero handoffs.",
    color: "var(--mnz-yellow)",
  },
  {
    icon: Sparkles,
    title: "UL-Listed Quality",
    body: "Weather-resistant metals, high-density acrylic, UV-protected vinyl.",
    color: "var(--mnz-green)",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    body: "We treat your timelines like ours. Rapid quotes, on-time installs.",
    color: "var(--mnz-cyan)",
  },
];

const process = [
  { step: "01", title: "Discover", body: "We learn your brand, location, and goals." },
  { step: "02", title: "Design", body: "Concepts and 3D mock-ups before a single bolt is cut." },
  { step: "03", title: "Build", body: "Fabricated in-house by master craftsmen." },
  { step: "04", title: "Install", body: "Permitted, mounted, illuminated — turnkey." },
];

const reviews = [
  {
    quote:
      "The reverse channel letter signage looks absolutely stunning at night. MNZ nailed the installation and lighting — it gives our brand a truly premium look.",
    name: "Nina V.",
    role: "Salon Owner, Boston MA",
    color: "var(--mnz-red)",
  },
  {
    quote:
      "Our retail plaza needed an updated pylon sign. MNZ designed a clean, impactful layout that gives every tenant visibility. Couldn't be happier.",
    name: "Carlos G.",
    role: "Leasing Agent, Sacramento CA",
    color: "var(--mnz-yellow)",
  },
  {
    quote:
      "The lobby signage MNZ installed added an instant 'wow' factor to our office. Clean lines, modern finish, excellent service.",
    name: "David M.",
    role: "Law Firm Partner, Denver CO",
    color: "var(--mnz-green)",
  },
  {
    quote:
      "The monument sign at our corporate entrance has become a landmark in the area. Premium look, flawless install.",
    name: "Angela B.",
    role: "Director of Operations, Nashville TN",
    color: "var(--mnz-cyan)",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-28 md:pt-36 pb-24 md:pb-32">
        <CornerBlocks corner="tl" size={300} />
        <CornerBlocks corner="br" size={360} />

        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-12 md:gap-8 md:px-10">
          <div className="relative z-10 md:col-span-7 reveal-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-ink/70 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mnz-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mnz-green" />
              </span>
              Now booking installs · Cypress, TX &amp; nationwide
            </div>

            <h1 className="mt-6 font-display text-[14vw] leading-[0.85] text-ink md:text-[7.5rem] lg:text-[9rem]">
              SIGNS<br />
              THAT <span className="text-mnz-red">SHOUT</span>
              <span className="font-italic font-normal text-ink/80">.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-ink/70 text-balance">
              We design, fabricate and install storefront signage, monuments, pylons,
              LED displays and large-format prints. In-house craftsmanship since 2010.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-bone transition-all hover:bg-mnz-red"
              >
                Get a Free Estimate
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-transparent px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-bone"
              >
                See our work
              </a>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl text-ink">{s.n}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={heroImg}
                alt="Glowing illuminated channel letter storefront sign at dusk"
                className="h-full w-full object-cover"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div className="rounded-2xl bg-bone/95 px-4 py-3 backdrop-blur">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Featured</div>
                  <div className="font-display text-sm">Channel Letters · Houston, TX</div>
                </div>
                <div className="rounded-full bg-mnz-yellow px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
                  UL Listed
                </div>
              </div>
            </div>

            {/* Floating mark */}
            <div className="absolute -left-8 -top-8 hidden md:block">
              <MnzMark size={96} className="drop-shadow-xl" />
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative mt-20 overflow-hidden border-y border-border bg-ink py-5 text-bone">
          <div className="marquee whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex shrink-0 items-center gap-10 px-5 font-display text-2xl md:text-3xl">
                {[
                  "PYLONS",
                  "★",
                  "CHANNEL LETTERS",
                  "★",
                  "MONUMENTS",
                  "★",
                  "LED DISPLAYS",
                  "★",
                  "WAYFINDING",
                  "★",
                  "ADA SIGNAGE",
                  "★",
                  "WINDOW GRAPHICS",
                  "★",
                  "BANNERS",
                  "★",
                ].map((t, i) => (
                  <span
                    key={i}
                    className={t === "★" ? "text-mnz-yellow" : "text-bone"}
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK BENTO */}
      <section id="work" className="relative px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                / Selected Work
              </div>
              <h2 className="mt-3 font-display text-5xl leading-[0.9] text-ink md:text-7xl">
                Built to be <span className="text-mnz-blue">unmissable</span>.
              </h2>
            </div>
            <p className="max-w-md text-base text-ink/70">
              From quiet monument plates to skyline-scale LED, every project leaves the
              workshop with the same standard of craft.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[260px]">
            {products.map((p, i) => (
              <article
                key={p.name}
                className={`group relative overflow-hidden rounded-3xl bg-card shadow-lg transition-all hover:shadow-2xl ${p.span}`}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div
                  className="absolute right-4 top-4 h-3 w-3 rounded-full"
                  style={{ background: p.accent, boxShadow: `0 0 24px ${p.accent}` }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-bone/60">
                    {String(i + 1).padStart(2, "0")} / Product
                  </div>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    <h3 className="font-display text-2xl text-bone md:text-3xl">{p.name}</h3>
                    <ArrowUpRight className="h-5 w-5 text-bone transition-transform group-hover:rotate-45" />
                  </div>
                  <p className="mt-2 max-w-md text-sm text-bone/80">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MNZ */}
      <section id="why" className="relative overflow-hidden bg-ink py-24 text-bone md:py-32">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <CornerBlocks corner="tr" size={320} />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="text-xs uppercase tracking-[0.25em] text-bone/50">
            / Why MNZ
          </div>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-[0.9] md:text-7xl">
            Craft you can <span className="text-mnz-yellow">trust</span>,
            built to <span className="font-italic font-normal">last</span>.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-bone/10 md:grid-cols-4">
            {why.map((w) => (
              <div
                key={w.title}
                className="group relative bg-ink p-8 transition-colors hover:bg-bone/[0.03]"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: w.color }}
                >
                  <w.icon className="h-6 w-6 text-ink" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-bone">{w.title}</h3>
                <p className="mt-3 text-sm text-bone/65">{w.body}</p>
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: w.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS + CRAFT IMAGE */}
      <section id="process" className="relative px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-2 md:gap-20">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={craftImg}
                alt="A craftsman building illuminated channel letters in the MNZ workshop"
                loading="lazy"
                className="h-full w-full object-cover"
                width={1600}
                height={1100}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-mnz-yellow p-5 shadow-xl md:block">
              <div className="font-display text-3xl text-ink leading-none">15</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-ink/70">
                Years in the workshop
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              / The Process
            </div>
            <h2 className="mt-3 font-display text-5xl leading-[0.9] text-ink md:text-6xl">
              From sketch to <span className="text-mnz-red">switch-on</span>.
            </h2>
            <p className="mt-5 max-w-lg text-base text-ink/70">
              One team, one workshop, one timeline. We own the whole chain so nothing
              gets lost in translation.
            </p>

            <ol className="mt-12 space-y-2">
              {process.map((p) => (
                <li
                  key={p.step}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-border py-6 transition-colors hover:bg-muted/40"
                >
                  <div className="font-display text-2xl text-ink/30 group-hover:text-mnz-red transition-colors">
                    {p.step}
                  </div>
                  <div>
                    <div className="font-display text-2xl text-ink">{p.title}</div>
                    <div className="mt-1 text-sm text-ink/60">{p.body}</div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-ink/30 transition-all group-hover:rotate-45 group-hover:text-ink" />
                </li>
              ))}
              <li className="border-t border-border" />
            </ol>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="relative bg-bone px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                / Real People, Real Reviews
              </div>
              <h2 className="mt-3 font-display text-5xl leading-[0.9] text-ink md:text-7xl">
                Loved by the <span className="text-mnz-green">brands</span>
                <br />we light up.
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-mnz-yellow text-mnz-yellow" />
              ))}
              <span className="ml-2 text-sm font-medium text-ink/70">4.9/5 · Google verified</span>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r, i) => (
              <figure
                key={i}
                className="stack-card relative flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-md"
                style={{ ["--r" as string]: `${(i % 2 === 0 ? -1 : 1) * 1.2}deg` }}
              >
                <div
                  className="absolute -top-3 left-7 h-6 w-6 rounded-md"
                  style={{ background: r.color, transform: "rotate(12deg)" }}
                />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-mnz-yellow text-mnz-yellow" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/85">
                  "{r.quote}"
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-display text-sm text-ink">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BIG CTA / CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-mnz-red px-5 py-24 text-bone md:px-10 md:py-32">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-[0.25em] text-bone/70">
              / Ready when you are
            </div>
            <h2 className="mt-3 font-display text-6xl leading-[0.85] md:text-[8rem]">
              Let's amplify
              <br />
              your <span className="font-italic font-normal">vision</span>.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-bone/85">
              Free estimate. Honest timelines. A sign that earns every glance.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+13468376523"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-bone transition-transform hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                +1 (346) 837 6523
              </a>
              <a
                href="mailto:info@mnzsigns.com"
                className="group inline-flex items-center gap-3 rounded-full border border-bone/30 bg-transparent px-7 py-4 text-sm font-semibold text-bone transition-colors hover:bg-bone hover:text-mnz-red"
              >
                <Mail className="h-4 w-4" />
                info@mnzsigns.com
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl bg-bone p-7 text-ink shadow-2xl md:p-9">
              <div className="flex items-center gap-3">
                <MnzMark size={42} />
                <div>
                  <div className="font-display text-base">Request a free estimate</div>
                  <div className="text-xs text-muted-foreground">We respond within 1 business day.</div>
                </div>
              </div>

              <form
                className="mt-6 grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const subject = encodeURIComponent("Estimate request — MNZ Signs");
                  const body = encodeURIComponent(
                    `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nPhone: ${data.get("phone")}\nProject: ${data.get("project")}\n\n${data.get("message")}`,
                  );
                  window.location.href = `mailto:info@mnzsigns.com?subject=${subject}&body=${body}`;
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="rounded-xl border border-border bg-bone px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                  <input
                    name="company"
                    placeholder="Company"
                    className="rounded-xl border border-border bg-bone px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                </div>
                <input
                  name="phone"
                  required
                  placeholder="Phone or email"
                  className="rounded-xl border border-border bg-bone px-4 py-3 text-sm outline-none focus:border-ink"
                />
                <select
                  name="project"
                  className="rounded-xl border border-border bg-bone px-4 py-3 text-sm outline-none focus:border-ink"
                  defaultValue=""
                >
                  <option value="" disabled>Project type…</option>
                  <option>Channel Letters</option>
                  <option>Pylon Sign</option>
                  <option>Monument Sign</option>
                  <option>Window Graphics</option>
                  <option>LED Display</option>
                  <option>Banner / Print</option>
                  <option>Other</option>
                </select>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project…"
                  className="rounded-xl border border-border bg-bone px-4 py-3 text-sm outline-none focus:border-ink"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-bone transition-colors hover:bg-mnz-red"
                >
                  Send request
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </button>

                <ul className="mt-2 grid grid-cols-2 gap-2 text-xs text-ink/70">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-mnz-green" /> Free estimate</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-mnz-green" /> 5-yr warranty</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-mnz-green" /> In-house design</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-mnz-green" /> UL-listed</li>
                </ul>
              </form>
            </div>

            <div className="mt-6 flex items-start gap-3 text-sm text-bone/85">
              <MapPin className="mt-0.5 h-4 w-4 text-bone" />
              17505 Telge Rd, Cypress, TX 77429
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
