import '../styles/styles.css';
import {Games} from '../scripts/Games';
import { Activities } from '../Activities/index';
import React, {useState} from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import {Navigation} from 'services/scripts/Navigation';



function Index() {
  const gamesInstance = new Games();
  return (
    <div>
      <NavBar ing="sistemas" ingName="ingenieria de sistemas" />
      <GamesController gamesInstance={gamesInstance} />
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
    <main>
      <div className="container">
        <h1 className="phase-title">¡Resuelve las tres actividades modificando el código!</h1>
        <h2 className="phase-subtitle">Actividades completadas {count}</h2>
        <Activities.GameSB gamesInstance={props.gamesInstance} onActivityComplete={handleActivityComplete} />
        <Activities.GameS gamesInstance={props.gamesInstance} onActivityComplete={handleActivityComplete} />
        <Activities.GameN gamesInstance={props.gamesInstance} onActivityComplete={handleActivityComplete} />
        <div id="mensajeFinal" className="mensaje-final"></div>
      </div>
    </main>
  );
}

export default Index;