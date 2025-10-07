import { useState } from 'react';
import { TempoProvider } from './contexts/TempoContext.jsx';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import SLAView from './components/SLAView.jsx';
import ListaAnimais from './components/Animais/ListaAnimais.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <TempoProvider>
      <div className="app-shell">
        <Header />
        <div className="app-layout">
          <Sidebar
            activeSection={activeSection}
            onSelectSection={setActiveSection}
          />
          <main className="app-content">
            {activeSection === 'fazendas' && <SLAView showFazendas={true} />}
            {activeSection === 'animais' && <ListaAnimais />}
            {activeSection !== 'fazendas' && activeSection !== 'animais' && (
              <SLAView showFazendas={false} />
            )}
          </main>
        </div>
      </div>
    </TempoProvider>
  );
}

export default App;
