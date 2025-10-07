function Header() {
  return (
    <header className="header">
      <div className="header__brand">Pecuária Pro 4.0</div>
      <nav className="header__nav">
        <a href="#" className="header__link" title="Dashboard">Dashboard</a>
        <a href="#" className="header__link" title="Relatórios">Relatórios</a>
        <a href="#" className="header__link" title="Configurações">Configurações</a>
      </nav>
    </header>
  );
}

export default Header;
