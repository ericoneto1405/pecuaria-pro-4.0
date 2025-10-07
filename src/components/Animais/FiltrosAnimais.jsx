/**
 * FILTROS DE ANIMAIS
 * Barra de filtros para lista de animais
 */

function FiltrosAnimais({ filtros, onChange }) {
  const handleChange = (campo, valor) => {
    onChange({ ...filtros, [campo]: valor });
  };
  
  return (
    <div className="filtros-animais">
      <div className="filtros-animais__controles">
        
        {/* Filtro de Tipo */}
        <div className="filtro-grupo">
          <label htmlFor="filtro-tipo">Tipo</label>
          <select 
            id="filtro-tipo"
            value={filtros.tipo}
            onChange={(e) => handleChange('tipo', e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos</option>
            <option value="puro">Puros (PO)</option>
            <option value="F1">F1</option>
            <option value="composta">Raças Compostas</option>
            <option value="mestico_complexo">Mestiços</option>
          </select>
        </div>
        
        {/* Filtro de Raça */}
        <div className="filtro-grupo">
          <label htmlFor="filtro-raca">Raça</label>
          <select 
            id="filtro-raca"
            value={filtros.raca}
            onChange={(e) => handleChange('raca', e.target.value)}
            className="filtro-select"
          >
            <option value="todas">Todas</option>
            <optgroup label="Zebuínas">
              <option value="Nelore">Nelore</option>
              <option value="Brahman">Brahman</option>
              <option value="Tabapuã">Tabapuã</option>
              <option value="Guzerá">Guzerá</option>
              <option value="Sindi">Sindi</option>
            </optgroup>
            <optgroup label="Taurinas">
              <option value="Angus">Angus</option>
              <option value="Hereford">Hereford</option>
              <option value="Charolês">Charolês</option>
              <option value="Senepol">Senepol</option>
            </optgroup>
            <optgroup label="Compostas">
              <option value="Braford">Braford</option>
              <option value="Santa Gertrudis">Santa Gertrudis</option>
              <option value="Bonsmara">Bonsmara</option>
              <option value="Girolando">Girolando</option>
            </optgroup>
            <optgroup label="Leiteiras">
              <option value="Holandesa">Holandesa</option>
              <option value="Jersey">Jersey</option>
              <option value="Gir">Gir</option>
            </optgroup>
          </select>
        </div>
        
        {/* Filtro de Sexo */}
        <div className="filtro-grupo">
          <label htmlFor="filtro-sexo">Sexo</label>
          <select 
            id="filtro-sexo"
            value={filtros.sexo}
            onChange={(e) => handleChange('sexo', e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todos</option>
            <option value="M">♂ Machos</option>
            <option value="F">♀ Fêmeas</option>
          </select>
        </div>
        
        {/* Busca */}
        <div className="filtro-grupo filtro-grupo--busca">
          <label htmlFor="filtro-busca">Buscar</label>
          <input
            id="filtro-busca"
            type="search"
            placeholder="ID, nome ou brinco..."
            value={filtros.busca}
            onChange={(e) => handleChange('busca', e.target.value)}
            className="filtro-input"
          />
        </div>
      </div>
    </div>
  );
}

export default FiltrosAnimais;

