import SearchData from "../api/myHelsinkiApiNew.js";

const apiUrlSearchTab = 'v2/places/?name_filter=';

'use strict';

const hakutekst = document.getElementById('hakuteksti');
const hakunappi = document.getElementById("hakunappi");
//let karttanappi = '';


hakunappi.addEventListener('click', () => findRestaurant(hakutekst.value));
//hakunappi.addEventListener('click', () => showMap(60.1704, 24.9522))


let currentSearch;




let lanReal = '';
let lonReal = '';
let n = 0;

function findRestaurant(data){

    currentSearch = new SearchData();

    currentSearch.doQuery(apiUrlSearchTab, data);

    console.log(data);

    setTimeout(function (){

        let hakusana = data;
        console.log(currentSearch.resultJson.length);

        for (let i = 0; i < currentSearch.resultJson.length; i++) {

            //console.log(currentSearch.resultJson[0]);
            console.log('sisällä loopissa');
            let stringname = currentSearch.resultJson[i].name.fi;
            //console.log(stringname);
            //let stringname = jsonData[i].name.fi;
            let hakusanakaks = data.toUpperCase();
            let strincarz = stringname.charAt(0);
            let hakuzero = hakusanakaks.charAt(0);

            //console.log(stringified);

            // jos etsitty tasaisella nimellä
            if (stringname.toLowerCase() === hakutekst.value.toLowerCase()){

                console.log("Sisällä kokosanassa");
                let ul = document.getElementById('Mainlistele')
                let list = document.createElement('li')
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

                let ul = document.getElementById('Mainlistele')
                let list = document.createElement('li')
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
                let ul = document.getElementById('Mainlistele')
                let list = document.createElement('li')
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
    }, 100)

}
