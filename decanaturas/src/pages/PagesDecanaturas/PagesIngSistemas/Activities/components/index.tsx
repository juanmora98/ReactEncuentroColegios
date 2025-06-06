import '../../styles/styles.css';
import 'core/styles/core.css'
import 'core/styles/activity.css';
import { Activities } from './Activities';
import {Games} from '../../scripts/games';
import React, {useState} from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import {Navigation} from 'services/scripts/Navigation';
import BackgroundCard from 'core/components/Activities/BackgroundCard/components/BackgroundCard';
import {Parameters} from 'core/scripts/Parameters';

function Index() {
  const gamesInstance = new Games();
  const parameters = Parameters();
  return (
    <div className="Background">
      <NavBar ing="sistemas" ingName="ingenieria de sistemas" />
      <main>
        <BackgroundCard>
          <GamesController gamesInstance={gamesInstance} parameters={parameters} />
        </BackgroundCard>
      </main>
    </div>
  );
}
function GamesController(props) {
  const navigate = Navigation();
  const [count, setCount] = useState(props.gamesInstance.getCountActivities());
  const handleActivityComplete = () => {
    setCount(props.gamesInstance.getCountActivities());
    if (props.gamesInstance.Complete) {
      navigate('/');
    }
  };
  return (
    <React.Fragment>
      <div className="activity-title">
        <h1>¡Bienvenido a la actividad de Ingeniería de sistemas!</h1>
        <h2>Programacion y redes</h2>
      </div>
      <div className="activity-description">
        <h3 className="Title-Center">¡Resuelve las tres actividades modificando el código!</h3>
        <p>
          En ingeniería de sistemas, te enfrentarás a diversos desafíos relacionados con programas, juegos, redes, aplicaciones y más. Te presentamos 3 actividades que te ayudarán a comprender conceptos clave y a prepararte para los escenarios que podrás encontrar en esta disciplina.
        </p>
        <h4 className="Title-Center">Actividades completadas {count}</h4>
      </div>
        <Activities.GameSB gamesInstance={props.gamesInstance} onActivityComplete={handleActivityComplete} completed = {props.gamesInstance.getActivitiesCompleted(0)} parameters={props.parameters}/>
        <Activities.GameS gamesInstance={props.gamesInstance} onActivityComplete={handleActivityComplete} completed = {props.gamesInstance.getActivitiesCompleted(1)} parameters={props.parameters}/>
        <Activities.GameN gamesInstance={props.gamesInstance} onActivityComplete={handleActivityComplete} completed = {props.gamesInstance.getActivitiesCompleted(2)} parameters={props.parameters}/>
        <div id="mensajeFinal" className="mensaje-final"></div>
    </React.Fragment>
  );
}

export default Index;