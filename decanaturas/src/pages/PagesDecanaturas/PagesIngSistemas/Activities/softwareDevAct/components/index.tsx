import React from 'react';
import { FaceImages, getImage } from './FaceImgList';
import NavBar from 'core/components/NavBar/components/NavBar';
import ActivityDescription from 'pages/PagesActividades/components/ActivityDescription';
import "../styles/styles.css";
import {NumberGenerator} from '../scripts/ActivityController';

function Index() {
    return (
        <React.Fragment>
            <NavBar ing="sistemas" ingName="Ingenieria de sistemas" />
            <main className="main-container">
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
                <div className="gif-container">
                    <img 
                        src={`${process.env.PUBLIC_URL}/resources/gif/actividades/ingSistemas/gif1.gif`}
                        alt="Desarrollo de software" 
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            height: 'auto',
                            borderRadius: '8px'
                        }}
                    />
                </div>
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

    const [activeEyes, setActiveEyes] = React.useState("ojo1");
    const [activeNose, setActiveNoses] = React.useState("nariz1");
    const [activeMouth, setActiveMouth] = React.useState("sonrisa1");
    const [interactiveFace, setInteractiveFace] = React.useState("");
    const [cssButton, setCssButton] = React.useState("Activar CSS");
    const [jsButton, setJsButton] = React.useState("Activar JS");
    const [jsActive, setJsActive] = React.useState(false);
    const keyButtonId = ["Activar", "Desactivar"];

    return (
        <React.Fragment>
            <div className={interactiveFace}>
                <div className= "eyes-container">
                    <img src={getImage("ojos", activeEyes)} alt="ojo izquierdo" className="face-Component"
                    onClick={() => jsActive && FaceComponentHandle({componentList: FaceImages.ojos, activeComponent: activeEyes, setActive: setActiveEyes, id: "ojo"})}
                    />
                    <img src={getImage("ojos", activeEyes)} alt="ojo derecho" className="face-Component right-eye"
                    onClick={() => jsActive && FaceComponentHandle({componentList: FaceImages.ojos, activeComponent: activeEyes,  setActive: setActiveEyes, id: "ojo"})}
                    />
                </div>
                <img src={getImage("narices", activeNose)} alt="nariz" className="face-Component"
                onClick={() => jsActive && FaceComponentHandle({componentList: FaceImages.narices, activeComponent: activeNose, setActive: setActiveNoses, id: "nariz"})}
                />
                <img src={getImage("sonrisas", activeMouth)} alt="sonrisa" className="face-Component"
                onClick={() => jsActive && FaceComponentHandle({componentList: FaceImages.sonrisas, activeComponent: activeMouth, setActive: setActiveMouth, id: "sonrisa"})}
                />
            </div>
            <div className="buttons-container">
                <button onClick={() => changeButtons({buttonText:cssButton, keyButtonId, setButtonText:setCssButton, setInteractiveFace})}className="custom-buttons">
                    {cssButton}
                </button>
                <button onClick={() => changeButtons({buttonText:jsButton, keyButtonId, setButtonText:setJsButton, setJsActive})}className="custom-buttons">
                    {jsButton}
                </button>
            </div>
        </React.Fragment>
    );
}

function changeButtons(props) {
    const textParts = props.buttonText.split(" ");
    const action = textParts[0];
    const technology = textParts[1];
    props.setButtonText(`${action === props.keyButtonId[0] ? props.keyButtonId[1] : props.keyButtonId[0]} ${technology}`);
    if(technology === "CSS"){
        props.setInteractiveFace(action === props.keyButtonId[0] ? "interactive-face" : "");
    }
    else{
        props.setJsActive(action === props.keyButtonId[0] ? true : false);
    }
}

function FaceComponentHandle(props){
    const listSize = Object.keys(props.componentList).length;
    const eyeNumber = NumberGenerator(listSize, props.activeComponent, props.id);
    props.setActive(props.id+eyeNumber);
}

export default Index;