import '../styles/styles.css';
import 'core/styles/core.css'
import {Games} from '../scripts/Games';
import { Activities } from '../Activities/index';
import React, {useState} from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import {Navigation} from 'services/scripts/Navigation';
import BackgroundCard from 'core/components/Activities/BackgroundCard/components/BackgroundCard';

function Index() {
  const gamesInstance = new Games();
  return (
    <div className="Background">
      <NavBar ing="sistemas" ingName="ingenieria de sistemas" />
      <main>
        <BackgroundCard>
          <GamesController gamesInstance={gamesInstance} />
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
      <h1 className="Title-Center">¡Resuelve las tres actividades modificando el código!</h1>
        <h2 className="Title-Center">Actividades completadas {count}</h2>
        <Activities.GameSB gamesInstance={props.gamesInstance} onActivityComplete={handleActivityComplete} completed = {props.gamesInstance.getActivitiesCompleted(0)} />
        <Activities.GameS gamesInstance={props.gamesInstance} onActivityComplete={handleActivityComplete} completed = {props.gamesInstance.getActivitiesCompleted(1)}/>
        <Activities.GameN gamesInstance={props.gamesInstance} onActivityComplete={handleActivityComplete} completed = {props.gamesInstance.getActivitiesCompleted(2)}/>
        <div id="mensajeFinal" className="mensaje-final"></div>
    </React.Fragment>
  );
}

export default Index;