import React, { useEffect } from 'react';
import { FaceImages, getImage } from './FaceImgList';
import NavBar from 'core/components/NavBar/components/NavBar';
import ActivityDescription from 'pages/PagesActividades/components/ActivityDescription';
import "../styles/styles.css";

function Index() {
    return (
        <React.Fragment>
            <NavBar ing="sistemas" ingName="Ingenieria de sistemas" />
            <main>
                <DescriptionContainer />
                <PresentationContainer />
                <InteractionContainer />
            </main>
        </React.Fragment>
    );
}

function PresentationContainer() {
    return (
        <React.Fragment>
            <div className="presentation-Container">
                <p>
                    El desarrollo de software ofrece múltiples caminos, siendo uno de los más populares la creación de aplicaciones y páginas web. Este campo se divide principalmente en dos áreas: el frontend, que se encarga de la interfaz visual con la que interactúa el usuario, y el backend, que gestiona la lógica del sistema, bases de datos y servidores. Ambos trabajan en conjunto para ofrecer experiencias funcionales y atractivas.
                </p>
                <img src="" alt="" />
                <p>
                    En el mundo del desarrollo web, el frontend se apoya en tecnologías clave como HTML, CSS y JavaScript. HTML estructura el contenido de la página, CSS se encarga del diseño y estilo visual, y JavaScript añade interactividad y dinamismo. Juntas, estas herramientas hacen posible la experiencia que el usuario ve y utiliza en su navegador.
                </p>
                
            </div>
            
        </React.Fragment>
    );
}

function DescriptionContainer() {
    return(
        <div className="container">
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
        </div>
    );
}

function InteractionContainer() {
    
    useEffect(() => {
        // JavaScript para interactividad del rostro
        const addInteractivity = () => {
            const leftEye = document.getElementById('left-eye');
            const rightEye = document.getElementById('right-eye');
            const mouth = document.getElementById('mouth');
            const nose = document.getElementById('nose');
            const face = document.getElementById('interactive-face');

            // Función para cambiar expresión de la boca
            const changeMouth = () => {
                if (mouth) {
                    const expressions = ['😊', '😮', '🤔', '😄', '👄'];
                    const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
                    mouth.textContent = randomExpression;
                }
            };

            // Función para mover la nariz
            const moveNose = () => {
                if (nose) {
                    nose.style.transform = 'rotate(10deg)';
                    setTimeout(() => {
                        nose.style.transform = 'rotate(0deg)';
                    }, 300);
                }
            };
            
            if (mouth) {
                mouth.addEventListener('click', changeMouth);
            }
            
            if (nose) {
                nose.addEventListener('mouseenter', moveNose);
            }

        };

        // Ejecutar después de que el componente se monte
        setTimeout(addInteractivity, 100);
    }, []);

    return (
        <React.Fragment>
            <div className="interaction-section">
                <div className="face-demo">
                    <div id="interactive-face" className="interactive-face">
                        <div className="face-row hair-row">
                            <span className="hair">💇‍♂️</span>
                        </div>
                        
                        <div className="face-row eyes-row">
                            <span id="left-eye" className="eye left-eye">
                                <img src={getImage("ojos", "ojo1")} alt="ojo izquierdo" />
                            </span>
                            <span className="space"></span>
                            <span id="right-eye" className="eye right-eye">
                                <img src={getImage("ojos", "ojo1")} alt="ojo derecho" />
                            </span>
                        </div>
                        
                        <div className="face-row nose-row">
                            <span className="space"></span>
                            <span id="nose" className="nose">👃</span>
                            <span className="space"></span>
                        </div>   
                        <div className="face-row mouth-row">
                            <span id="mouth" className="mouth">
                                <img src={getImage("sonrisas", "sonrisa1")} alt="sonrisa" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Index;