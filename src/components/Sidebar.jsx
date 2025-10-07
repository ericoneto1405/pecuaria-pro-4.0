function Sidebar({ activeSection, onSelectSection }) {
  const handleSelect = (section) => () => {
    if (onSelectSection) {
      onSelectSection(section);
    }
  };

  const itemClass = (section) =>
    `sidebar__item${activeSection === section ? ' sidebar__item--active' : ''}`;

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Módulos</h2>
      <ul className="sidebar__menu">
        <li className={itemClass('fazendas')}>
          <button type="button" className="sidebar__link" onClick={handleSelect('fazendas')}>
            Fazendas
          </button>
        </li>
        <li className={itemClass('animais')}>
          <button type="button" className="sidebar__link" onClick={handleSelect('animais')}>
            🐄 Animais
          </button>
        </li>
        <li className={itemClass('gestao-rebanho')}>
          <button type="button" className="sidebar__link" onClick={handleSelect('gestao-rebanho')}>
            Gestão de Rebanho
          </button>
        </li>
        <li className={itemClass('nutricao')}>
          <button type="button" className="sidebar__link" onClick={handleSelect('nutricao')}>
            Nutrição
          </button>
        </li>
        <li className={itemClass('sanidade')}>
          <button type="button" className="sidebar__link" onClick={handleSelect('sanidade')}>
            Sanidade
          </button>
        </li>
        <li className={itemClass('relatorios')}>
          <button type="button" className="sidebar__link" onClick={handleSelect('relatorios')}>
            Relatórios
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
