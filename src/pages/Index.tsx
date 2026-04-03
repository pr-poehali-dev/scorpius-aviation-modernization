import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/28c730d4-b6e5-402e-a37e-ec397e7eee0a/files/20a3d079-5ad3-4819-a38e-678d89d88f9a.jpg";

const SERVICES = [
  {
    icon: "PlaneLanding",
    title: "Ground Handling",
    en: "Ground Handling",
    desc: "Организация наземного обслуживания на любом аэропорту мира: встреча и сопровождение ВС, координация с аэропортовыми службами, таможня и пограничный контроль.",
  },
  {
    icon: "Fuel",
    title: "Заправка",
    en: "Refueling",
    desc: "Организация заправки воздушных судов авиационным топливом на любом аэропорту. Оперативная координация с топливными операторами по всему миру.",
  },
  {
    icon: "MapPin",
    title: "Разрешения",
    en: "Permits & Slots",
    desc: "Получение разрешений на выполнение полётов, слоты в аэропортах, дипломатические клиренсы и разрешения на посадку в закрытых зонах.",
  },
  {
    icon: "Hotel",
    title: "Услуги экипажа",
    en: "Crew Services",
    desc: "Бронирование отелей, транспорт, визовая поддержка и организация отдыха для лётного и кабинного экипажа.",
  },
  {
    icon: "Headphones",
    title: "Диспетчеризация",
    en: "Flight Dispatch",
    desc: "Полное сопровождение рейса: планирование маршрута, метеообеспечение, NOTAMы, брифинг экипажа и послеполётная документация.",
  },
  {
    icon: "Shield",
    title: "Безопасность",
    en: "Security",
    desc: "Обеспечение авиационной безопасности: охрана ВС, проверка пассажиров и груза, координация со службами безопасности аэропорта.",
  },
];

const STATS = [
  { value: "15+", label: "лет на рынке" },
  { value: "200+", label: "аэропортов мира" },
  { value: "24/7", label: "поддержка" },
  { value: "100%", label: "надёжность" },
];

const NAV_LINKS = [
  { href: "#about", label: "О компании" },
  { href: "#services", label: "Услуги" },
  { href: "#geography", label: "География" },
  { href: "#contact", label: "Контакты" },
];

function useIntersect(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
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
    <div
      ref={ref}
      className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
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
    <div className="grain-overlay min-h-screen bg-[hsl(220,30%,6%)] text-[hsl(40,20%,92%)] font-sans overflow-x-hidden">

      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[hsl(220,30%,5%)]/95 backdrop-blur-md border-b border-[hsl(220,15%,18%)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 border border-[hsl(43,65%,62%)] flex items-center justify-center">
                  <span className="text-[hsl(43,65%,62%)] text-lg font-display font-semibold leading-none">S</span>
                </div>
                <div className="absolute -inset-[3px] border border-[hsl(43,65%,62%)]/20 group-hover:border-[hsl(43,65%,62%)]/50 transition-colors duration-300" />
              </div>
              <div>
                <div className="text-sm tracking-[0.25em] uppercase font-light text-[hsl(40,20%,92%)]">Scorpius</div>
                <div className="text-[10px] tracking-[0.35em] uppercase text-[hsl(43,65%,62%)] font-light -mt-0.5">Aviation</div>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a href="#contact" className="btn-gold text-[11px]">
                Связаться
              </a>
            </div>

            <button
              className="md:hidden text-[hsl(40,20%,92%)] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[hsl(220,30%,5%)]/98 backdrop-blur-md border-t border-[hsl(220,15%,18%)] px-6 py-6 flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-base"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-gold text-center text-[11px]" onClick={() => setMenuOpen(false)}>
              Связаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Scorpius Aviation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,30%,4%)]/90 via-[hsl(220,30%,4%)]/60 to-[hsl(220,30%,4%)]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,30%,4%)]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24">
          <div className="max-w-2xl">
            <div
              className="flex items-center gap-4 mb-8 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <div className="h-px w-12 bg-[hsl(43,65%,62%)]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(43,65%,62%)] font-light">
                Aviation Handler
              </span>
            </div>

            <h1
              className="font-display text-6xl lg:text-8xl font-light leading-[0.95] mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              Ground
              <br />
              <span className="text-[hsl(43,65%,62%)] italic">Handling</span>
              <br />
              Excellence
            </h1>

            <p
              className="text-[hsl(220,10%,65%)] font-light text-lg leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-up"
              style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
            >
              Организация наземного обслуживания и заправки воздушных судов в любом аэропорту мира. 24/7.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
            >
              <a href="#services" className="btn-gold-filled text-center">
                Наши услуги
              </a>
              <a href="#contact" className="btn-gold text-center">
                Запросить предложение
              </a>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-[hsl(220,10%,50%)]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[hsl(43,65%,62%)]/60 to-transparent" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-[hsl(220,15%,18%)] bg-[hsl(220,25%,8%)]">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[hsl(220,15%,18%)]">
              {STATS.map((stat, i) => (
                <div key={i} className="py-10 px-8 text-center">
                  <div className="font-display text-4xl lg:text-5xl font-light text-[hsl(43,65%,62%)] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[hsl(220,10%,55%)]">
                    {stat.label}
                  </div>
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
                  <div className="h-px w-12 bg-[hsl(43,65%,62%)]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(43,65%,62%)]">О компании</span>
                </div>
                <h2 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-8">
                  Scorpius<br />
                  <span className="text-[hsl(43,65%,62%)] italic">Aviation</span>
                </h2>
                <p className="text-[hsl(220,10%,65%)] font-light leading-relaxed text-base mb-6">
                  Scorpius Aviation — профессиональный авиационный хэндлер с многолетним опытом работы на международном рынке. Мы специализируемся на организации наземного обслуживания и заправки воздушных судов деловой авиации и коммерческих перевозчиков.
                </p>
                <p className="text-[hsl(220,10%,65%)] font-light leading-relaxed text-base mb-10">
                  Наша команда экспертов обеспечивает безупречное выполнение каждого рейса — от первого контакта до завершения полёта. Мы работаем в любой точке мира, предоставляя комплексные решения для авиационных операторов.
                </p>
                <div className="divider-gold mb-10" />
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Деловая авиация", desc: "Полный спектр услуг для бизнес-джетов" },
                    { label: "Коммерческие рейсы", desc: "Обслуживание регулярных и чартерных перевозчиков" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="text-sm font-medium text-[hsl(40,20%,85%)] mb-1">{item.label}</div>
                      <div className="text-xs text-[hsl(220,10%,50%)] leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/5] bg-[hsl(220,25%,10%)] relative overflow-hidden">
                  <img
                    src={HERO_IMAGE}
                    alt="Scorpius Aviation"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,30%,6%)] via-transparent to-transparent" />
                </div>
                <div className="absolute -top-4 -right-4 w-full h-full border border-[hsl(43,65%,62%)]/20 pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[hsl(43,65%,62%)]/40 pointer-events-none" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6 lg:px-12 bg-[hsl(220,25%,8%)]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[hsl(43,65%,62%)]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(43,65%,62%)]">Услуги</span>
                <div className="h-px w-12 bg-[hsl(43,65%,62%)]" />
              </div>
              <h2 className="font-display text-5xl lg:text-6xl font-light">
                Полный спектр<br />
                <span className="text-[hsl(43,65%,62%)] italic">авиационных услуг</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsl(220,15%,18%)]">
            {SERVICES.map((service, i) => (
              <AnimatedSection key={i}>
                <div className="bg-[hsl(220,25%,8%)] p-10 group hover:bg-[hsl(220,25%,11%)] transition-colors duration-300 h-full">
                  <div className="mb-6">
                    <div className="w-12 h-12 border border-[hsl(43,65%,62%)]/30 flex items-center justify-center group-hover:border-[hsl(43,65%,62%)] transition-colors duration-300">
                      <Icon name={service.icon} size={20} className="text-[hsl(43,65%,62%)]" />
                    </div>
                  </div>
                  <div className="text-[9px] tracking-[0.4em] uppercase text-[hsl(43,65%,62%)]/60 mb-2 font-light">
                    {service.en}
                  </div>
                  <h3 className="font-display text-2xl font-light text-[hsl(40,20%,92%)] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-[hsl(220,10%,55%)] text-sm leading-relaxed font-light">
                    {service.desc}
                  </p>
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
                  <div className="h-px w-12 bg-[hsl(43,65%,62%)]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(43,65%,62%)]">География</span>
                </div>
                <h2 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-8">
                  Весь мир —<br />
                  <span className="text-[hsl(43,65%,62%)] italic">наш аэропорт</span>
                </h2>
                <p className="text-[hsl(220,10%,65%)] font-light leading-relaxed mb-10">
                  Scorpius Aviation обеспечивает полное наземное обслуживание в более чем 200 аэропортах по всему миру. Независимо от того, куда направляется ваш рейс — мы уже там.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { region: "Европа", airports: "80+ аэропортов" },
                    { region: "Азия", airports: "50+ аэропортов" },
                    { region: "Ближний Восток", airports: "30+ аэропортов" },
                    { region: "Африка & СНГ", airports: "40+ аэропортов" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="border border-[hsl(220,15%,18%)] p-5 hover:border-[hsl(43,65%,62%)]/40 transition-colors duration-300"
                    >
                      <div className="text-xs tracking-widest uppercase text-[hsl(43,65%,62%)] mb-1">{item.region}</div>
                      <div className="text-[hsl(220,10%,55%)] text-sm font-light">{item.airports}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative bg-[hsl(220,25%,9%)] p-10 border border-[hsl(220,15%,18%)]">
                <div className="text-center mb-8">
                  <Icon name="Globe" size={80} className="text-[hsl(43,65%,62%)]/20 mx-auto" />
                </div>
                <div className="divider-gold mb-8" />
                <div className="space-y-4">
                  {[
                    "Московский авиаузел (SVO, DME, VKO)",
                    "Стамбул (IST, SAW)",
                    "Дубай (DXB, DWC)",
                    "Лондон (LHR, LCY, LTN)",
                    "Женева (GVA)",
                    "Сингапур (SIN)",
                  ].map((airport, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-[hsl(220,10%,60%)] font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(43,65%,62%)] flex-shrink-0" />
                      {airport}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[hsl(43,65%,62%)]/60">и 190+ других направлений</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-32 px-6 lg:px-12 bg-[hsl(220,25%,8%)]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[hsl(43,65%,62%)]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(43,65%,62%)]">Преимущества</span>
                <div className="h-px w-12 bg-[hsl(43,65%,62%)]" />
              </div>
              <h2 className="font-display text-5xl lg:text-6xl font-light">
                Почему выбирают<br />
                <span className="text-[hsl(43,65%,62%)] italic">Scorpius</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "Clock",
                title: "24/7 Поддержка",
                desc: "Наша команда доступна круглосуточно для решения любых вопросов.",
              },
              {
                icon: "Award",
                title: "Экспертиза",
                desc: "15+ лет опыта в международной авиационной индустрии.",
              },
              {
                icon: "Zap",
                title: "Оперативность",
                desc: "Быстрое реагирование и мгновенное подтверждение услуг.",
              },
              {
                icon: "Users",
                title: "Персональный подход",
                desc: "Персональный менеджер для каждого клиента и рейса.",
              },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="text-center group">
                  <div className="w-16 h-16 border border-[hsl(43,65%,62%)]/30 flex items-center justify-center mx-auto mb-6 group-hover:border-[hsl(43,65%,62%)] transition-colors duration-300">
                    <Icon name={item.icon} size={24} className="text-[hsl(43,65%,62%)]" />
                  </div>
                  <h3 className="font-display text-xl font-light mb-3 text-[hsl(40,20%,88%)]">{item.title}</h3>
                  <p className="text-[hsl(220,10%,50%)] text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(43,55%,35%)]/20 via-[hsl(43,65%,30%)]/10 to-transparent" />
        <div className="absolute inset-0 border-y border-[hsl(43,65%,62%)]/10" />
        <AnimatedSection>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <h2 className="font-display text-5xl lg:text-6xl font-light mb-6">
              Готовы к следующему <span className="text-[hsl(43,65%,62%)] italic">рейсу?</span>
            </h2>
            <p className="text-[hsl(220,10%,60%)] font-light mb-10 text-lg">
              Свяжитесь с нами прямо сейчас — наша команда подготовит персональное предложение в течение часа.
            </p>
            <a href="#contact" className="btn-gold-filled inline-block">
              Запросить предложение
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 lg:px-12 bg-[hsl(220,25%,8%)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <AnimatedSection>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-12 bg-[hsl(43,65%,62%)]" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[hsl(43,65%,62%)]">Контакты</span>
                </div>
                <h2 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-10">
                  Свяжитесь<br />
                  <span className="text-[hsl(43,65%,62%)] italic">с нами</span>
                </h2>

                <div className="space-y-8">
                  {[
                    {
                      icon: "Phone",
                      label: "Телефон",
                      value: "+7 (495) 000-00-00",
                      sub: "24/7 операционный центр",
                    },
                    {
                      icon: "Mail",
                      label: "Email",
                      value: "ops@scorpius-aviation.com",
                      sub: "Ответим в течение часа",
                    },
                    {
                      icon: "MessageCircle",
                      label: "Telegram",
                      value: "@scorpius_avia",
                      sub: "Быстрая связь с командой",
                    },
                  ].map((contact, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <div className="w-12 h-12 border border-[hsl(43,65%,62%)]/30 flex items-center justify-center flex-shrink-0">
                        <Icon name={contact.icon} size={18} className="text-[hsl(43,65%,62%)]" />
                      </div>
                      <div>
                        <div className="text-[9px] tracking-[0.35em] uppercase text-[hsl(43,65%,62%)]/60 mb-1">
                          {contact.label}
                        </div>
                        <div className="text-[hsl(40,20%,85%)] font-light">{contact.value}</div>
                        <div className="text-[hsl(220,10%,50%)] text-xs mt-0.5 font-light">{contact.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-[hsl(220,30%,6%)] border border-[hsl(220,15%,18%)] p-10">
                <h3 className="font-display text-3xl font-light mb-8 text-[hsl(40,20%,88%)]">
                  Запросить предложение
                </h3>
                <form className="space-y-5">
                  <div>
                    <label className="block text-[9px] tracking-[0.35em] uppercase text-[hsl(220,10%,50%)] mb-2">
                      Имя / Компания
                    </label>
                    <input
                      type="text"
                      placeholder="Ваше имя или название компании"
                      className="w-full bg-[hsl(220,25%,9%)] border border-[hsl(220,15%,20%)] px-4 py-3 text-sm font-light text-[hsl(40,20%,80%)] placeholder-[hsl(220,10%,35%)] focus:outline-none focus:border-[hsl(43,65%,62%)]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.35em] uppercase text-[hsl(220,10%,50%)] mb-2">
                      Контакт (Email / Telegram / Phone)
                    </label>
                    <input
                      type="text"
                      placeholder="Как с вами связаться"
                      className="w-full bg-[hsl(220,25%,9%)] border border-[hsl(220,15%,20%)] px-4 py-3 text-sm font-light text-[hsl(40,20%,80%)] placeholder-[hsl(220,10%,35%)] focus:outline-none focus:border-[hsl(43,65%,62%)]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.35em] uppercase text-[hsl(220,10%,50%)] mb-2">
                      Маршрут / Аэропорт
                    </label>
                    <input
                      type="text"
                      placeholder="Аэропорты и направление рейса"
                      className="w-full bg-[hsl(220,25%,9%)] border border-[hsl(220,15%,20%)] px-4 py-3 text-sm font-light text-[hsl(40,20%,80%)] placeholder-[hsl(220,10%,35%)] focus:outline-none focus:border-[hsl(43,65%,62%)]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-[0.35em] uppercase text-[hsl(220,10%,50%)] mb-2">
                      Сообщение
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Детали запроса"
                      className="w-full bg-[hsl(220,25%,9%)] border border-[hsl(220,15%,20%)] px-4 py-3 text-sm font-light text-[hsl(40,20%,80%)] placeholder-[hsl(220,10%,35%)] focus:outline-none focus:border-[hsl(43,65%,62%)]/50 transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-gold-filled w-full text-center">
                    Отправить запрос
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[hsl(220,15%,18%)] py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[hsl(43,65%,62%)]/50 flex items-center justify-center">
                <span className="text-[hsl(43,65%,62%)] text-sm font-display">S</span>
              </div>
              <div>
                <div className="text-xs tracking-[0.25em] uppercase font-light">Scorpius Aviation</div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-[hsl(43,65%,62%)]/60 font-light">
                  Ground Handling Excellence
                </div>
              </div>
            </div>

            <div className="flex gap-8">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="nav-link text-[10px]">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="text-[hsl(220,10%,40%)] text-xs font-light tracking-wide">
              © 2024 Scorpius Aviation
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}