document.addEventListener('DOMContentLoaded', function() {
    const btnMinus = document.getElementById('removePlayer');
    const btnPlus = document.getElementById('addPlayer');
    const countSpan = document.getElementById('playerCountVal');
    const container = document.getElementById('namesContainer');

    // Valor inicial
    let count = parseInt(countSpan.innerText) || 1;

    function updateInputs() {
        if (!countSpan || !container) return;

        countSpan.innerText = count;

        const currentValues = [];
        document.querySelectorAll('input[name="playerNames"]').forEach(input => {
            currentValues.push(input.value);
        });

        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const val = currentValues[i] || '';
            const div = document.createElement('div');
            div.className = 'input-group';
            div.innerHTML = `
                <input type="text" name="playerNames" placeholder="Jugador ${i + 1}" value="${val}" required>
            `;
            container.appendChild(div);
        }
    }

    // ➕ Añadir jugador
    btnPlus.addEventListener('click', () => {
        if (count < 10) {
            count++;
            updateInputs();
        } else {
            alert("Máximo 10 jugadores");
        }
    });

    // ➖ Quitar jugador
    btnMinus.addEventListener('click', () => {
        if (count > 3) {
            count--;
            updateInputs();
        } else {
            alert("Minimo 3 jugadores");
        }
    });

    updateInputs();
});
