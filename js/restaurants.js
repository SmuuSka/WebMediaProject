import SearchData from "../api/myHelsinkiApiNew.js";
import MapData from "../js/MapApi.js";

const apiUrlSearchTab = "v2/places/?tags_filter=restaurants,";

'use strict';

const hakutekstii = document.getElementById('hakutekstii');
const hakunappii = document.getElementById("hakunappii");

hakunappii.addEventListener('click', () => realRestaurantSearch(hakutekstii.value));

let currentSearch = '';

let lanReal = '';
let lonReal = '';
let currentMAP = '';
let counter = 0;
let ul = '';
let ull = '';
let list = '';
let article = '';
let ldr = '';
let waitTime = 0;
let isCreated = false;
let mapoptiondata =
    {enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0};

findRestaurant("");

//This function is ran when user enters restaurants page.
//makes connection to myHelsinkiApi
//loads needed data to currentSearch variable.

function findRestaurant(data){

    if(isCreated === false){
        currentSearch = new SearchData();
        currentMAP = new MapData();
        currentSearch.doQuery(apiUrlSearchTab, data);
        article = document.getElementById('loaderBlock');
        article.innerHTML = `<img class="loader-icon" id="loadIcon" src="../LoadingGifs/CultureLoad.gif" alt="loadingGif">`;
        isCreated = true;
    }

    setTimeout(function() {
        waitTime = waitTime + 1;
        if (currentSearch.dataArrived !== true) {
            console.log('Waiting data ' + waitTime);
            findRestaurant('');
        }
        else {

            //for (let k = 0; k < currentSearch.length; k++) {
              //  let hakusana = data;
                //console.log("Tässä palautuksen pituus: " + currentSearch.resultJson.length);
                //console.log(hakusana.length);

                for (let i = 0; i < currentSearch.resultJson.length; i++) {
                    let hakusana = data;
                    console.log('sisällä loopissa');
                    let stringname = currentSearch.resultJson[i].name.fi;
                    let hakusanakaks = hakusana.toUpperCase();
                    let strincarz = stringname.charAt(0);
                    let hakuzero = hakusanakaks.charAt(0);


                    // jos etsitty tasaisella nimellä
                    if (stringname.toLowerCase() === data.toLowerCase()) {
                        //Add here functionality for search with fullName (if needed)
                    } else if (strincarz === hakuzero && hakusana.length === 1) {

                        //Add here functionality for search with one letter. (if needed)

                    } else if (hakusanakaks === '' && currentSearch.resultJson[i].tags[0].name === 'restaurants') {
                        ul = document.getElementById('Mainlistele')
                        list = document.createElement('li')
                        let listosoite = document.createElement('li');
                        let br = document.createElement("br");

                        listosoite.innerText += currentSearch.resultJson[i].location.lat;
                        listosoite.innerText += currentSearch.resultJson[i].location.lon;
                        list.innerText = currentSearch.resultJson[i].name.fi;

                        ul.appendChild(list);
                        ul.appendChild(br);
                        console.log('pitäisi tulostaa');
                    }
                }
           // }
            testi();
        }

    }, 1000)

}

function testi(){
    let loader = document.getElementById('loadIcon');
    loader.remove();
    console.log("Tässä palautuksen pituus: " + currentSearch.resultJson.length);
    console.log('testi funktiossa: ' + currentSearch.resultJson[1].name.fi);
}

//This function is ran when user makes specific search.

function realRestaurantSearch(name){

    let x = false;


    ull = document.getElementById('secondList');
    ull.innerHTML = '';


    for (let j = 0; j < currentSearch.resultJson.length; j++) {

        console.log('sisällä loopissa 2');
        let stringname = currentSearch.resultJson[j].name.fi;
        let hakusanakaks = name.toUpperCase();

        // jos etsitty tasaisella nimellä
        if (stringname.toLowerCase() === name.toLowerCase()) {

            console.log("Sisällä kokosanassa");
            let ull = document.getElementById('secondList')
            list = document.createElement('li')
            const br = document.createElement('br');
            let address = document.createElement('li');
            let email = document.createElement('a');
            email.href = currentSearch.resultJson[j].info_url;
            email.innerText = currentSearch.resultJson[j].info_url;
            let desc = document.createElement('li');
            list.innerText = currentSearch.resultJson[j].name.fi;
            address.innerText = currentSearch.resultJson[j].location.address.street_address + ' , ';
            address.innerText += currentSearch.resultJson[j].location.address.postal_code + ' , ';
            address.innerText += currentSearch.resultJson[j].location.address.locality;
            desc.innerText = currentSearch.resultJson[j].description.intro;
            console.log("ravintolan nimi(solo): " + currentSearch.resultJson[j].name.fi);
            ull.appendChild(list);
            ull.appendChild(br);
            ull.appendChild(address);
            ull.appendChild(email);
            ull.appendChild(desc);
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
        }

    }

    // if user fails to input correct name and search fails.
    if (x === false){
        let ull = document.getElementById('secondList')
        list = document.createElement('li')
        let error = document.createElement('li');
        const br = document.createElement('br');
        const br1 = document.createElement('br');
        let fix = document.createElement('li');
        let desc = document.createElement('li');

        list.innerText = 'TAPAHTUI VIRHE!!!';
        error.innerText = 'Taisi tapahtua näppäily virhe.';
        fix.innerText = 'Hae ravintolaa viereisestä listasta löytyvällä kokonimellä.'
        desc.innerText = 'YRITÄ UUDELLEEN!'

        ull.appendChild(list);
        ull.appendChild(br);
        ull.appendChild(error);
        ull.appendChild(fix);
        ull.appendChild(br1);
        ull.appendChild(desc);
    }
}






