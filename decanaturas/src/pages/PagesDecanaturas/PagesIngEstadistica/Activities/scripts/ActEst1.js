export function AnswerValidation() {
    const question1= 9.4;   // Promedio de horas de estudio por semana
    const question2= 5;   // Moda en horas dedicadas a actividades extracurriculares
    const question3= 87.5; // Media de las calificaciones en Lengua

    // Obtener las respuestas ingresadas por el usuario
    const answer1 = parseFloat(document.getElementById("question1").value);
    const answer2 = parseFloat(document.getElementById("question2").value);
    const answer3 = parseFloat(document.getElementById("question3").value);

    // Verificar si todas las respuestas son correctas
    if (answer1 === question1 && answer2 === question2 && answer3 === question3) {
        // Cambiar el icono del candado a desbloqueado
        document.getElementById("mensajeFinal").className = "congratulation-message";
        document.getElementById("mensajeFinal").textContent = "🎉 ¡Has analizado correctamente los datos!";
        // Redirigir al reto 2 después de un breve mensaje de éxito
        return true;
    } else {
        document.getElementById("mensajeFinal").className = "error-message";
        document.getElementById("mensajeFinal").textContent = "Una o más respuestas son incorrectas. Inténtalo de nuevo.";
        return false;
    }
};