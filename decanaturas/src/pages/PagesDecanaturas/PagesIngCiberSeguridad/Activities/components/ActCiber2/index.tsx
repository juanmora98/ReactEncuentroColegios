import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import ActivityDescription from 'pages/PagesActividades/components/ActivityDescription';
import "../../styles/Act2.css"
import img1 from "resources/img/CiberSeguridad/Act2/img1.png";
import img2 from "resources/img/CiberSeguridad/Act2/img2.png";

function Index() {
    return (
        <React.Fragment>
            <NavBar ing="ciberseguridad" ingName="Ingenieria de ciberseguridad" />
            <main className="main-container">
                <DescriptionContainer />
                <PresentationContainer />
                <SocialContainer />
                <ActivityContainer />
            </main>
        </React.Fragment>
    );
}

function ActivityContainer() {
    return (
        <React.Fragment>
            <div className="container">
                <h3>ACTIVIDAD</h3>
                <div className="text-container">
                    <p>
                        Ahora que conoces los conceptos básicos de la ingeniería de ciberseguridad, es hora de poner a prueba tus habilidades. En esta actividad, te convertirás en un ingeniero de ciberseguridad y buscaras las vulnerabilidades en los usuarios de algunos de nuestros compañeros de clase.
                    </p>
                    <p>
                        Para llevar a cabo esta actividad, formarás equipos de 4 personas. Los 4 buscaran encontrar la contraseña de un usuario ficticio, que el profesor les proporcionará.
                    </p>
                    <p>
                        Deberas descargar el recurso que contiene la maquina virtual para completar la actividad. Una vez que hayas encontrado la contraseña, deberás presentarla al profesor para dar continuidad con la actividad.
                    </p>
                </div>
                <div className="container">
                    <h3>
                        RECURSOS Y HERRAMIENTAS
                    </h3>
                    <div className="resources-description">
                        <ResourceActivity title="MAQUINA VIRTUAL"
                            link="https://drive.google.com/drive/folders/166vy9IVaZR1TbXZi-UrWxPhoipPyoPJh?usp=sharing"
                            img={img2}
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


function SocialContainer() {
    return (
        <div className="container scrum-container">
            <h3>INGENIERIA SOCIAL</h3>
            <p>
                La ingeniería social es una técnica utilizada por los hackers para manipular a las personas y obtener información confidencial. A menudo, los atacantes se hacen pasar por entidades legítimas, como bancos o empresas de tecnología, para engañar a las víctimas y que estas revelen datos sensibles. Esta práctica resalta la importancia de la conciencia y la educación en ciberseguridad, ya que muchas veces el eslabón más débil en la cadena de seguridad es el ser humano.
            </p>
            <div className="gif-container">
                <img
                    src={img1}
                    alt="ingeniería social"
                    className="image"
                />
            </div>
            <p>
                Los equipos de ciberseguridad deben estar siempre alerta y capacitados para reconocer intentos de ingeniería social. Esto incluye identificar correos electrónicos sospechosos, llamadas telefónicas fraudulentas o mensajes de texto engañosos. La formación continua y la simulación de ataques son herramientas clave para fortalecer la defensa contra estas amenazas.
            </p>
        </div>
    );
}


function PresentationContainer() {
    return (
        <React.Fragment>
            <div className="container">
                <h3>
                    ACCESOS PELIGROSOS
                </h3>
                <p>
                    En el mundo digital, la seguridad se ha convertido en un problema creciente, pero muchas personas aún no son conscientes de los riesgos. El uso de contraseñas débiles o repetidas expone su información personal a ataques y robos de datos. Protegerse empieza por adoptar buenas prácticas, como crear contraseñas seguras y únicas para cada plataforma.
                </p>
                <div className="gif-container">
                    <img
                        src={`${process.env.PUBLIC_URL}/resources/gif/actividades/ingCiberseguridad/gif1.gif`}
                        alt="Desarrollo de software"
                        className="gif-image"
                    />
                </div>
                <p>
                    Los hackers poseen amplios conocimientos técnicos, pero en muchos casos no necesitan recurrir a ellos para obtener información. Basta con una conversación bien dirigida para que una persona, sin darse cuenta, revele datos clave. Este tipo de engaño, conocido como ingeniería social, demuestra que la seguridad no depende solo de la tecnología, sino también del comportamiento humano.
                </p>
            </div>
        </React.Fragment>
    );
}

function DescriptionContainer() {
    return(
        <div className="container">
            <ActivityDescription
            title="¡Bienvenido a la actividad de Ingeniería de ciberseguridad!"
            activityTitle="¡Dia como ingeniero!"
            subtitle="¡El primer paso hacia el futuro!"
            description={
                <React.Fragment>
                    <p>
                        ¿Te has imaginado cómo es el día a día de un ingeniero en ciberseguridad?
                    </p>
                    <p>
                        En esta actividad, te pondras en los zapatos de uno, como este se enfrenta constantemente a amenazas digitales, trabajando para detectar vulnerabilidades, prevenir ataques y proteger la información de personas y organizaciones. No se trata solo de tecnología, sino de responsabilidad, análisis constante y la misión de mantener a salvo un entorno cada vez más conectado.
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

export default Index;