function GameNet() {
  return (
    <section className="activity">
      <h2>Actividad 3: Red de Computadoras y Servidores</h2>
      <div className="code-visual-container">
        <textarea id="code3" rows="10" spellcheck="false">
          # Asigna IPs para conectar computadoras a sus servidores
          # y conecta servidores a la nube
          grupoA = ["192.168.0.1", "192.168.0.2", "", "", ""]
          grupoB = ["", "192.168.1.2", "192.168.1.3", "", ""]
          servidorA = "192.168.0.100"
          servidorB = "192.168.1.10"
        </textarea>
        <div id="redVisual" className="network-display"></div>
      </div>
      <button onclick="conectarRed()">Ejecutar Código</button>
      <button onclick="reiniciarRed()">Reiniciar</button>
      <div id="resultado3" className="result-box"></div>
    </section>
  );
}

export default GameNet;