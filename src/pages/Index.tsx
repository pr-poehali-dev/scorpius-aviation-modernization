import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/28c730d4-b6e5-402e-a37e-ec397e7eee0a/files/20a3d079-5ad3-4819-a38e-678d89d88f9a.jpg";
const LOGO_IMAGE = "https://cdn.poehali.dev/projects/28c730d4-b6e5-402e-a37e-ec397e7eee0a/bucket/4a9df82a-bf9c-409f-bdd8-39b20a16f333.png";

// Palette from logo:
// BG:        hsl(20,15%,5%)   — almost black with warm brown tint
// BG-card:   hsl(20,12%,8%)
// BG-mid:    hsl(20,10%,11%)
// Border:    hsl(20,10%,16%)
// Orange:    hsl(25,90%,45%)  — logo text colour
// Orange-lt: hsl(30,95%,55%)
// Text:      hsl(30,20%,88%)
// Muted:     hsl(20,8%,50%)

const SERVICES = [
  {
    icon: "PlaneLanding",
    title: "Ground Handling",
    en: "Ground Handling",
    desc: "Full ground handling organization at any airport worldwide: aircraft meet & greet, coordination with airport services, customs and border control.",
  },
  {
    icon: "Fuel",
    title: "Refueling",
    en: "Refueling",
    desc: "Aviation fuel supply coordination for aircraft at any airport. Rapid coordination with fuel operators across the globe.",
  },
  {
    icon: "MapPin",
    title: "Permits & Slots",
    en: "Permits & Slots",
    desc: "Obtaining flight permits, airport slots, diplomatic clearances and landing permissions in restricted areas worldwide.",
  },
  {
    icon: "Hotel",
    title: "Crew Services",
    en: "Crew Services",
    desc: "Hotel bookings, transportation, visa support and rest arrangements for flight and cabin crew at any destination.",
  },
  {
    icon: "Headphones",
    title: "Flight Dispatch",
    en: "Flight Dispatch",
    desc: "Full flight support: route planning, weather briefing, NOTAMs, crew briefing and post-flight documentation.",
  },
  {
    icon: "Shield",
    title: "Security",
    en: "Security",
    desc: "Aviation security services: aircraft guarding, passenger and cargo screening, coordination with airport security authorities.",
  },
];

const STATS = [
  { value: "15+", label: "years on the market" },
  { value: "200+", label: "airports worldwide" },
  { value: "24/7", label: "support" },
  { value: "100%", label: "reliability" },
];

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#geography", label: "Geography" },
  { href: "#contact", label: "Contacts" },
];

function useIntersect(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useIntersect();
  return (
    <div ref={ref} className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="grain-overlay min-h-screen bg-[hsl(20,15%,5%)] text-[hsl(30,20%,88%)] font-sans overflow-x-hidden">

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[hsl(20,15%,4%)]/95 backdrop-blur-md border-b border-[hsl(20,10%,16%)]" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-28">
            <a href="#" className="flex items-center group">
              <img
                src={LOGO_IMAGE}
                alt="Scorpius Aviation"
                className="h-24 w-auto object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </a>

            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
              ))}
            </div>

            <div className="hidden md:block">
              <a href="#contact" className="btn-gold text-[11px]">Get in Touch</a>
            </div>

            <button className="md:hidden text-[hsl(30,20%,88%)] p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[hsl(20,15%,4%)]/98 backdrop-blur-md border-t border-[hsl(20,10%,16%)] px-6 py-6 flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link text-base" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-gold text-center text-[11px]" onClick={() => setMenuOpen(false)}>
              Get in Touch
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Scorpius Aviation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(20,15%,4%)]/92 via-[hsl(20,15%,4%)]/65 to-[hsl(20,15%,4%)]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,15%,4%)]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <div className="h-px w-12 bg-[hsl(25,90%,45%)]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(25,90%,45%)] font-light">Aviation Handler</span>
            </div>

            <h1 className="font-display text-6xl lg:text-8xl font-light leading-[0.95] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              Ground
              <br />
              <span className="text-[hsl(25,90%,45%)] italic">Handling</span>
              <br />
              Excellence
            </h1>

            <p className="text-[hsl(20,8%,60%)] font-light text-lg leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-up" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
              Ground handling and refueling organization for aircraft at any airport worldwide. 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
              <a href="#services" className="btn-gold-filled text-center">Our Services</a>
              <a href="#contact" className="btn-gold text-center">Request a Quote</a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}>
          <span className="text-[9px] tracking-[0.4em] uppercase text-[hsl(20,8%,45%)]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[hsl(25,90%,45%)]/60 to-transparent" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-[hsl(20,10%,16%)] bg-[hsl(20,12%,8%)]">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[hsl(20,10%,16%)]">
              {STATS.map((stat, i) => (
                <div key={i} className="py-10 px-8 text-center">
                  <div className="font-display text-4xl lg:text-5xl font-light text-[hsl(25,90%,45%)] mb-2">{stat.value}</div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[hsl(20,8%,50%)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-12 bg-[hsl(25,90%,45%)]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(25,90%,45%)]">About Us</span>
                </div>
                <h2 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-8">
                  Scorpius<br />
                  <span className="text-[hsl(25,90%,45%)] italic">Aviation</span>
                </h2>
                <p className="text-[hsl(20,8%,60%)] font-light leading-relaxed text-base mb-6">
                  Scorpius Aviation is a professional aviation handler with extensive experience in the international market. We specialize in ground handling and refueling services for business aviation and commercial carriers.
                </p>
                <p className="text-[hsl(20,8%,60%)] font-light leading-relaxed text-base mb-10">
                  Our team of experts ensures flawless execution of every flight — from the first contact to the completion of the journey. We operate globally, delivering comprehensive solutions for aviation operators.
                </p>
                <div className="divider-gold mb-10" />
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Business Aviation", desc: "Full-service handling for private jets and VIP aircraft" },
                    { label: "Commercial Flights", desc: "Support for scheduled and charter carriers worldwide" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="text-sm font-medium text-[hsl(30,20%,82%)] mb-1">{item.label}</div>
                      <div className="text-xs text-[hsl(20,8%,48%)] leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/5] bg-[hsl(20,12%,9%)] relative overflow-hidden">
                  <img src={HERO_IMAGE} alt="Scorpius Aviation" className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,15%,5%)] via-transparent to-transparent" />
                </div>
                <div className="absolute -top-4 -right-4 w-full h-full border border-[hsl(25,90%,45%)]/20 pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[hsl(25,90%,45%)]/40 pointer-events-none" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6 lg:px-12 bg-[hsl(20,12%,8%)]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[hsl(25,90%,45%)]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(25,90%,45%)]">Services</span>
                <div className="h-px w-12 bg-[hsl(25,90%,45%)]" />
              </div>
              <h2 className="font-display text-5xl lg:text-6xl font-light">
                Full Range of<br />
                <span className="text-[hsl(25,90%,45%)] italic">Aviation Services</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsl(20,10%,16%)]">
            {SERVICES.map((service, i) => (
              <AnimatedSection key={i}>
                <div className="bg-[hsl(20,12%,8%)] p-10 group hover:bg-[hsl(20,12%,11%)] transition-colors duration-300 h-full">
                  <div className="mb-6">
                    <div className="w-12 h-12 border border-[hsl(25,90%,45%)]/30 flex items-center justify-center group-hover:border-[hsl(25,90%,45%)] transition-colors duration-300">
                      <Icon name={service.icon} size={20} className="text-[hsl(25,90%,45%)]" />
                    </div>
                  </div>
                  <div className="text-[9px] tracking-[0.4em] uppercase text-[hsl(25,90%,45%)]/60 mb-2 font-light">{service.en}</div>
                  <h3 className="font-display text-2xl font-light text-[hsl(30,20%,88%)] mb-4">{service.title}</h3>
                  <p className="text-[hsl(20,8%,52%)] text-sm leading-relaxed font-light">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* GEOGRAPHY */}
      <section id="geography" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-12 bg-[hsl(25,90%,45%)]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(25,90%,45%)]">Geography</span>
                </div>
                <h2 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-8">
                  The World Is<br />
                  <span className="text-[hsl(25,90%,45%)] italic">Our Airport</span>
                </h2>
                <p className="text-[hsl(20,8%,60%)] font-light leading-relaxed mb-10">
                  Scorpius Aviation provides full ground handling at more than 200 airports across the globe. Wherever your flight is headed — we are already there.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { region: "Europe", airports: "80+ airports" },
                    { region: "Asia", airports: "50+ airports" },
                    { region: "Middle East", airports: "30+ airports" },
                    { region: "Africa & CIS", airports: "40+ airports" },
                  ].map((item, i) => (
                    <div key={i} className="border border-[hsl(20,10%,16%)] p-5 hover:border-[hsl(25,90%,45%)]/40 transition-colors duration-300">
                      <div className="text-xs tracking-widest uppercase text-[hsl(25,90%,45%)] mb-1">{item.region}</div>
                      <div className="text-[hsl(20,8%,52%)] text-sm font-light">{item.airports}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative bg-[hsl(20,12%,8%)] p-10 border border-[hsl(20,10%,16%)]">
                <div className="text-center mb-8">
                  <Icon name="Globe" size={80} className="text-[hsl(25,90%,45%)]/20 mx-auto" />
                </div>
                <div className="divider-gold mb-8" />
                <div className="space-y-4">
                  {[
                    "Moscow Hub (SVO, DME, VKO)",
                    "Istanbul (IST, SAW)",
                    "Dubai (DXB, DWC)",
                    "London (LHR, LCY, LTN)",
                    "Geneva (GVA)",
                    "Singapore (SIN)",
                  ].map((airport, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[hsl(20,8%,57%)] font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(25,90%,45%)] flex-shrink-0" />
                      {airport}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[hsl(25,90%,45%)]/60">and 190+ more destinations</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-32 px-6 lg:px-12 bg-[hsl(20,12%,8%)]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[hsl(25,90%,45%)]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(25,90%,45%)]">Why Us</span>
                <div className="h-px w-12 bg-[hsl(25,90%,45%)]" />
              </div>
              <h2 className="font-display text-5xl lg:text-6xl font-light">
                Why Choose<br />
                <span className="text-[hsl(25,90%,45%)] italic">Scorpius</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "Clock", title: "24/7 Support", desc: "Our team is available around the clock to handle any request or emergency." },
              { icon: "Award", title: "Expertise", desc: "15+ years of experience in the international aviation industry." },
              { icon: "Zap", title: "Speed", desc: "Rapid response and instant confirmation of services at any airport." },
              { icon: "Users", title: "Personal Approach", desc: "A dedicated account manager for every client and every flight." },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="text-center group">
                  <div className="w-16 h-16 border border-[hsl(25,90%,45%)]/30 flex items-center justify-center mx-auto mb-6 group-hover:border-[hsl(25,90%,45%)] transition-colors duration-300">
                    <Icon name={item.icon} size={24} className="text-[hsl(25,90%,45%)]" />
                  </div>
                  <h3 className="font-display text-xl font-light mb-3 text-[hsl(30,20%,85%)]">{item.title}</h3>
                  <p className="text-[hsl(20,8%,48%)] text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(20,70%,25%)]/20 via-[hsl(25,80%,20%)]/10 to-transparent" />
        <div className="absolute inset-0 border-y border-[hsl(25,90%,45%)]/10" />
        <AnimatedSection>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <h2 className="font-display text-5xl lg:text-6xl font-light mb-6">
              Ready for Your Next <span className="text-[hsl(25,90%,45%)] italic">Flight?</span>
            </h2>
            <p className="text-[hsl(20,8%,55%)] font-light mb-10 text-lg">
              Contact us now — our team will prepare a personalised proposal within the hour.
            </p>
            <a href="#contact" className="btn-gold-filled inline-block">Request a Quote</a>
          </div>
        </AnimatedSection>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 lg:px-12 bg-[hsl(20,12%,8%)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <AnimatedSection>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-12 bg-[hsl(25,90%,45%)]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(25,90%,45%)]">Contact Us</span>
                </div>
                <h2 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-10">
                  Get in<br />
                  <span className="text-[hsl(25,90%,45%)] italic">Touch</span>
                </h2>
                <div className="space-y-8">
                  {[
                    { icon: "Phone", label: "Phone", value: "+7 (495) 000-00-00", sub: "24/7 operations center" },
                    { icon: "Mail", label: "Email", value: "ops@scorpius-aviation.com", sub: "We respond within one hour" },
                    { icon: "MessageCircle", label: "Telegram", value: "@scorpius_avia", sub: "Fast contact with our team" },
                  ].map((contact, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <div className="w-12 h-12 border border-[hsl(25,90%,45%)]/30 flex items-center justify-center flex-shrink-0">
                        <Icon name={contact.icon} size={18} className="text-[hsl(25,90%,45%)]" />
                      </div>
                      <div>
                        <div className="text-[9px] tracking-[0.35em] uppercase text-[hsl(25,90%,45%)]/60 mb-1">{contact.label}</div>
                        <div className="text-[hsl(30,20%,82%)] font-light">{contact.value}</div>
                        <div className="text-[hsl(20,8%,48%)] text-xs mt-0.5 font-light">{contact.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-[hsl(20,15%,5%)] border border-[hsl(20,10%,16%)] p-10">
                <h3 className="font-display text-3xl font-light mb-8 text-[hsl(30,20%,85%)]">Request a Quote</h3>
                <form className="space-y-5">
                  <div>
                    <label className="block text-[9px] tracking-[0.35em] uppercase text-[hsl(20,8%,48%)] mb-2">Name / Company</label>
                    <input type="text" placeholder="Your name or company"
                      className="w-full bg-[hsl(20,12%,8%)] border border-[hsl(20,10%,18%)] px-4 py-3 text-sm font-light text-[hsl(30,20%,78%)] placeholder-[hsl(20,8%,32%)] focus:outline-none focus:border-[hsl(25,90%,45%)]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.35em] uppercase text-[hsl(20,8%,48%)] mb-2">Contact (Email / Telegram / Phone)</label>
                    <input type="text" placeholder="How to reach you"
                      className="w-full bg-[hsl(20,12%,8%)] border border-[hsl(20,10%,18%)] px-4 py-3 text-sm font-light text-[hsl(30,20%,78%)] placeholder-[hsl(20,8%,32%)] focus:outline-none focus:border-[hsl(25,90%,45%)]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.35em] uppercase text-[hsl(20,8%,48%)] mb-2">Route / Airport</label>
                    <input type="text" placeholder="Airports and flight direction"
                      className="w-full bg-[hsl(20,12%,8%)] border border-[hsl(20,10%,18%)] px-4 py-3 text-sm font-light text-[hsl(30,20%,78%)] placeholder-[hsl(20,8%,32%)] focus:outline-none focus:border-[hsl(25,90%,45%)]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.35em] uppercase text-[hsl(20,8%,48%)] mb-2">Message</label>
                    <textarea rows={4} placeholder="Request details"
                      className="w-full bg-[hsl(20,12%,8%)] border border-[hsl(20,10%,18%)] px-4 py-3 text-sm font-light text-[hsl(30,20%,78%)] placeholder-[hsl(20,8%,32%)] focus:outline-none focus:border-[hsl(25,90%,45%)]/50 transition-colors resize-none" />
                  </div>
                  <button type="submit" className="btn-gold-filled w-full text-center">Send Request</button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[hsl(20,10%,16%)] py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_IMAGE}
                alt="Scorpius Aviation"
                className="h-12 w-auto object-contain"
                style={{ mixBlendMode: "screen", opacity: 0.65 }}
              />
            </div>
            <div className="flex gap-8">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="nav-link text-[10px]">{link.label}</a>
              ))}
            </div>
            <div className="text-[hsl(20,8%,38%)] text-xs font-light tracking-wide">© 2026 Scorpius Aviation</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
