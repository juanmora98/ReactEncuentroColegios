import {Parameters} from 'core/scripts/Parameters';

const parameters = Parameters();

export function AnswerValidation() {
    const input = document.getElementById("textInput").value.trim().toLowerCase();
    const mensaje = document.getElementById("mensaje");
    const correctText = parameters.INCIBER_CODE.toLowerCase();
    if (input === "") {
        mensaje.textContent = "⚠️ Debes ingresar un texto para continuar.";
        mensaje.className = "mensaje-tip empty";
    } else if (input !== correctText) {
        mensaje.textContent = "❌ El texto ingresado no es correcto. Intenta de nuevo.";
        mensaje.className = "mensaje-tip error";
    } else {
        mensaje.textContent = "✅ ¡Texto correcto! Puedes continuar.";
        mensaje.className = "mensaje-tip";
        return true;
    }
}

export function CodeTransformation(inputText) {
    const baseText = inputText.toLowerCase();
    const baseString = 'abcdefghijklmnopqrstuvwxyzáéíóúüñ ,.';
    const cypherCode = 'frjboxvidzkcwqsmuantglhyep1234567 ,.';
    return Encrypt({ text: baseText, original: baseString, criptedString: cypherCode });
}

function Encrypt(props) {
  let result = '';
  for (let char of props.text) {
    const idx = props.original.indexOf(char);
    result += idx !== -1 ? props.criptedString[idx] : char;
  }
  return result;
}

