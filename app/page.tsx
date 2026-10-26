"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown, ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Heart,
  MapPin, Menu, Music2, Sparkles, X
} from "lucide-react";

const WEDDING_DATE = new Date("2026-12-04T17:00:00+05:30");
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Saffron+Wadduwa+Sri+Lanka";

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const remaining = Math.max(0, WEDDING_DATE.getTime() - (now ?? Date.now()));
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000),
    passed: remaining <= 0,
  };
}

function SectionHeading({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="eyebrow">{kicker}</p>
      <div className="gold-rule" />
      <h2 className="display-font text-4xl leading-tight sm:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#80766b] sm:text-base">{subtitle}</p>}
    </div>
  );
}

function Envelope({ onOpen }: { onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className="envelope-scene w-full px-5" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
      <motion.button
        type="button"
        aria-label="Open the wedding invitation"
        className="envelope block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a66a] focus-visible:ring-offset-4"
        onClick={onOpen}
        whileHover={reduceMotion ? undefined : { y: -5, rotateX: 2 }}
        whileTap={{ scale: .98 }}
      >
        <div className="envelope-back" />
        <div className="envelope-letter">
          <div className="text-center">
            <div className="eyebrow mb-3">Together with our families</div>
            <div className="display-font text-3xl text-[#a7864e]">S <span className="italic">&</span> A</div>
            <div className="mt-3 text-[9px] uppercase tracking-[.3em] text-[#887a64]">A day to remember</div>
          </div>
        </div>
        <motion.div className="envelope-flap" animate={{ rotateX: 0 }} />
        <div className="envelope-pocket" />
        <div className="seal"><Heart size={19} strokeWidth={1.3} /></div>
      </motion.button>
      <motion.p className="mt-8 text-center text-[10px] uppercase tracking-[.28em] text-[#8e7957]" animate={reduceMotion ? undefined : { opacity: [.55, 1, .55] }} transition={{ duration: 2.8, repeat: Infinity }}>
        Tap the seal to open your invitation
      </motion.p>
    </motion.div>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sent">("idle");
  const [attendance, setAttendance] = useState("yes");
  const [guestCount, setGuestCount] = useState("2");
  const [guestName, setGuestName] = useState("");
  const [dietary, setDietary] = useState("");
  const countdown = useCountdown();
  const reduceMotion = useReducedMotion();

  const eventDate = useMemo(() => new Intl.DateTimeFormat("en-LK", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Colombo"
  }).format(WEDDING_DATE), []);

  const reveal = () => {
    setOpened(true);
    window.setTimeout(() => document.getElementById("invitation")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }), 220);
  };

  const submitRsvp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Prototype only: connect this handler to a validated server endpoint and database before launch.
    setRsvpStatus("sent");
  };

  const navItems = [
    ["Our Story", "#story"], ["The Day", "#the-day"], ["RSVP", "#rsvp"]
  ];

  return (
    <main className="overflow-hidden">
      <AnimatePresence>
        {!opened && (
          <motion.section
            key="cover"
            className="hero-glow soft-grid relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.025, filter: "blur(5px)" }}
            transition={{ duration: reduceMotion ? .01 : .7 }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[8%] top-[18%] h-1 w-1 rounded-full bg-[#c6a66a]/70" />
              <div className="absolute right-[14%] top-[27%] h-1.5 w-1.5 rounded-full bg-[#c6a66a]/60" />
              <div className="absolute bottom-[20%] left-[20%] h-1 w-1 rounded-full bg-[#c6a66a]/60" />
              <div className="absolute bottom-[25%] right-[17%] h-1 w-1 rounded-full bg-[#c6a66a]/70" />
              <div className="absolute inset-x-8 top-8 bottom-8 border border-[#c6a66a]/20 sm:inset-x-12 sm:top-12 sm:bottom-12" />
              <div className="absolute inset-x-10 top-10 bottom-10 border border-[#c6a66a]/10 sm:inset-x-14 sm:top-14 sm:bottom-14" />
            </div>
            <motion.div className="relative z-10 mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .7 }}>
              <p className="eyebrow">A celebration of love</p>
              <div className="gold-rule" />
              <h1 className="display-font text-4xl leading-tight sm:text-6xl">A fairytale<br/><span className="italic text-[#a7864e]">begins here</span></h1>
            </motion.div>
            <div className="relative z-10 w-full max-w-sm">
              <Envelope onOpen={reveal} />
            </div>
            <motion.div className="relative z-10 mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}>
              <p className="display-font text-2xl">Shashitha <span className="italic text-[#a7864e]">&</span> Ashani</p>
              <p className="mt-2 text-[10px] uppercase tracking-[.25em] text-[#80766b]">04 · 12 · 2026 · Wadduwa, Sri Lanka</p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <div id="invitation" className={opened ? "block" : "hidden"}>
        <header className="nav-glass sticky top-0 z-40">
          <div className="section-shell flex h-[68px] items-center justify-between">
            <a href="#home" className="display-font text-xl text-[#8d6e3d]" aria-label="Back to top">S <span className="italic">&</span> A</a>
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map(([label, href]) => <a key={href} className="text-xs tracking-wide text-[#65594c] transition hover:text-[#9a7740]" href={href}>{label}</a>)}
              <a href="#rsvp" className="btn-gold text-xs">Respond to invitation</a>
            </nav>
            <button className="p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
              {menuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && <motion.nav className="border-t border-[#c6a66a]/20 bg-[#f8f4ec] px-5 py-4 md:hidden" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              {navItems.map(([label, href]) => <a onClick={() => setMenuOpen(false)} key={href} className="block py-3 text-sm" href={href}>{label}</a>)}
              <a onClick={() => setMenuOpen(false)} className="mt-2 block py-3 text-sm text-[#8d6e3d]" href="#rsvp">Respond to invitation →</a>
            </motion.nav>}
          </AnimatePresence>
        </header>

        <section id="home" className="hero-glow relative px-5 py-24 text-center sm:py-36">
          <div className="pointer-events-none absolute inset-5 border border-[#c6a66a]/20 sm:inset-10" />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="relative mx-auto max-w-4xl">
            <p className="eyebrow">With love and the blessings of our families</p>
            <div className="gold-rule"/>
            <p className="display-font mb-4 text-xl italic text-[#927343] sm:text-2xl">Together with joy, we invite you to celebrate</p>
            <h1 className="display-font text-5xl leading-[1.08] sm:text-7xl md:text-8xl">Shashitha <span className="block py-2 text-4xl italic text-[#b18c4f] sm:text-6xl">&</span> Ashani</h1>
            <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-[#80766b] sm:text-base">Two hearts, one beautiful beginning. Join us as we begin our forever with a traditional Kandyan celebration beneath the evening sky.</p>
            <div className="gold-rule"/>
            <p className="display-font text-2xl sm:text-3xl">04 December 2026</p>
            <p className="mt-2 text-xs uppercase tracking-[.25em] text-[#927343]">Saffron · Wadduwa · Sri Lanka</p>
            <a href="#the-day" className="btn-outline mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[.13em]">Discover the day <ArrowDown size={14}/></a>
          </motion.div>
        </section>

        <section id="story" className="section-shell section-pad">
          <SectionHeading kicker="A little about us" title="Our story, still unfolding" subtitle="Every beautiful forever begins with a story. Here are a few chapters from ours."/>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <motion.div className="photo-placeholder min-h-[390px] sm:min-h-[500px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7 }}>
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <div className="border border-white/50 p-8 text-white sm:p-12">
                  <Sparkles className="mx-auto mb-4" size={22} strokeWidth={1.2}/>
                  <p className="display-font text-3xl italic">Our favourite<br/>chapter</p>
                  <p className="mt-4 text-[9px] uppercase tracking-[.25em]">Replace with your photo</p>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 z-10 text-xs uppercase tracking-[.2em] text-white">Shashitha & Ashani</div>
            </motion.div>
            <div className="py-4 md:py-10">
              <p className="eyebrow">Chapter one · How it began</p>
              <h3 className="display-font mt-4 text-3xl leading-snug sm:text-4xl">Some stories feel like they were written in the stars.</h3>
              <p className="mt-5 text-sm leading-8 text-[#80766b]">From the first conversation to all the little moments that brought us here, our journey has become our favourite story. Now, we can’t wait to begin the next chapter with the people who mean the most to us.</p>
              <div className="my-7 h-px w-16 bg-[#c6a66a]"/>
              <div className="space-y-5">
                <div className="flex gap-4"><span className="display-font text-xl italic text-[#a7864e]">I.</span><div><p className="display-font text-xl">The beginning</p><p className="mt-1 text-sm leading-6 text-[#80766b]">Add a few lines about how you first met.</p></div></div>
                <div className="flex gap-4"><span className="display-font text-xl italic text-[#a7864e]">II.</span><div><p className="display-font text-xl">A thousand little moments</p><p className="mt-1 text-sm leading-6 text-[#80766b]">Share a memory, a milestone, or the proposal story.</p></div></div>
                <div className="flex gap-4"><span className="display-font text-xl italic text-[#a7864e]">III.</span><div><p className="display-font text-xl">Our forever begins</p><p className="mt-1 text-sm leading-6 text-[#80766b]">The next chapter begins on 4 December 2026.</p></div></div>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {["A moment to keep", "Golden hour", "Our next chapter"].map((label, i) => (
              <motion.div key={label} className={`photo-placeholder flex aspect-[4/5] items-end p-4 ${i === 1 ? "md:mt-8" : ""}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12 }}>
                <div className="relative z-10 border-l border-white/70 pl-3 text-white"><p className="display-font text-lg italic">{label}</p><p className="mt-1 text-[8px] uppercase tracking-[.2em]">Photo placeholder</p></div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#3a302a] px-5 py-20 text-center text-[#fbf5e9] sm:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 50% 0%, #b99b64 0%, transparent 55%)" }}/>
          <div className="relative mx-auto max-w-3xl">
            <p className="eyebrow !text-[#dfc58e]">Until we say “I do”</p>
            <div className="gold-rule"/>
            <h2 className="display-font text-4xl sm:text-5xl">The countdown to forever</h2>
            <p className="mt-4 text-sm text-[#d8cbbb]">The evening we have been dreaming of is getting closer.</p>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-4 gap-2 sm:gap-5">
              {[
                ["Days", countdown.days], ["Hours", countdown.hours], ["Minutes", countdown.minutes], ["Seconds", countdown.seconds]
              ].map(([label, value]) => (
                <div key={String(label)} className="border border-[#c6a66a]/40 bg-white/[.035] px-1 py-5 sm:px-4 sm:py-7">
                  <div className="display-font text-3xl tabular-nums sm:text-5xl">{String(value).padStart(2, "0")}</div>
                  <div className="mt-3 text-[8px] uppercase tracking-[.18em] text-[#dfc58e] sm:text-[10px]">{label}</div>
                </div>
              ))}
            </div>
            <p className="mt-7 text-xs text-[#d8cbbb]">{countdown.passed ? "The celebration has begun. Thank you for being part of our story." : "Friday, 4 December 2026 · Sri Lanka time"}</p>
          </div>
        </section>

        <section id="the-day" className="section-shell section-pad">
          <SectionHeading kicker="Save the date" title="A day made of moments" subtitle="From the golden glow of sunset to a night of celebration, we would love to share this day with you."/>
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            <motion.article className="paper-card p-7 sm:p-9" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="mb-6 flex items-center justify-between"><span className="eyebrow">01 · The ceremony</span><Sparkles size={20} className="text-[#b18c4f]" strokeWidth={1.2}/></div>
              <p className="display-font text-3xl">The Poruwa</p>
              <p className="mt-3 text-sm leading-7 text-[#80766b]">A traditional Kandyan ceremony outdoors, as the sky turns to gold and the first evening lights begin to glow.</p>
              <div className="mt-7 space-y-3 border-t border-[#c6a66a]/25 pt-5 text-sm">
                <div className="flex gap-3"><Clock3 size={16} className="mt-0.5 text-[#a7864e]"/><span>Time to be confirmed</span></div>
                <div className="flex gap-3"><MapPin size={16} className="mt-0.5 text-[#a7864e]"/><span>Saffron, Wadduwa</span></div>
              </div>
            </motion.article>
            <motion.article className="paper-card p-7 sm:p-9" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}>
              <div className="mb-6 flex items-center justify-between"><span className="eyebrow">02 · The celebration</span><Heart size={20} className="text-[#b18c4f]" strokeWidth={1.2}/></div>
              <p className="display-font text-3xl">Dinner & Reception</p>
              <p className="mt-3 text-sm leading-7 text-[#80766b]">An evening of warm candlelight, white and champagne-gold details, good food, and the people we love most.</p>
              <div className="mt-7 space-y-3 border-t border-[#c6a66a]/25 pt-5 text-sm">
                <div className="flex gap-3"><Clock3 size={16} className="mt-0.5 text-[#a7864e]"/><span>Schedule to be confirmed</span></div>
                <div className="flex gap-3"><MapPin size={16} className="mt-0.5 text-[#a7864e]"/><span>Saffron, Wadduwa</span></div>
              </div>
            </motion.article>
          </div>
          <div className="mx-auto mt-8 max-w-4xl border border-[#c6a66a]/25 bg-[#f2eadc]/55 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div><p className="display-font text-xl">Saffron, Wadduwa</p><p className="mt-1 text-sm text-[#80766b]">Exact venue pin and event timings will be added before invitations are sent.</p></div>
            <a className="btn-outline mt-4 inline-flex shrink-0 items-center gap-2 text-xs sm:mt-0" href={MAPS_URL} target="_blank" rel="noreferrer">Open Google Maps <ArrowRight size={14}/></a>
          </div>
          <div className="mt-5 text-center">
            <a className="inline-flex items-center gap-2 text-xs text-[#8d6e3d] underline decoration-[#c6a66a]/50 underline-offset-4" href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Shashitha & Ashani — Wedding")}&dates=20261204T113000Z/20261204T160000Z&details=${encodeURIComponent("Wedding celebration at Saffron, Wadduwa, Sri Lanka.")}&location=${encodeURIComponent("Saffron, Wadduwa, Sri Lanka")}`} target="_blank" rel="noreferrer><CalendarDays size={14}/> Add date to Google Calendar</a>
          </div>
        </section>

        <section id="rsvp" className="bg-[#eee5d6] px-5 py-20 sm:py-28">
          <div className="section-shell">
            <SectionHeading kicker="Kindly reply" title="Will you join our celebration?" subtitle="Your presence would mean the world to us. Please let us know if you can celebrate with us."/>
            <div className="paper-card mx-auto max-w-2xl p-6 sm:p-10">
              {rsvpStatus === "sent" ? (
                <motion.div className="py-8 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#c6a66a] text-[#9a7740]"><Check size={24}/></div>
                  <h3 className="display-font mt-6 text-3xl">Thank you{guestName ? `, ${guestName}` : ""}.</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#80766b]">Your response has been previewed successfully. This prototype does not yet save responses; the secure RSVP backend will be connected in the next phase.</p>
                  <button className="btn-outline mt-6 text-xs" onClick={() => setRsvpStatus("idle")}>Edit response</button>
                </motion.div>
              ) : (
                <form onSubmit={submitRsvp} className="space-y-5">
                  <div><label htmlFor="guestName" className="mb-2 block text-xs tracking-wide">Your name</label><input id="guestName" className="input-luxe" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Name on your invitation" required /></div>
                  <fieldset><legend className="mb-3 text-xs tracking-wide">Will you be joining us?</legend><div className="grid grid-cols-2 gap-3">
                    <label className={`flex cursor-pointer items-center gap-3 border p-4 text-sm ${attendance === "yes" ? "border-[#b18c4f] bg-[#f6efdf]" : "border-[#e1d5c1] bg-white/50"}`}><input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={e => setAttendance(e.target.value)}/> Joyfully accepts</label>
                    <label className={`flex cursor-pointer items-center gap-3 border p-4 text-sm ${attendance === "no" ? "border-[#b18c4f] bg-[#f6efdf]" : "border-[#e1d5c1] bg-white/50"}`}><input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={e => setAttendance(e.target.value)}/> Regretfully declines</label>
                  </div></fieldset>
                  {attendance === "yes" && <div><label htmlFor="guestCount" className="mb-2 block text-xs tracking-wide">Number attending (including you)</label><select id="guestCount" className="input-luxe" value={guestCount} onChange={e => setGuestCount(e.target.value)}><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option></select><p className="mt-2 text-[11px] text-[#8c8173]">Prototype only: final guest choices will be limited by your personal invitation.</p></div>}
                  {attendance === "yes" && <div><label htmlFor="dietary" className="mb-2 block text-xs tracking-wide">Dietary requirements <span className="text-[#8c8173]">(optional)</span></label><textarea id="dietary" className="input-luxe min-h-24 resize-y" value={dietary} onChange={e => setDietary(e.target.value)} placeholder="Anything our hosts should know?"/></div>}
                  <button className="btn-gold flex w-full items-center justify-center gap-2 text-xs uppercase tracking-[.16em]" type="submit">Send my response <ArrowRight size={14}/></button>
                  <p className="text-center text-[10px] leading-5 text-[#8c8173]">Private invitation access and secure response storage will be enabled before launch.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="section-shell section-pad">
          <SectionHeading kicker="A little keepsake" title="And the story continues" subtitle="After the celebration, this space will become a gallery of the moments we’ll cherish forever."/>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {["The ceremony", "The celebrations", "The little moments"].map((label, i) => <div key={label} className={`photo-placeholder flex aspect-[4/5] items-end p-4 ${i === 1 ? "md:mt-8" : ""}`}><div className="relative z-10 border-l border-white/70 pl-3 text-white"><p className="display-font text-xl italic">{label}</p><p className="mt-1 text-[8px] uppercase tracking-[.2em]">Gallery coming after the wedding</p></div></div>)}
          </div>
        </section>

        <footer className="bg-[#352c28] px-5 py-16 text-center text-[#fbf5e9]">
          <div className="ornament">✧ · ✧ · ✧</div>
          <p className="display-font mt-5 text-4xl">Shashitha <span className="italic text-[#dfc58e]">&</span> Ashani</p>
          <p className="mt-4 text-[10px] uppercase tracking-[.24em] text-[#dfcdb0]">04 December 2026 · Wadduwa, Sri Lanka</p>
          <div className="gold-rule"/>
          <p className="display-font text-xl italic text-[#e9dcc3]">With love, always.</p>
          <button className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[#dfc58e]" onClick={() => { setOpened(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Return to the invitation <ChevronDown className="rotate-180" size={14}/></button>
        </footer>
      </div>
    </main>
  );
}
