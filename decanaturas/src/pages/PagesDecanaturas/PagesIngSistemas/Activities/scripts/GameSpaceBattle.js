export function Attack(props) {
    const code = document.getElementById("code1").value;
    const r = document.getElementById("resultado1");
    let player_damage = 10, marciano_hp = 50;
    const dmgMatch = code.match(/player_damage\s*=\s*(\d+)/);
    const hpMatch = code.match(/marciano_hp\s*=\s*(\d+)/);
    if (dmgMatch) player_damage = parseInt(dmgMatch[1]);
    if (hpMatch) marciano_hp = parseInt(hpMatch[1]);
    if (player_damage >= marciano_hp) {
        props.gamesInstance.validationActivities(0);
        props.onActivityComplete();
        r.textContent = "¡Marciano derrotado!";
        r.style.color = "green";
    } else {
        r.textContent = "Aún no puedes vencer al marciano.";
        r.style.color = "red";
    }
}