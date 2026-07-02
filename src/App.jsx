import { useProject } from './context/ProjectContext';
import InputsTab from './tabs/InputsTab';
import ReportTab from './tabs/ReportTab';
import PortfolioTab from './tabs/PortfolioTab';
import './App.css';

export default function App() {
  const { state, dispatch } = useProject();
  const { activeTab } = state;

  return (
    <div className="app-shell">
      <div className="tab-bar no-print">
        <img src="/logo.png" alt="Great Circle Solar" className="tab-bar-logo" />
        <button
          className={`tab-btn ${activeTab === 'inputs' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'inputs' })}
        >
          Project Inputs
        </button>
        <button
          className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'report' })}
        >
          Report Preview
        </button>
        <button
          className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'portfolio' })}
        >
          Portfolio
        </button>
      </div>
      {activeTab === 'inputs' && <InputsTab />}
      {activeTab === 'report' && <ReportTab />}
      {activeTab === 'portfolio' && <PortfolioTab />}
    </div>
  );
}
