document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('playerSlider');
    const countSpan = document.getElementById('playerCountVal');
    const container = document.getElementById('namesContainer');

    function updateInputs() {
        if (!slider || !countSpan || !container) return;

        const count = slider.value;
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
                <input type="text" name="playerNames" placeholder="Name for Player ${i + 1}" value="${val}" required>
            `;
            container.appendChild(div);
        }
    }

    if (slider) {
        slider.addEventListener('input', updateInputs);
        updateInputs();
    }
});