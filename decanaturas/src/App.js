import './App.css';
import {Parameters} from 'core/scripts/Parameters';
import Index from 'pages/PagesDecanaturas/components/Index';
import NavBar from 'core/components/NavBar/components/NavBar';
import {Navigation} from 'services/scripts/Navigation';

function App() {
  const urlNavigation = Navigation();
  const parameters = Parameters();
  return (
    <div className={parameters.APP}>
      <NavBar ing="escuela" ingName="decanaturas"/>
      <Index />
      <button onClick={urlNavigation(parameters.INGSISTEMAS_ACTIVITY)}>
        Ir a Ingeniería de Sistemas
      </button>
    </div>
  );
}

export default App;
