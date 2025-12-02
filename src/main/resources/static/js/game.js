function manageClick(element) {
    // If already seen, do nothing
    if (element.classList.contains('seen')) return;

    const nombre = element.getAttribute('data-nombre');
    const rol = element.getAttribute('data-rol');
    const palabra = element.getAttribute('data-palabra');

    markCardAsSeen(element);
    revealRole(nombre, rol, palabra);
}

function markCardAsSeen(element) {
    element.classList.add('seen');

    element.innerHTML = `
        <div class="seen-content">
            <div class="check-icon">
                <svg viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            </div>
            <div class="seen-text">Visto</div>
        </div>
    `;
}

function revealRole(nombre, rol, palabra) {
    document.getElementById('modalName').innerText = nombre;

    const roleElem = document.getElementById('modalRole');
    const wordElem = document.getElementById('modalWord');
    const wordLabel = document.getElementById('modalWordLabel');
    const imgElem = document.getElementById('pokemonImg');

    if (rol === 'Impostor') {
        roleElem.innerText = "IMPOSTOR";
        roleElem.style.color = "#ff4757"; // Red

        wordElem.style.display = 'none';
        imgElem.style.display = 'none'; // Impostor does not have any image

        wordLabel.innerText = "Intenta descubrir la palabra de los demás.";
    } else {
        roleElem.innerText = "ENTRENADOR";
        roleElem.style.color = "#2ed573"; // Green

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