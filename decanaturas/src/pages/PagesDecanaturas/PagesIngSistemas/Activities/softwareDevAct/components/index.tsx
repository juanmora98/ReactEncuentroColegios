import React from 'react';
import { FaceImages, getImage } from './FaceImgList';
import NavBar from 'core/components/NavBar/components/NavBar';
import ActivityDescription from 'pages/PagesActividades/components/ActivityDescription';
import "../styles/styles.css";
import {NumberGenerator} from '../scripts/ActivityController';
import iconLupa from "resources/img/Sistemas/ActDiaIngeniero/icons/IconLupa.png";
import imagenConvinado from "resources/img/Sistemas/ActDiaIngeniero/icons/htmlcssjs.png";
import imagenIA from "resources/img/Sistemas/ActDiaIngeniero/icons/blackbox.png";

function Index() {
    return (
        <React.Fragment>
            <NavBar ing="sistemas" ingName="Ingenieria de sistemas" />
            <main className="main-container">
                <DescriptionContainer />
                <PresentationContainer />
                <InteractionContainer />
                <ScrumContainer />
                <ActivityContainer />
            </main>
        </React.Fragment>
    );
}

function PresentationContainer() {
    return (
        <React.Fragment>
            <div className="container">
                <h3>
                    DESARROLLO DE SOFTWARE
                </h3>
                <p>
                    El desarrollo de software ofrece múltiples caminos, siendo uno de los más populares la creación de aplicaciones y páginas web. Este campo se divide principalmente en dos áreas: el frontend, que se encarga de la interfaz visual con la que interactúa el usuario, y el backend, que gestiona la lógica del sistema, bases de datos y servidores. Ambos trabajan en conjunto para ofrecer experiencias funcionales y atractivas.
                </p>
                <div className="gif-container">
                    <img
                        src={`${process.env.PUBLIC_URL}/resources/gif/actividades/ingSistemas/gif1.gif`}
                        alt="Desarrollo de software"
                        className="gif-image"
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
        <div className="container">
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
        </div>
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

function ScrumContainer() {
    return (
        <div className="container scrum-container">
            <h3>SCRUM</h3>
            <p>
                SCRUM es un marco de trabajo ágil utilizado para gestionar proyectos complejos, especialmente en el desarrollo de software. Se basa en ciclos iterativos llamados sprints, que permiten entregar valor de manera incremental y adaptarse a los cambios rápidamente.
            </p>
            <div className="gif-container">
                <img
                    src={`${process.env.PUBLIC_URL}/resources/gif/actividades/ingSistemas/gif2.gif`}
                    alt="Desarrollo de software"
                    className="gif-image"
                />
            </div>
            <p>
                Los equipos SCRUM están compuestos por tres roles principales: el Product Owner, el Scrum Master y el Equipo de Desarrollo. El Product Owner se encarga de definir y priorizar los objetivos del proyecto, asegurando que se cumplan las necesidades del cliente. El Scrum Master facilita el proceso, eliminando obstáculos y promoviendo las prácticas ágiles. El Equipo de Desarrollo, por su parte, es responsable de crear los entregables del proyecto, colaborando estrechamente para alcanzar los objetivos del sprint.
            </p>
            <p>
                Cada rol es esencial para el éxito del equipo: el Product Owner garantiza la dirección correcta, el Scrum Master asegura la eficiencia del proceso y el Equipo de Desarrollo materializa las ideas en productos funcionales.
            </p>
            <div className="gif-container">
                <img
                    src={`${process.env.PUBLIC_URL}/resources/gif/actividades/ingSistemas/gif3.gif`}
                    alt="Desarrollo de software"
                    className="gif-image"
                />
            </div>
        </div>
    );
}

function ActivityContainer() {
    return (
        <React.Fragment>
            <div className="container">
                <h3>ACTIVIDAD</h3>
                <div className="text-container">
                    <p>
                        Ahora que has aprendido sobre el desarrollo de software y SCRUM, es tu turno de aplicar estos conocimientos. 
                        Tu tarea es crear una página web sencilla utilizando HTML, CSS y JavaScript, y organizar tu trabajo siguiendo la metodología SCRUM.
                    </p>
                    <p>
                        Formando equipos de 3 a 5 personas, cada uno asumirá un rol dentro del equipo SCRUM:  Scrum Master y equipo de desarrolladores.
                    </p>
                    <p>
                        El Scrum Master será el encargado de escuchar las tareas asignadas por el product owner y asegurar que el equipo siga las prácticas SCRUM, mientras que los desarrolladores se encargarán de implementar las funcionalidades de la página web.
                    </p>
                    <p>
                        Pueden utilizar las herramientas de desarrollo proporcionadas por el profesor para crear su proyecto.
                    </p>
                </div>
                <div className="container">
                    <h3>
                        RECURSOS Y HERRAMIENTAS
                    </h3>
                    <div className="resources-description">
                        <ResourceActivity title="DOCUMENTACION (PROFESOR)"
                            link="https://drive.google.com/file/d/14AcG9Kp1HwlRYGJs9VU7S0GahVcFN4kx/view?usp=drive_link"
                            img={iconLupa}
                        />
                        <ResourceActivity title="BLACKBOX IA"
                            link="https://www.blackbox.ai/"
                            img={imagenIA}
                        />
                        <ResourceActivity title="HTML CSS JS EDITOR"
                            link="https://html-css-js.com/"
                            img={imagenConvinado}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function ResourceActivity(props) {
    return (
        <div className="resource-item">
            <div className="resource-text">
                <h4>{props.title}</h4>
                <a href={props.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                    <img src={props.img} alt={props.title} className="resource-image" />
                </a>
            </div>
        </div>
    );
}

export default Index;