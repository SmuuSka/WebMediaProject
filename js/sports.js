import SearchData from '../api/myHelsinkiApiNew.js';

const mainElem = document.querySelector("main");
const headerElem = document.getElementById('topHeader');
const searchButton = document.getElementById('hakunappi');
const testinappi = document.getElementById('testinappi');
const searchInputField = document.getElementById('hakuteksti');
const apiUrlSearchTab = "v1/events/?tags_filter=sports,";

let currentSearch;
let keyword;

function findSportData(){
    //Luetaan käyttäjänsyöte
    keyword = searchInputField.value;
    //Luodaan hakuolio
    currentSearch = new SearchData();
    //Tehdään haku
    currentSearch.doQuery(apiUrlSearchTab,keyword);
}

function naytaJotainDataa(){

    for (let i = 0; i < currentSearch.resultJson.length; i++){
        console.log(currentSearch.resultJson[i].name.fi);
    }
}

searchButton.addEventListener('click', findSportData);
testinappi.addEventListener('click', naytaJotainDataa);





