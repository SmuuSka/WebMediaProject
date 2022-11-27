import Haku from '../api/testiapi.js';

const mainElem = document.querySelector("main");
const headerElem = document.getElementById('topHeader');
const hakunappi = document.getElementById('hakunappi');
const hakuteksti = document.getElementById('hakuteksti');
const apiUrlSearchTab = "sports";

let hakusana;
function muokkaaTeksti(){
     hakusana = hakuteksti.value;
     return hakusana;
}

function haeUrheilu(){
    let haku = new Haku();
    haku.teeKysely(muokkaaTeksti(),apiUrlSearchTab);
}

hakunappi.addEventListener('click', haeUrheilu);





