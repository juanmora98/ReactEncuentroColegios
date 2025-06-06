import './App.css';
import {Parameters} from 'core/scripts/Parameters';
import Index from 'pages/PagesDecanaturas/components/index';
import NavBar from 'core/components/NavBar/components/NavBar';
import {NavigationOnClick} from 'services/scripts/Navigation';

function App() {
  const urlNavigation = NavigationOnClick();
  const parameters = Parameters();
  return (
    <div className={parameters.APP}>
      <NavBar ing="escuela" ingName="decanaturas"/>
      <Index />
      <button onClick={urlNavigation(parameters.INGSISTEMAS_ACTIVITY)}>
        Ir a Ingeniería de Sistemas
      </button>
      <button onClick={urlNavigation(parameters.INGIA_ACTIVITY)}>
        Ir a Ingeniería de IA
      </button>
      <button onClick={urlNavigation(parameters.INGESTADISTICA_ACTIVITY)}>
        Ir a Ingeniería de Estadística
      </button>
      <button onClick={urlNavigation(parameters.INGCIBERSEGURIDAD_ACTIVITY)}>
        Ir a Ingeniería de ciberseguridad
      </button>
    </div>
  );
}

export default App;
