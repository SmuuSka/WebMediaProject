'use strict';
/*
	Haetaan dataa open-api.myhelsinki.fi palvelusta hakusanalla 'restaurants'.
	Hakuosoite on silloin:
	https://open-api.myhelsinki.fi/v2/places/?tags_search=restaurants

	Haku palauttaa tästä rajapinnasta 3 pääavainta: meta, data, tags.
	Avaimen 'data' alta löytyy nyt ravintoloiden tietoja.
	Avaimen 'tags' alta lista hakusanoista.

*/

// normaalin hakuosoitteen vakio-osa.
const apiurl = 'https://open-api.myhelsinki.fi/v2/places/?tags_filter=';

// välityspalvelimen (AllOrigins) osoite CORS-ongelman ratkaisemiseen
const proxy = 'https://api.allorigins.win/get?url=';

// hakukysely, jolla dataa haetaan ilman proxya (AllOrigins).
let apiKysely;
// hakukysely, johon on lisätty vielä proxyn vaatima lisäys
let proxyApikysely;

// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const hakutekst = document.getElementById('hakuteksti');
const hakunappi = document.getElementById("hakunappi");


hakunappi.addEventListener('click', teeKysely);



function teeKysely() {

    let hakusana = 'restaurants';

    // muodostetaan ja tulostetaan konsoliin lopullinen hakukysely

    apiKysely = apiurl + hakusana;
    console.log('normaali hakukysely: ' + apiKysely);

    // lisätään vielä proxyn osoite (CORS ongelmien ratkaisija)
    proxyApikysely = proxy + encodeURIComponent(apiKysely);
    console.log("cors-kysely: " + proxyApikysely);


    teeHaku(proxyApikysely);        // parametrina proxyn osoite + hakulause
}
function teeHaku(hakuKysely)  {

    // suoritetaan hakukysely, fetch hoitaa mahdolliset tietoliikenneongelmat.
    fetch(hakuKysely).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json);				// siirrytään varsinaisen datan käsittelyyn.
    }).catch(function(error){           // Jos tapahtuu virhe,
        console.log(error);             // kirjoitetaan virhe konsoliin.
    });
}
// Näytetään (rakenetaan lista)
function naytaVastaus(proxynData) {

    let kaikkiJsonData = JSON.parse(proxynData.contents);

    console.log(kaikkiJsonData.data);
    let jsonData = kaikkiJsonData.data;

    // tässä valmistellaan listaa :)
    for (let i = 0; i < jsonData.length; i++) {

        let stringname = jsonData[i].name.fi;
        let hakusanakaks = hakutekst.value.toUpperCase();
        let strincarz = stringname.charAt(0);
        let hakuzero = hakusanakaks.charAt(0);
        //console.log(stringified);

        // jos etsitty tasaisella nimellä
        if (stringname.toLowerCase() === hakutekst.value.toLowerCase()){
            let ul = document.getElementById('Mainlistele')
            let list = document.createElement('li')
            list.innerText = jsonData[i].name.fi;
            console.log("ravintolan nimi: " + jsonData[i].name.fi);
            ul.appendChild(list);
            break;
        }

        // jos etsitty kirjaimilla
        if (strincarz === hakuzero) {

            let ul = document.getElementById('Mainlistele')
            let list = document.createElement('li')
            list.innerText = jsonData[i].name.fi;
            console.log("ravintolan nimi: " + jsonData[i].name.fi);

            ul.appendChild(list);

            // jos ei ole syötetty mitään, tulostaa kaiken.
        }else if (hakusanakaks === ''){
            let ul = document.getElementById('Mainlistele')
            let list = document.createElement('li')
            let listosoite = document.createElement('li');
            let br = document.createElement("br");
            listosoite.innerText = jsonData[i].location.lot;
            list.innerText = jsonData[i].name.fi;
            console.log("Tulostetaan Kaikki raflat ");

            ul.appendChild(list);
            ul.appendChild(listosoite);
            ul.appendChild(br);
        }

    }
}



