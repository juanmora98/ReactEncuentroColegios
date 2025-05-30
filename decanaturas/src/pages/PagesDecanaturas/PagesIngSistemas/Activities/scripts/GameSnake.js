let estadoCulebra = { snake: [1, 1], apples: [[0, 0], [3, 3]] };

export function moverCulebra(props) {
    const code = document.getElementById("code2").value;
    const posMatch = code.match(/move\s*=\s*\[(-?\d+),\s*(-?\d+)\]/);
    const move = [parseInt(posMatch[1]), parseInt(posMatch[2])];
    const nuevaFila = estadoCulebra.snake[0] + move[0];
    const nuevaCol = estadoCulebra.snake[1] + move[1];
    if (
        nuevaFila < 0 || nuevaFila >= 5 ||
        nuevaCol < 0 || nuevaCol >= 5
      ) {
        const r = document.getElementById("resultado2");
        r.textContent = "No puedes moverte en esa direccion en este momento";
      }
    else{
        if (posMatch) {
            estadoCulebra.snake[0] += move[0];
            estadoCulebra.snake[1] += move[1];
            // Eliminar manzana si coincide
            estadoCulebra.apples = estadoCulebra.apples.filter(
                m => !(m[0] === estadoCulebra.snake[0] && m[1] === estadoCulebra.snake[1])
            );

            dibujarMatriz();
            const r = document.getElementById("resultado2");
            if (estadoCulebra.apples.length === 0) {
                props.gamesInstance.validationActivities(1);
                props.onActivityComplete();
                r.textContent = "¡Comiste todas las manzanas!";
                r.style.color = "green";
            } else {
                r.textContent = "Aún quedan manzanas.";
                r.style.color = "orange";
            }
        }
    }

}

export function reiniciarCulebra() {
    estadoCulebra = { snake: [1, 1], apples: [[0, 0], [3, 3]] };
    dibujarMatriz();
    document.getElementById("resultado2").textContent = "";
}

export function dibujarMatriz() {
    const matriz = document.getElementById("matrizJuego");
    matriz.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const celda = document.createElement("div");
            if (estadoCulebra.snake[0] === i && estadoCulebra.snake[1] === j) {
                celda.textContent = "🐍";
            } else if (estadoCulebra.apples.some(a => a[0] === i && a[1] === j)) {
                celda.textContent = "🍎";
            }
            matriz.appendChild(celda);
        }
    }
}