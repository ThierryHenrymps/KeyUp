import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import "./keyup.css";

/* ---------- Ícones (SVG inline) ---------- */
type IconName = "key" | "lock" | "file" | "note" | "shield" | "sync" | "check" | "menu" | "close";
const paths: Record<IconName, ReactNode> = {
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M14 9l2 2" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  file: <><path d="M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" /><path d="M14 3v5h5" /></>,
  note: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  sync: <><path d="M20 7v4h-4M4 17v-4h4" /><path d="M6.5 9A7 7 0 0118 7.5L20 11M17.5 15A7 7 0 016 16.5L4 13" /></>,
  check: <path d="M5 12l4 4 10-10" />,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  close: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/* ---------- Entrada ao rolar (discreta) ---------- */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Header com Menu Hambúrguer Mobile ---------- */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#inicio" className="brand" aria-label="KeyUp" onClick={closeMenu}>
          <span className="brand-mark">
            <Icon name="key" size={18} />
          </span>
          <span>KeyUp</span>
        </a>

        <nav aria-label="Principal" className="nav-links">
          <a href="#inicio">Início</a>
          <a href="#recursos">Recursos</a>
          <a href="#seguranca">Segurança</a>
          <a href="#sobre">Sobre</a>
        </nav>

        <div className="nav-actions">
          <a href="/entrar" className="btn btn-ghost">
            Acessar minha conta
          </a>
          <a href="/cadastro" className="btn btn-primary">
            Começar agora
          </a>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-drawer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mobile-drawer-inner">
              <nav aria-label="Menu mobile" className="mobile-links">
                <a href="#inicio" onClick={closeMenu}>Início</a>
                <a href="#recursos" onClick={closeMenu}>Recursos</a>
                <a href="#seguranca" onClick={closeMenu}>Segurança</a>
                <a href="#sobre" onClick={closeMenu}>Sobre</a>
              </nav>
              <div className="mobile-actions">
                <a href="/entrar" className="btn btn-glass btn-block" onClick={closeMenu}>
                  Acessar minha conta
                </a>
                <a href="/cadastro" className="btn btn-primary btn-block" onClick={closeMenu}>
                  Começar agora
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Smartphone e desktop fictícios com vickpimenta ---------- */
const items = [
  { n: "Apple ID", u: "vick@keyup.app", c: "#3b82f6" },
  { n: "Banco Aurora", u: "vick.pimenta", c: "#8b5cf6" },
  { n: "Streaming", u: "vick@keyup.app", c: "#2563eb" },
  { n: "Trabalho", u: "vpimenta", c: "#4f46e5" },
];

function Phone() {
  return (
    <div className="phone" role="img" aria-label="Aplicativo KeyUp em um smartphone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="ph-top">
          <span>9:41</span>
          <span>KeyUp</span>
        </div>
        <h3 className="ph-title">Cofre</h3>
        <div className="ph-search">Buscar no cofre...</div>
        <div className="ph-list">
          {items.map((i) => (
            <div className="ph-row" key={i.n}>
              <span className="ph-av" style={{ background: i.c }}>
                {i.n[0]}
              </span>
              <span className="ph-txt">
                <b>{i.n}</b>
                <i>{i.u}</i>
              </span>
              <span className="ph-dots">••••••</span>
            </div>
          ))}
        </div>
        <div className="ph-tabs">
          <span className="active"><Icon name="key" size={17} /></span>
          <span><Icon name="file" size={17} /></span>
          <span><Icon name="note" size={17} /></span>
        </div>
      </div>
    </div>
  );
}

function Desktop() {
  return (
    <div className="desk" role="img" aria-label="Cofre de senhas do KeyUp no computador">
      <div className="desk-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="desk-body">
        <aside>
          <span className="on">Senhas</span>
          <span>Arquivos</span>
          <span>Notas</span>
          <span>Favoritos</span>
        </aside>
        <div className="desk-list">
          {items.slice(0, 3).map((i, k) => (
            <div key={i.n} className={k === 0 ? "d-row sel" : "d-row"}>
              <span className="ph-av sm" style={{ background: i.c }}>
                {i.n[0]}
              </span>
              <span>{i.n}</span>
            </div>
          ))}
        </div>
        <div className="desk-detail">
          <b>Apple ID</b>
          <small>Senha</small>
          <div className="d-field">••••••••••••</div>
          <small>Força</small>
          <div className="meter">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function Float({
  icon,
  label,
  className,
  delay = 0,
  reduce,
}: {
  icon: IconName;
  label: string;
  className: string;
  delay?: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={`chip glass ${className}`}
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon name={icon} size={16} />
      <span>{label}</span>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const reduce = !!useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const deskX = useTransform(sx, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (min-width: 1024px)").matches) return;
    const move = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, mx, my]);

  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-badge">Sua vida digital, protegida.</span>
          <h1>Suas senhas. Sua vida digital. Protegidas.</h1>
          <p>
            Um lugar seguro para guardar suas senhas, arquivos e informações mais importantes.
            Sua privacidade sempre em primeiro lugar.
          </p>
          <div className="hero-cta">
            <a href="#sobre" className="btn btn-primary btn-lg">
              Conhecer o KeyUp
            </a>
            <a href="#recursos" className="btn btn-glass btn-lg">
              Explorar recursos
            </a>
          </div>
        </motion.div>

        <div className="stage">
          <motion.div
            className="stage-desk"
            style={{ x: reduce ? 0 : deskX }}
            initial={reduce ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Desktop />
          </motion.div>

          <motion.div
            className="stage-phone"
            style={{ rotateY: reduce ? 0 : rotY, rotateX: reduce ? 0 : rotX }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0], rotate: [-1.2, 1.2, -1.2] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <Phone />
            </motion.div>
          </motion.div>

          <div className="stage-chips">
            <Float reduce={reduce} icon="shield" label="Criptografia de ponta a ponta" className="c1" />
            <Float reduce={reduce} icon="sync" label="Sincronizado agora" className="c2" delay={1.2} />
            <Float reduce={reduce} icon="lock" label="Acesso protegido" className="c3" delay={2.1} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Recursos ---------- */
const features: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "key",
    title: "Gerenciador de senhas",
    text: "Organize logins e credenciais em um só lugar, com geração de senhas fortes e preenchimento rápido.",
  },
  {
    icon: "file",
    title: "Cofre de arquivos",
    text: "Armazene documentos e arquivos pessoais com a mesma proteção das suas senhas.",
  },
  {
    icon: "note",
    title: "Notas seguras",
    text: "Guarde anotações privadas, códigos e informações sensíveis, acessíveis só para você.",
  },
];

function Features() {
  return (
    <section id="recursos" className="section">
      <div className="container">
        <Reveal className="section-head">
          <h2>Tudo o que é importante, em um só cofre.</h2>
          <p>Três recursos pensados para manter sua vida digital organizada e protegida.</p>
        </Reveal>
        <div className="features">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="feature glass">
              <span className="f-icon">
                <Icon name={f.icon} size={22} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Segurança ---------- */
function Security() {
  const pts = [
    "Seus dados são criptografados antes de sair do seu dispositivo.",
    "Só você tem a chave para abrir o cofre.",
    "Sincronização entre celular e computador, sem expor o que está guardado.",
  ];
  return (
    <section id="seguranca" className="section section-security">
      <div className="container split">
        <Reveal className="split-head">
          <span className="eyebrow">Arquitetura Zero-Knowledge</span>
          <h2 className="security-title">Privacidade não é um recurso. É o ponto de partida.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="checks">
            {pts.map((p) => (
              <li key={p}>
                <span className="check-badge">
                  <Icon name="check" size={15} />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Sobre / CTA ---------- */
function About() {
  return (
    <section id="sobre" className="section section-cta">
      <div className="container">
        <Reveal className="cta-box glass">
          <h2>Comece a proteger o que importa.</h2>
          <p>Crie seu cofre em poucos minutos e mantenha tudo sob seu controle.</p>
          <a href="/cadastro" className="btn btn-primary btn-lg">
            Começar agora
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function KeyUpLanding() {
  return (
    <div className="page">
      <div className="bg" aria-hidden="true">
        <i className="b1" />
        <i className="b2" />
        <i className="b3" />
      </div>
      <Header />
      <main>
        <Hero />
        <Features />
        <Security />
        <About />
      </main>
      <footer className="foot">
        <div className="container">
          © {new Date().getFullYear()} KeyUp. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}