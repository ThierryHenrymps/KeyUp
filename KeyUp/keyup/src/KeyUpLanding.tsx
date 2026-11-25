import { useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import "./keyup.css";

/* ---------- Ícones (SVG inline) ---------- */
type IconName = "key" | "lock" | "file" | "note" | "shield" | "sync" | "check";
const paths: Record<IconName, ReactNode> = {
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M14 9l2 2" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  file: <><path d="M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" /><path d="M14 3v5h5" /></>,
  note: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  sync: <><path d="M20 7v4h-4M4 17v-4h4" /><path d="M6.5 9A7 7 0 0118 7.5L20 11M17.5 15A7 7 0 016 16.5L4 13" /></>,
  check: <path d="M5 12l4 4 10-10" />,
};
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/* ---------- Entrada ao rolar (discreta) ---------- */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Header ---------- */
function Header() {
  return (
    <header className="nav">
      <a href="#inicio" className="brand" aria-label="KeyUp">
        <img src="/assets/logoKeyUp.png" className="brand-mark" alt="KeyUp logo" width={48} height={48} />
        KeyUp
      </a>
      <nav aria-label="Principal" className="nav-links">
        <a href="#inicio">Início</a>
        <a href="#recursos">Recursos</a>
        <a href="#seguranca">Segurança</a>
        <a href="#sobre">Sobre</a>
      </nav>
      <div className="nav-actions">
        <a href="/entrar" className="btn btn-ghost">Acessar minha conta</a>
        <a href="/cadastro" className="btn btn-primary">Começar agora</a>
      </div>
    </header>
  );
}

/* ---------- Smartphone e desktop fictícios ---------- */
const items = [
  { n: "Apple ID", u: "vick@keyup.app", c: "#5b7cff" },
  { n: "Banco Aurora", u: "vick.pimenta", c: "#8b5cf6" },
  { n: "Streaming", u: "vick@keyup.app", c: "#3aa0ff" },
  { n: "Trabalho", u: "vick", c: "#6d6bff" },
];

function Phone() {
  return (
    <div className="phone" role="img" aria-label="Aplicativo KeyUp em um smartphone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="ph-top"><span>9:41</span><span>KeyUp</span></div>
        <h3 className="ph-title">Cofre</h3>
        <div className="ph-search">Buscar</div>
        {items.map((i) => (
          <div className="ph-row" key={i.n}>
            <span className="ph-av" style={{ background: i.c }}>{i.n[0]}</span>
            <span className="ph-txt"><b>{i.n}</b><i>{i.u}</i></span>
            <span className="ph-dots">••••••</span>
          </div>
        ))}
        <div className="ph-tabs"><Icon name="key" size={18} /><Icon name="file" size={18} /><Icon name="note" size={18} /></div>
      </div>
    </div>
  );
}

function Desktop() {
  return (
    <div className="desk" role="img" aria-label="Cofre de senhas do KeyUp no computador">
      <div className="desk-bar"><i /><i /><i /></div>
      <div className="desk-body">
        <aside>
          <span className="on">Senhas</span><span>Arquivos</span><span>Notas</span><span>Favoritos</span>
        </aside>
        <div className="desk-list">
          {items.slice(0, 3).map((i, k) => (
            <div key={i.n} className={k === 0 ? "d-row sel" : "d-row"}>
              <span className="ph-av sm" style={{ background: i.c }}>{i.n[0]}</span>{i.n}
            </div>
          ))}
        </div>
        <div className="desk-detail">
          <b>Apple ID</b>
          <small>Senha</small>
          <div className="d-field">••••••••••••</div>
          <small>Força</small>
          <div className="meter"><span /></div>
        </div>
      </div>
    </div>
  );
}

function Float({ icon, label, className, delay = 0, reduce }:
  { icon: IconName; label: string; className: string; delay?: number; reduce: boolean }) {
  return (
    <motion.div
      className={`chip glass ${className}`}
      animate={reduce ? undefined : { y: [0, -7, 0] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon name={icon} size={16} />{label}
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
  const rotY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const deskX = useTransform(sx, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (min-width: 960px)").matches) return;
    const move = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, mx, my]);

  return (
    <section id="inicio" className="hero">
      <motion.div
        className="hero-copy"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>Suas senhas. Sua vida digital. Protegidas.</h1>
        <p>
          Um lugar seguro para guardar suas senhas, arquivos e informações mais importantes.
          Sua privacidade sempre em primeiro lugar.
        </p>
        <div className="hero-cta">
          <a href="#sobre" className="btn btn-primary btn-lg">Conhecer o KeyUp</a>
          <a href="#recursos" className="btn btn-glass btn-lg">Explorar recursos</a>
        </div>
      </motion.div>

      <div className="stage" aria-hidden={false}>
        <motion.div className="stage-desk" style={{ x: reduce ? 0 : deskX }}
          initial={reduce ? false : { opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}>
          <Desktop />
        </motion.div>

        <motion.div className="stage-phone" style={{ rotateY: reduce ? 0 : rotY, rotateX: reduce ? 0 : rotX }}>
          <motion.div
            animate={reduce ? undefined : { y: [0, -16, 0], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Phone />
          </motion.div>
        </motion.div>

        <Float reduce={reduce} icon="shield" label="Criptografia de ponta a ponta" className="c1" />
        <Float reduce={reduce} icon="sync" label="Sincronizado agora" className="c2" delay={1.2} />
        <Float reduce={reduce} icon="lock" label="Acesso protegido" className="c3" delay={2.1} />
      </div>
    </section>
  );
}

/* ---------- Recursos ---------- */
const features: { icon: IconName; title: string; text: string }[] = [
  { icon: "key", title: "Gerenciador de senhas", text: "Organize logins e credenciais em um só lugar, com geração de senhas fortes e preenchimento rápido." },
  { icon: "file", title: "Cofre de arquivos", text: "Armazene documentos e arquivos pessoais com a mesma proteção das suas senhas." },
  { icon: "note", title: "Notas seguras", text: "Guarde anotações privadas, códigos e informações sensíveis, acessíveis só para você." },
];

function Features() {
  return (
    <section id="recursos" className="section">
      <Reveal className="section-head">
        <h2>Tudo o que é importante, em um só cofre.</h2>
        <p>Três recursos pensados para manter sua vida digital organizada e protegida.</p>
      </Reveal>
      <div className="features">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08} className="feature glass">
            <span className="f-icon"><Icon name={f.icon} size={22} /></span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </Reveal>
        ))}
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
    <section id="seguranca" className="section split">
      <Reveal>
        <h2>Privacidade não é um recurso. É o ponto de partida.</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <ul className="checks">
          {pts.map((p) => (
            <li key={p}><span><Icon name="check" size={14} /></span>{p}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------- Sobre / CTA ---------- */
function About() {
  return (
    <section id="sobre" className="section cta glass">
      <Reveal>
        <h2>Comece a proteger o que importa.</h2>
        <p>Crie seu cofre em poucos minutos.</p>
        <a href="/cadastro" className="btn btn-primary btn-lg">Começar agora</a>
      </Reveal>
    </section>
  );
}

const year = new Date().getFullYear()

export default function KeyUpLanding() {
  return (
    <div className="page">
      <div className="bg" aria-hidden="true"><i className="b1" /><i className="b2" /><i className="b3" /></div>
      <Header />
      <main>
        <Hero />
        <Features />
        <Security />
        <About />
      </main>
      <footer className="foot">© {year} KeyUp. Todos os direitos reservados.</footer>
    </div>
  )
}
