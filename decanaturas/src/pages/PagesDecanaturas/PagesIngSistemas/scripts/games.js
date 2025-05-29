
let completado1 = false, completado2 = false, completado3 = false;

// Inicializar variables de estado
window.onload = function () {
    //dibujarMatriz(); // Esto mostrará el tablero bonito desde el inicio
   // inicializarRed();
};
// Verifica final
function verificarTodo() {
    if (completado1 && completado2 && completado3) {
        document.getElementById("mensajeFinal").textContent = "🎉 ¡Has completado todas las actividades!";
        //changeWindow("Ing", "/IngenieriaCiberseguridad/Actividades/A1");
    }
}