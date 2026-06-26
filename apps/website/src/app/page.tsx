"use client";

import {
  IconBrandDiscord,
  IconBolt,
  IconSettings,
  IconUsers,
  IconRobot,
  IconArrowRight,
  IconStar,
  IconMessage,
  IconCheck,
  IconX,
  IconInfoCircle,
} from "@tabler/icons-react";

const faqs = [
  {
    q: "What if I don't like the result?",
    a: "Use /edit-server to make targeted changes, or just run /configure-server again with a better description. No limits.",
  },
  {
    q: "Do I need coding skills?",
    a: "No. Everything works in plain English. Describe what you want, and Discly builds it.",
  },
  {
    q: "Do I need Discord skills?",
    a: "No. Discly handles the technical side — permissions, role hierarchy, channel structure. You just describe your community. Discly translates that into correct, safe Discord configurations automatically.",
  },
  {
    q: "Does it work on existing servers?",
    a: "Yes. /edit-server makes targeted changes — add channels, tweak roles, fix permissions. No wipe required.",
  },
  {
    q: "What's a credit?",
    a: "Each AI config request costs credits based on actual token usage. BASIC gives you 500 tokens per credit, COMPLETE gives you 2x more (1000 tokens per credit) — so your credits last longer. You can buy more credits in your dashboard starting at ~$2 whenever you need.",
  },
  {
    q: "Can I use Discly on multiple servers?",
    a: "Yes. Use Discly on as many servers as you want. There's no server limit at all.",
  },
];

function TestimonialCard({
  initials,
  name,
  role,
  quote,
}: {
  initials: string;
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <div className="card bg-base-100 border border-base-300/30">
      <div className="card-body">
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, si) => (
            <IconStar
              key={si}
              size={14}
              className="text-warning fill-current"
            />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-base-content/80">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="mt-5 pt-4 border-t border-base-300/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-base-content/50">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreditTooltip() {
  return (
    <div
      className="tooltip tooltip-bottom before:max-w-[220px] before:text-xs before:leading-relaxed"
      data-tip="Each AI request burns credits based on token usage. BASIC: 500 tokens per credit. COMPLETE: 1000 tokens per credit — half the burn rate. Buy more in your dashboard from ~$2."
    >
      <IconInfoCircle
        size={14}
        className="text-primary cursor-pointer shrink-0"
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <nav className="flex items-center sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300/50 min-h-16 px-4">
        <div className="max-w-[1080px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Discly" className="h-7 w-7" />
            <span className="text-xl font-bold tracking-tight">Discly</span>
          </div>
          <div className="flex items-center gap-2">
            <a className="btn btn-ghost btn-sm hidden sm:inline-flex">
              Sign In
            </a>
            <a className="btn btn-primary btn-sm">Build My Server</a>
          </div>
        </div>
      </nav>

      <section className="min-h-[80dvh] flex items-center pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge badge-primary badge-outline mb-6">
              <IconBrandDiscord size={14} className="mr-1.5" />
              Join 1,200+ server owners
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-none font-bold">
              Your Discord server,{" "}
              <span className="text-primary">ready in 30 seconds</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 leading-relaxed mt-6 max-w-[50ch] mx-auto">
              Discly uses AI to build roles, channels, and permissions from a
              simple description. No setup. No manual clicking.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a className="btn btn-primary btn-lg gap-2">
                Build My Server
                <IconArrowRight size={18} />
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 mt-10">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="-mr-3 last:mr-0 relative"
                    style={{ zIndex: 5 - i }}
                  >
                    <img
                      src="https://i.pravatar.cc/40?u=discly"
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-base-100"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <IconStar
                      key={si}
                      size={14}
                      className="text-warning fill-current"
                    />
                  ))}
                </div>
                <p className="text-sm">
                  <span className="font-bold">1,200+</span> servers shipped
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-base-200/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.18em] text-base-content/40 font-semibold">
              The Reality
            </span>
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-none font-bold mt-3">
              Setting up a Discord server is{" "}
              <span className="underline decoration-wavy decoration-red-500/60 underline-offset-4">a 2-hour chore</span>
            </h2>
            <p className="text-base text-base-content/60 mt-4">
              Here&apos;s what building by hand really looks like:
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "15 min creating roles one by one",
                "10 min figuring out permission hierarchy",
                "25 min organizing channels into categories",
                "20 min setting up channel-specific permissions",
                "10 min googling \"how to make a private channel\"",
                "40 min tweaking because something broke",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <IconX size={18} className="text-error shrink-0 mt-0.5" />
                  <span className="text-base-content/70">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-base-300/50 rounded-box border border-base-300/40">
              <p className="text-lg font-bold">
                TL;DR = 2+ hours. For every server you build.
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto mt-12">
            <TestimonialCard
              initials="DK"
              name="David Kim"
              role="Community Manager, DevSpace"
              quote="Setting up a Discord server always felt like a part-time job. I would dread onboarding new clients because I knew I'd spend hours on server setup. Discly changed that completely."
            />
          </div>

        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
              There&apos;s a better way
            </span>
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-none font-bold mt-3">
              Describe your server in plain English.
              <br />
              Discly does the rest.
            </h2>
            <div className="mt-8 p-6 bg-base-200/80 rounded-box border border-base-300/40 text-left">
              <p className="text-sm text-base-content/40 mb-2">You type:</p>
              <p className="text-base font-medium italic">
                &quot;A gaming server with a trading hub, mod channels, VIP
                roles with priority access, and a private admin area.&quot;
              </p>
              <div className="divider my-4" />
              <p className="text-sm text-base-content/40 mb-2">
                Discly builds:
              </p>
              <ul className="space-y-1.5 text-sm">
                {[
                  "Roles: Admin, Mod, VIP, Member, Guest — with correct permissions",
                  "Categories: General, Trading Hub, Moderation, Admin",
                  "Channels: 12 text + 4 voice channels, properly organized",
                  "Permissions: All channel-level overwrites configured",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <IconCheck
                      size={16}
                      className="text-success shrink-0 mt-0.5"
                    />
                    <span className="text-base-content/70">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-base-content/70 mt-4 border-t border-base-300/30 pt-4">
                All this, in under a minute. You can just invite people to your server now.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <a className="btn btn-primary btn-lg gap-2">
              Stop Wasting Hours
              <IconArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-base-200/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
              See It in Action
            </span>
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-none font-bold mt-3">
              Watch AI build a server from a single sentence
            </h2>
            <p className="text-base text-base-content/60 max-w-[55ch] mx-auto mt-4">
              Roles, channels, categories, permissions — all configured in
              under 30 seconds. See how easy it really is.
            </p>
            <div className="mt-10 mx-auto max-w-2xl aspect-video rounded-box overflow-hidden border border-base-300/40 bg-base-300">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/PLACEHOLDER"
                title="Discly demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex justify-center mt-10">
              <a className="btn btn-primary btn-lg gap-2">
                Configure With AI
                <IconArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-none font-bold mt-3">
              Three steps to a ready server
            </h2>
            <p className="text-base text-base-content/60 max-w-[60ch] mx-auto mt-4">
              No setup required. Just connect Discord, tell Discly what you
              need, and watch it build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <IconBrandDiscord size={24} />,
                title: "Connect Discly",
                desc: "Authorize with one click. No config files, no setup.",
              },
              {
                icon: <IconMessage size={24} />,
                title: "Describe your community",
                desc: "Tell Discly what you need in plain language. Roles, channels, permissions. Or just your server's purpose.",
              },
              {
                icon: <IconBolt size={24} />,
                title: "Deploy instantly",
                desc: "Discly builds everything in under 60 seconds. Your server is ready.",
              },
            ].map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-box bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                  {step.icon}
                </div>
                <div className="badge badge-sm badge-ghost mb-3">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-base-content/60 mt-2 leading-relaxed max-w-[40ch] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto mt-16">
            <TestimonialCard
              initials="AK"
              name="Alex Kowalski"
              role="Twitch Partner"
              quote="My Discord was a mess before Discly. The AI figured out the exact role structure I needed based on my stream setup. Unbelievably easy."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-base-200/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
              What You Get
            </span>
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-none font-bold mt-3">
              Everything your server needs
            </h2>
            <p className="text-base text-base-content/60 max-w-[60ch] mx-auto mt-4">
              Discly handles the tedious parts so you can focus on your
              community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: <IconRobot size={20} />,
                title: "AI Role Setup",
                desc: "Describe your team structure. Discly creates the hierarchy with correct colors and permissions.",
              },
              {
                icon: <IconSettings size={20} />,
                title: "Smart Channels",
                desc: "Categories, text, and voice channels organized by purpose. No blank slate.",
              },
              {
                icon: <IconUsers size={20} />,
                title: "Permission Templates",
                desc: "Pre-built permission sets for mods, admins, members, and guests. Security out of the box.",
              },
              {
                icon: <IconBolt size={20} />,
                title: "Edit Mode",
                desc: "Already have a server? Describe what you want to change. No wipe required.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="card bg-base-100 border border-base-300/40"
              >
                <div className="card-body">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    {f.icon}
                  </div>
                  <h3 className="card-title text-base">{f.title}</h3>
                  <p className="text-sm text-base-content/60 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto mt-12">
            <TestimonialCard
              initials="SP"
              name="Samira Patel"
              role="Freelance Server Architect"
              quote="I manage servers for 12 clients. Discly cut my setup time by 80%. I can onboard a new client during a single call now."
            />
          </div>

          <div className="flex justify-center mt-10">
            <a className="btn btn-outline btn-lg gap-2">
              Launch My Community
              <IconArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
              Why I built this
            </span>
            <div className="card bg-base-100 border border-base-300/40 mt-6">
              <div className="card-body">
                <p className="text-base text-base-content/80 leading-relaxed">
                  &quot;I built 14 Discord servers by hand before I wrote the
                  first line of Discly&apos;s code. Every time, I repeated the
                  same work: creating roles, tweaking permissions, organizing
                  channels. I built Discly so I never have to do it again — and
                  neither do you.&quot;
                </p>
                <div className="mt-4 pt-4 border-t border-base-300/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    ML
                  </div>
                  <div>
                    <p className="text-sm font-medium">Marc Lou</p>
                    <p className="text-xs text-base-content/50">
                      Creator of Discly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-md mx-auto mt-8">
              <TestimonialCard
                initials="LO"
                name="Linda Okafor"
                role="Twitch Streamer"
                quote="I thought 'AI server setup' was just a gimmick. Then I tried it. Discly built a role hierarchy I wouldn't have thought of in a hundred manual attempts."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-base-200/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-none font-bold mt-3">
              Loved by community creators
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <TestimonialCard
              initials="MC"
              name="Maya Chen"
              role="Community Lead, GameVerse"
              quote="I set up a 20-channel server in under a minute. What used to take me an afternoon now takes a coffee break. Game changer for community managers."
            />
            <TestimonialCard
              initials="RP"
              name="Raj Patel"
              role="Course Creator"
              quote="The best $25 I've spent on my business. I set up a server for my students in 30 seconds and it looked better than anything I could have built in an afternoon."
            />
            <TestimonialCard
              initials="EL"
              name="Emma Larsson"
              role="Gaming Community Owner"
              quote="Freed up hours of my week. I used to spend Sunday afternoons tweaking my server. Now I spend that time actually talking to my community."
            />
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-none font-bold mt-3">
              One-time payment.
              <br />
              No monthly fees.
            </h2>
            <p className="text-base text-base-content/60 max-w-[60ch] mx-auto mt-4">
              100 credits included with every plan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="card bg-base-100 border border-base-300/40">
              <div className="card-body">
                <h3 className="card-title text-xl">BASIC</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold tracking-tight">
                    $25
                  </span>
                  <span className="text-base text-base-content/40 line-through ml-2">
                    $30
                  </span>
                </div>
                <p className="text-sm text-base-content/60">
                  one-time payment
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    {
                      label: "500 tokens per credit",
                      highlight: true,
                    },
                    {
                      label: "100 credits included",
                      highlight: false,
                    },
                    {
                      label: "AI role setup + permissions",
                      highlight: false,
                    },
                    {
                      label: "Edit mode",
                      highlight: false,
                    },
                  ].map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start gap-2 text-sm"
                    >
                      <IconCheck
                        size={16}
                        className={
                          (item.highlight ? "text-amber-400" : "text-success") +
                          " shrink-0 mt-0.5"
                        }
                      />
                      <span>{item.label}</span>
                      {item.highlight && <CreditTooltip />}
                    </li>
                  ))}
                </ul>
                <a className="btn btn-outline btn-block mt-8">Get BASIC</a>
              </div>
            </div>

            <div className="card bg-base-100 border-2 border-primary/30 relative">
              <div className="badge badge-primary absolute top-4 right-4">
                Popular
              </div>
              <div className="card-body">
                <h3 className="card-title text-xl">COMPLETE</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold tracking-tight">
                    $35
                  </span>
                </div>
                <p className="text-sm text-base-content/60">
                  one-time payment
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    {
                      label: "1000 tokens per credit",
                      highlight: true,
                    },
                    {
                      label: "100 credits included",
                      highlight: false,
                    },
                    {
                      label: "AI role setup + permissions",
                      highlight: false,
                    },
                    {
                      label: "Edit mode",
                      highlight: false,
                    },
                  ].map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start gap-2 text-sm"
                    >
                      <IconCheck
                        size={16}
                        className="text-success shrink-0 mt-0.5"
                      />
                      <span>{item.label}</span>
                      {item.highlight && <CreditTooltip />}
                    </li>
                  ))}
                </ul>
                <a className="btn btn-primary btn-block mt-8">Get Complete</a>
              </div>
            </div>
          </div>
          <p className="text-xs text-base-content/40 text-center mt-8 max-w-lg mx-auto">
            Need more credits? You can top up anytime — 100, 200, 500, or 1000
            credits available.
          </p>
        </div>
      </section>

      <section className="py-24 bg-base-200/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl tracking-tighter leading-none font-bold text-center">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 space-y-2">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="collapse collapse-arrow bg-base-100 border border-base-300/30"
                >
                  <summary className="collapse-title font-medium text-sm">
                    {faq.q}
                  </summary>
                  <div className="collapse-content">
                    <p className="text-sm text-base-content/60">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-5xl tracking-tighter leading-none font-bold">
            Join 1,200+ server owners
            <br />
            who build communities fast
          </h2>
          <p className="text-base text-base-content/70 max-w-[50ch] mx-auto mt-5">
            100 credits included with every plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a className="btn btn-primary btn-lg gap-2">
              Ship Your Server
              <IconArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-base-200 text-base-content pt-16 pb-8 px-4">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <nav className="flex flex-col gap-2">
              <h6 className="text-sm font-semibold tracking-wider uppercase text-base-content/40">
                Product
              </h6>
              <a className="link link-hover text-sm">Features</a>
              <a className="link link-hover text-sm">Pricing</a>
            </nav>
            <nav className="flex flex-col gap-2">
              <h6 className="text-sm font-semibold tracking-wider uppercase text-base-content/40">
                Resources
              </h6>
              <a className="link link-hover text-sm">Changelog</a>
            </nav>
            <nav className="flex flex-col gap-2">
              <h6 className="text-sm font-semibold tracking-wider uppercase text-base-content/40">
                Company
              </h6>
              <a className="link link-hover text-sm">About</a>
              <a className="link link-hover text-sm">Contact</a>
            </nav>
            <nav className="flex flex-col gap-2">
              <h6 className="text-sm font-semibold tracking-wider uppercase text-base-content/40">
                Legal
              </h6>
              <a className="link link-hover text-sm">Privacy</a>
              <a className="link link-hover text-sm">Terms</a>
            </nav>
          </div>
          <div className="mt-12 pt-8 border-t border-base-300/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Discly" className="h-5 w-5" />
              <span className="text-sm font-bold tracking-tight">Discly</span>
            </div>
            <p className="text-xs text-base-content/40">
              Built for Discord communities.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
