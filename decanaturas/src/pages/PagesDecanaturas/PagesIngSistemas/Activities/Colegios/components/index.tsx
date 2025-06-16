import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import MainDescription from 'core/components/MainDescription/components/mainDescription';

function index() {
    return (
        <div className="Background">
            <NavBar ing="sistemas" ingName="ingenieria de sistemas" />
            <main>
                <MainDescription title="ACTIVIDADES PARA COLEGIOS" description="Descripción de la carrera de Ingeniería de Sistemas." />
            </main>
        </div>
    );
}

export default index;