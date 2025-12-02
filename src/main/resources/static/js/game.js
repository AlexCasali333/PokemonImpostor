function manageClick(elemento) {
    const nombre = elemento.getAttribute('data-nombre');
    const rol = elemento.getAttribute('data-rol');
    const palabra = elemento.getAttribute('data-palabra');
    revealRole(nombre, rol, palabra);
}

function revealRole(nombre, rol, palabra) {
    document.getElementById('modalName').innerText = nombre;

    const roleElem = document.getElementById('modalRole');
    const wordElem = document.getElementById('modalWord');
    const wordLabel = document.getElementById('modalWordLabel');
    const imgElem = document.getElementById('pokemonImg');

    if (rol === 'Impostor') {
        roleElem.innerText = "IMPOSTOR";
        roleElem.style.color = "#ff4757"; // Rojo

        wordElem.style.display = 'none';
        imgElem.style.display = 'none'; // Impostor does not have any image

        wordLabel.innerText = "Intenta descubrir la palabra de los demás.";
    } else {
        roleElem.innerText = "ENTRENADOR";
        roleElem.style.color = "#2ed573"; // Verde

        wordElem.innerText = palabra;
        wordElem.style.display = 'block';
        wordLabel.innerText = "Tu palabra secreta es:";

        // Logic to load and show the Pokémon image, for instance: Mr. Mime
        // We use Hotlinking from PokemonDB
        let pokemonName = palabra.toLowerCase()
            .replace(/\./g, '')
            .replace(/'/g, '')
            .replace(/\s+/g, '-')
            .replace(/♀/g, '-f')
            .replace(/♂/g, '-m');

        imgElem.src = `https://img.pokemondb.net/sprites/home/normal/${pokemonName}.png`;
        imgElem.style.display = 'block';
    }

    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('pokemonImg').src = '';
    document.getElementById('pokemonImg').style.display = 'none';
}