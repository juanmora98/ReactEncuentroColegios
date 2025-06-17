import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import ActivityDescription from 'pages/PagesActividades/components/ActivityDescription';

function Index() {
    return (
        <div>
            <NavBar ing="sistemas" ingName="Ingenieria de sistemas" />
            <main>
                <ActivityDescription 
                    title="¡Bienvenido a la actividad de Ingeniería de sistemas!"
                    activityTitle="¡Dia como ingeniero!"
                    subtitle="¡El primer paso hacia el futuro!"
                    description={
                        <React.Fragment>
                            <p>
                                ¿Te imaginas crear tu propia página web y entender cómo trabajan los equipos de tecnología en las grandes empresas? 
                            </p>
                            <p>
                                En esta actividad te convertirás en desarrollador por un día. Aprenderás a dar vida a una página usando HTML, CSS y JavaScript, y descubrirás cómo los verdaderos equipos de programación organizan sus ideas y proyectos usando la metodología SCRUM.
                            </p>
                            <p>
                                ¡Prepárate para pensar, crear y trabajar como un verdadero ingeniero!
                            </p>
                        </React.Fragment>
                    }
                    complement={
                        <React.Fragment>

                        </React.Fragment>
                    }
                />
            </main>
        </div>
    );
}
export default Index;