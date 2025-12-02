const MAX_POKEMON = 1025;

const choicesEl = document.getElementById('choices');
const pokemonNameEl = document.getElementById('pokemonName');
const resultText = document.getElementById('resultText');
const scoreEl = document.getElementById('score');
const roundsEl = document.getElementById('rounds');
const hitsEl = document.getElementById('hits');
const failsEl = document.getElementById('fails');
const newBtn = document.getElementById('newRound');
const resetBtn = document.getElementById('reset');

let state = { score:0, rounds:0, hits:0, fails:0, correctIndex:null };

function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min }

function spriteURL(id, shiny=false){
    const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
    return `${base}/${shiny ? 'shiny/' : ''}${id}.png`;
}

function createChoice(imgSrc, idx, isShiny=false, filterClass=''){
    const btn = document.createElement('div');
    btn.className = 'choice';
    if(filterClass) btn.classList.add(filterClass);
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Pokémon';
    btn.appendChild(img);
    btn.addEventListener('click', ()=>handlePick(idx, btn, isShiny));
    return btn;
}

function handlePick(idx, el, isShiny){
    Array.from(choicesEl.children).forEach(c=>c.classList.add('disabled'));
    state.rounds++;
    roundsEl.textContent = state.rounds;

    if(isShiny){
    state.hits++;
    state.score += 10;
    el.classList.add('correct');
    resultText.textContent = '¡Correcto! Has encontrado el variocolor.';
    } else {
    state.score = Math.max(0, state.score-2);
    state.fails++; // ← NUEVO
    el.classList.add('wrong');
    resultText.textContent = 'No es el variocolor. Sigue intentándolo.';
    if(state.correctIndex!=null){
        choicesEl.children[state.correctIndex].classList.add('correct');
    }
    }
    
    updateScoreboard();
}

function updateScoreboard(){
    scoreEl.textContent = state.score;
    hitsEl.textContent = state.hits;
    failsEl.textContent = state.fails;
}
function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
}

async function loadRound(){
    resultText.textContent = '';
    choicesEl.innerHTML = '';
    pokemonNameEl.textContent = 'Cargando...';

    const id = randInt(1, MAX_POKEMON);

    let name = 'Pokémon';
    try{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if(!res.ok) throw new Error('fetch');
    const data = await res.json();
    name = data.name;
    }catch(e){
    name = `#${id}`;
    }

    pokemonNameEl.textContent = name;

    const shinyURL = spriteURL(id, true);
    const normalURL = spriteURL(id, false);

    // Filtros bien distintos entre sí
    const filterClasses = [
        'fake-a',
        'fake-b',
        'fake-c',
        'fake-d',
        'fake-e',
        'fake-f'
    ];


    // Elegimos 3 sin repetir
    shuffle(filterClasses);
    const decoyFilters = filterClasses.slice(0, 3);


    const options = [];
    options.push({src:shinyURL, shiny:true, filter:''});
    decoyFilters.forEach(f => options.push({src:normalURL, shiny:false, filter:f}));

    shuffle(options);

    state.correctIndex = options.findIndex(o=>o.shiny);

    options.forEach((opt, i)=>{
    const node = createChoice(opt.src, i, opt.shiny, opt.filter);
    choicesEl.appendChild(node);
    });
}

newBtn.addEventListener('click', ()=> loadRound());
resetBtn.addEventListener('click', ()=>{
    state = { score:0, rounds:0, hits:0, fails:0, correctIndex:null };
    updateScoreboard();
    resultText.textContent = '';
    pokemonNameEl.textContent = '—';
    choicesEl.innerHTML = '';
});

loadRound();