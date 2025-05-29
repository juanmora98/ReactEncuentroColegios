import '../styles/styles.css';
import '../scripts/games';
import { Activities } from '../Activities/index';
import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';

function Index() {
    return(
        <div>
            <NavBar ing ="sistemas" ingName="ingenieria de sistemas" />
            <Games />
        </div>
    );
}

function Games() {
  return (
    <main>
        <div className="container">
          <h1 className="phase-title">¡Resuelve las tres actividades modificando el código!</h1>
          <Activities.GameSB />
          <Activities.GameS />
          <div id="mensajeFinal" className="mensaje-final"></div>
        </div>
      </main>
  );
}

export default Index;