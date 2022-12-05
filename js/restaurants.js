import SearchData from "../api/myHelsinkiApiNew.js";
import MapData from "../js/MapApi.js";

//const apiUrlSearchTab = "v2/places/?name_filter=";
//const apiUrlSearchTab = 'v1/events/?tags_filter=sports,';
const apiUrlSearchTab = "v2/places/?tags_filter=restaurants,";

'use strict';

//const hakutekst = document.getElementById('hakuteksti');
//const hakunappi = document.getElementById("hakunappi");

const hakutekstii = document.getElementById('hakutekstii');
const hakunappii = document.getElementById("hakunappii");
//let karttanappi = '';


//hakunappi.addEventListener('click', () => findRestaurant(hakutekst.value));
hakunappii.addEventListener('click', () => realRestaurantSearch(hakutekstii.value));
//hakunappi.addEventListener('click', () => showMap(60.1704, 24.9522))


let currentSearch = "";

let lanReal = '';
let lonReal = '';
let currentMAP = '';
let counter = 0;
let ul = '';
let ull = '';
let list = "";
let article = '';
let ldr = '';
let mapoptiondata =
    {enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0};
//let n = 0;

findRestaurant("");

function findRestaurant(data){

    currentSearch = new SearchData();
    currentMAP = new MapData();

    currentSearch.doQuery(apiUrlSearchTab, data);
    //console.log('current search' + currentSearch.resultJson[0].name.fi);
    console.log(data);

    article = document.getElementById('loaderBlock');
    article.innerHTML = `<img class="loader-icon" id="loadIcon" src="../LoadingGifs/workingLoadingAnimation.gif" alt="loadingGif">`;



    setTimeout(function (){

        let hakusana = data;
        console.log("Tässä palautuksen pituus: " + currentSearch.resultJson.length);
        //console.log(currentSearch.resultJson[0].name);
        console.log(hakusana.length);

        for (let i = 0; i < currentSearch.resultJson.length; i++) {

            //console.log(currentSearch.resultJson[0]);
            console.log('sisällä loopissa');
            let stringname = currentSearch.resultJson[i].name.fi;
            //console.log(stringname);
            //let stringname = jsonData[i].name.fi;
            let hakusanakaks = hakusana.toUpperCase();
            let strincarz = stringname.charAt(0);
            let hakuzero = hakusanakaks.charAt(0);

            //console.log(stringified);

            // jos etsitty tasaisella nimellä
            if (stringname.toLowerCase() === data.toLowerCase()){

                console.log("Sisällä kokosanassa");
                ul = document.getElementById('Mainlistele')
                list = document.createElement('li')
                let address = document.createElement('li');
                let email = document.createElement('li');
                let desc = document.createElement('li');
                list.innerText = currentSearch.resultJson[i].name.fi;
                address.innerText = currentSearch.resultJson[i].location.address.street_address + ' , ';
                address.innerText += currentSearch.resultJson[i].location.address.postal_code + ' , ';
                address.innerText += currentSearch.resultJson[i].location.address.locality;
                email.innerText = currentSearch.resultJson[i].info_url;
                desc.innerText = currentSearch.resultJson[i].description.intro;
                console.log("ravintolan nimi(solo): " + currentSearch.resultJson[i].name.fi);
                //let langi = document.createElement('li');
                //let longi = document.createElement('li');
                //langi.innerText = currentSearch.resultJson[i].location.lat;
                //longi.innerText = currentSearch.resultJson[i].location.lon;
                //langi.id = 'lan' + n;
                //longi.id = 'lon' + n;
                //let but =document.createElement('button');
                //but.innerText = 'Avaa kartta';
                //but.id = 'mapBut';
                ul.appendChild(list);
                ul.appendChild(address);
                ul.appendChild(email);
                ul.appendChild(desc);
                //ul.appendChild(but);
                //ul.appendChild(langi);
                //ul.appendChild(longi);
                lanReal = currentSearch.resultJson[i].location.lat;
                lonReal = currentSearch.resultJson[i].location.lon;
                showMap(lanReal, lonReal)
                console.log(lanReal, lonReal);

                break;
            }

            // jos etsitty kirjaimilla
            else if (strincarz === hakuzero && hakusana.length === 1) {

                ul = document.getElementById('Mainlistele')
                list = document.createElement('li')
                let br = document.createElement("br");
                list.innerText = currentSearch.resultJson[i].name.fi;
                console.log("ravintolan nimi(ekakirjain): " + currentSearch.resultJson[i].name.fi);
                //let langi = document.createElement('li');
                //let longi = document.createElement('li');
                //langi.innerText = currentSearch.resultJson[i].location.lat;
                //longi.innerText = currentSearch.resultJson[i].location.lon;
                //langi.id = 'lan';
                //longi.id = 'lon';
                //let but =document.createElement('button');
                //but.innerText = 'Avaa kartta';
                //but.id = 'mapBut';

                ul.appendChild(list);
                ul.appendChild(br)
                //ul.appendChild(but);
                //ul.appendChild(langi);
                //ul.appendChild(longi);

                // jos ei ole syötetty mitään, tulostaa kaiken.
            }else if (hakusanakaks === '' && currentSearch.resultJson[i].tags[0].name === 'restaurants'){
                ul = document.getElementById('Mainlistele')
                list = document.createElement('li')
                let listosoite = document.createElement('li');
                let br = document.createElement("br");

                listosoite.innerText += currentSearch.resultJson[i].location.lat;
                listosoite.innerText += currentSearch.resultJson[i].location.lon;
                list.innerText = currentSearch.resultJson[i].name.fi;
                //console.log("Tulostetaan Kaikki raflat ");
                //let but =document.createElement('button');
                //but.innerText = 'Avaa kartta';
                //but.id = currentSearch.resultJson[i].name.fi;


                ul.appendChild(list);
                //ul.appendChild(listosoite);
                //ul.appendChild(but);
                ul.appendChild(br);

            }

        }
        testi();
    }, 5000)


}
function testi(){
    let loader = document.getElementById('loadIcon');
    loader.remove();
    console.log("Tässä palautuksen pituus: " + currentSearch.resultJson.length);
    console.log('testi funktiossa: ' + currentSearch.resultJson[1].name.fi);
}

function realRestaurantSearch(name){

    let x = false;


    ull = document.getElementById('secondList');
    ull.innerHTML = '';


    for (let j = 0; j < currentSearch.resultJson.length; j++) {

        //console.log(currentSearch.resultJson[0]);
        console.log('sisällä loopissa 2');
        let stringname = currentSearch.resultJson[j].name.fi;
        //console.log(stringname);
        //let stringname = jsonData[i].name.fi;
        let hakusanakaks = name.toUpperCase();
        //let strincarz = stringname.charAt(0);
        //let hakuzero = hakusanakaks.charAt(0);

        //console.log(stringified);

        // jos etsitty tasaisella nimellä
        if (stringname.toLowerCase() === name.toLowerCase()) {

            console.log("Sisällä kokosanassa");
            let ull = document.getElementById('secondList')
            list = document.createElement('li')
            let address = document.createElement('li');
            let email = document.createElement('a');
            email.href = currentSearch.resultJson[j].info_url;
            email.innerText = currentSearch.resultJson[j].info_url;
            let desc = document.createElement('li');
            list.innerText = currentSearch.resultJson[j].name.fi;
            address.innerText = currentSearch.resultJson[j].location.address.street_address + ' , ';
            address.innerText += currentSearch.resultJson[j].location.address.postal_code + ' , ';
            address.innerText += currentSearch.resultJson[j].location.address.locality;
            //email.innerText = currentSearch.resultJson[j].info_url;
            desc.innerText = currentSearch.resultJson[j].description.intro;
            console.log("ravintolan nimi(solo): " + currentSearch.resultJson[j].name.fi);
            //let langi = document.createElement('li');
            //let longi = document.createElement('li');
            //langi.innerText = currentSearch.resultJson[i].location.lat;
            //longi.innerText = currentSearch.resultJson[i].location.lon;
            //langi.id = 'lan' + n;
            //longi.id = 'lon' + n;
            //let but =document.createElement('button');
            //but.innerText = 'Avaa kartta';
            //but.id = 'mapBut';
            ull.appendChild(list);
            ull.appendChild(address);
            ull.appendChild(email);
            ull.appendChild(desc);
            //ul.appendChild(but);
            //ul.appendChild(langi);
            //ul.appendChild(longi);
            //lanReal = currentSearch.resultJson[j].location.lat;
            //lonReal = currentSearch.resultJson[j].location.lon;
            //showMap(lanReal, lonReal)
            console.log(lanReal, lonReal);


            if (counter == 1) {
                currentMAP.mapleaf.remove();
                counter = 0;
            }
            currentMAP.posLat = currentSearch.resultJson[j].location.lat;
            currentMAP.posLong = currentSearch.resultJson[j].location.lon;
            currentMAP.mapleaf = L.map('map').setView([currentMAP.posLat, currentMAP.posLong], 13);
            currentMAP.options = mapoptiondata;

            if (currentSearch.resultJson[j].location.lat == null && currentSearch.resultJson[j].location.lon == null) {
                console.log("NOMAPLOCATION ALSO NO BUTTON FOR IT");
            } else {
                currentMAP.Lmarker = L.marker([currentMAP.posLat, currentMAP.posLong]).addTo(currentMAP.mapleaf).bindPopup("TÄÄLLÄ");
                //currentMAP.Lmarker = L.marker([currentMAP.posLat, currentMAP.posLong]).addTo(currentMAP.mapleaf).bindPopup(currentSearch.resultJson[j + 1].name);
                counter = 1;
            }
            console.log("GOTLOCATION")
            currentMAP.showMap();

            x = true;


            /*
            currentMAP.posLat = currentSearch.resultJson[j].location.lat;
            currentMAP.posLong = currentSearch.resultJson[j].location.lon;
            currentMAP.mapleaf = L.map('map').setView([currentMAP.posLat, currentMAP.posLong], 13);
            currentMAP.options = mapoptiondata;
            currentMAP.Lmarker = L.marker([currentMAP.posLat, currentMAP.posLong]).addTo(currentMAP.mapleaf).bindPopup(currentSearch.resultJson[j].name);

            console.log("GOTLOCATION")
            currentMAP.showMap();
            break;

             */
        }

    }

    if (x === false){
        let ull = document.getElementById('secondList')
        list = document.createElement('li')
        let error = document.createElement('li');
        let fix = document.createElement('li');
        let desc = document.createElement('li');

        list.innerText = 'TAPAHTUI VIRHE!!!';
        error.innerText = 'Taisi tapahtua näppäily virhe.';
        fix.innerText = 'Hake ravintolaa viereisestä listasta löytyvällä kokonimellä.'
        desc.innerText = 'YRITÄ UUDELLEEN!'

        ull.appendChild(list);
        ull.appendChild(error);
        ull.appendChild(fix);
        ull.appendChild(desc);
    }
}






