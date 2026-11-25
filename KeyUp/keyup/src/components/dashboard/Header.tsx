export default function Header({ title, onMenu, onAdd }: { title: string; onMenu: () => void; onAdd: () => void }) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <span className="header-title">{title}</span>
        <button className="menu-btn" onClick={() => onMenu()} aria-label="Abrir menu">
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>
      </div>
      <div className="header-right">
        <button className="add-btn" onClick={() => onAdd()} aria-label="Adicionar novo item">
          +
        </button>
      </div>

      <nav className="mobile-menu" role="menu">
        <a href="#sites">Sites</a>
        <a href="#personal">Pessoais</a>
        <button className="close-menu" aria-label="Fechar">
          ✕
        </button>
      </nav>
    </header>
  );
}