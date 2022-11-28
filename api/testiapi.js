'use strict';

//Kiinteä haku Url tapahtumien hakuun
const apiurl = 'https://open-api.myhelsinki.fi/';
//Kiinteä proxy Url
const proxy = 'https://api.allorigins.win/get?url=';


export default class Haku {
    constructor() {
    }
    //hakusana on käyttäjän syöttämä
    //hakusivu on sivuston välilehdestä riippuvainen
    teeKysely(hakusana, hakusivu) {
        console.log("Moro vaan täältä teeKysely-funktiosta");

    // muodostetaan ja tulostetaan konsoliin lopullinen hakukysely
    let apiKysely = apiurl + hakusivu + hakusana;
    console.log('normaali hakukysely: ' + apiKysely);

    // lisätään vielä proxyn osoite (CORS ongelmien ratkaisija)
        let proxyApikysely = proxy + encodeURIComponent(apiKysely);
    console.log("cors-kysely: " + proxyApikysely);

    teeHaku(proxyApikysely);        // parametrina proxyn osoite + hakulause
    }
}

function teeHaku(hakuKysely)  {
    console.log("Hakukyselyssä");
    // suoritetaan hakukysely, fetch hoitaa mahdolliset tietoliikenneongelmat.
    fetch(hakuKysely).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json);				// siirrytään varsinaisen datan käsittelyyn.
    }).catch(function(error){           // Jos tapahtuu virhe,
        console.log(error);             // kirjoitetaan virhe konsoliin.
    });
}
//Näytetään (rakenetaan lista)
function naytaVastaus(proxynData) {

    let kaikkiJsonData = JSON.parse(proxynData.contents);
    let jsonData = kaikkiJsonData.data;
    console.log(jsonData.length);
    // tässä valmistellaan listaa :)
    for (let i = 0; i < jsonData.length; i++) {

        let stringname = jsonData[i].name.fi;
        let hakusanaksi = hakuteksti.value;
        let strincarz = stringname.charAt(0);
        let hakuzero = hakusanaksi.charAt(0);
        console.log(stringname);
    }
}


    // tässä valmistellaan listaa :)
    // for (let i = 0; i < jsonData.length; i++) {
    //
    //     let stringname = jsonData[i].name.fi;
    //     let hakusanaksi = hakuteksti.value.toUpperCase();
    //     let strincarz = stringname.charAt(0);
    //     let hakuzero = hakusanaksi.charAt(0);
    //     //console.log(stringified);
    //
    //     // jos etsitty tasaisella nimellä
    //     if (stringname.toLowerCase() === hakuteksti.value.toLowerCase()){
    //         let ul = document.getElementById('Mainlistele')
    //         let list = document.createElement('li')
    //         list.innerText = jsonData[i].name.fi;
    //         console.log("ravintolan nimi: " + jsonData[i].name.fi);
    //         ul.appendChild(list);
    //         break;
    //     }
    //
    //     // jos etsitty kirjaimilla
    //     if (strincarz === hakuzero) {
    //
    //         let ul = document.getElementById('Mainlistele')
    //         let list = document.createElement('li')
    //         list.innerText = jsonData[i].name.fi;
    //         console.log("ravintolan nimi: " + jsonData[i].name.fi);
    //
    //         ul.appendChild(list);
    //
    //         // jos ei ole syötetty mitään, tulostaa kaiken.
    //     }else if (hakusanaksi === ''){
    //         let ul = document.getElementById('Mainlistele')
    //         let list = document.createElement('li')
    //         let listosoite = document.createElement('li');
    //         let br = document.createElement("br");
    //         listosoite.innerText = jsonData[i].location.lot;
    //         list.innerText = jsonData[i].name.fi;
    //         console.log("Tulostetaan Kaikki raflat ");
    //
    //         ul.appendChild(list);
    //         ul.appendChild(listosoite);
    //         ul.appendChild(br);
    //     }
    // }




