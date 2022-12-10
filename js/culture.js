//Kaspar Tullus
import SearchData from '../api/myHelsinkiApiNew.js';
import MapData from "../js/MapApi.js";

const mainElem = document.getElementById("MAINDATA");
const searchButtonMusic = document.getElementById('musiikkinappi');
const searchButtonConcerts = document.getElementById('konsertitnappi');
const searchButtonKirjasto = document.getElementById('kirjastonappi');
const searchButtonHistory = document.getElementById('historianappi');
const searchButtonMuseums = document.getElementById('museonappi');
const searchButtonKaikki = document.getElementById('kaikkinappi');
const apiUrlSearchTab = "v1/events/?tags_search=";

let loader;
//popup
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopup');

let popUpOpen = false;
let Searchprecise = 0;
let datalocation;
let datalatcation;
let counter = 0;
let currentMAP;
let mapoptiondata =
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

let currentSearch;
let keyword;
let tagi = 0;
let datalist = [{}];
const tags = [{
    name: "Musiikki,"
}, {
    name: "Libraries,"
}, {
    name: "concerts,"
},{
    name: "history"
},{
    name:"museums"
}];
let tagsearch;
findCultureData()
function findCultureData() {
    if (tagi === tags.length) {
        console.log("DONE");
        tagi = 0;
    }
    //Luetaan käyttäjänsyöte
    keyword = ""
    //Luodaan hakuolio
    currentSearch = new SearchData();
    if (Searchprecise === 5 || Searchprecise === 0){
        tagsearch = tags[tagi].name;
    }
    //Tehdään haku
    currentSearch.doQuery(apiUrlSearchTab + tagsearch, keyword);
    mainElem.innerHTML = `<img class="loader-icon" id="loadIcon" src="../LoadingGifs/CultureLoad.gif" alt="loadingGif">`;
    setTimeout(function () {
        LaunchCultureData();
    }, 1000)


}

function LaunchCultureData() {
    let named;
    let desc;
    let idd;
    let bodyd;
    let lat;
    let lon;
    let imaged;
    let url;
    console.log("CULTUREDATA" + tagi)
    setTimeout(function () {
        for (let i = 0; i < currentSearch.resultJson.length; i++) {
            console.log(currentSearch.resultJson[i].name.fi);
            try {
                named = currentSearch.resultJson[i].name.fi;
            } catch (err) {
                console.log("ERRORNAME");
                named = '';
            } finally {
                try {
                    desc = currentSearch.resultJson[i].description.intro;
                } catch (err) {
                    console.log("ERRORDESC");
                    desc = ''
                } finally {
                    try {
                        idd = currentSearch.resultJson[i].id;
                    } catch (err) {
                        console.log("ERRORID");
                        idd = ''
                    } finally {
                        try {
                            bodyd = currentSearch.resultJson[i].description.body;
                        } catch (err) {
                            console.log("ERRORBODY");
                            bodyd = '';
                        } finally {
                            try {
                                lat = currentSearch.resultJson[i].location.lat;
                            } catch (err) {
                                console.log("ERRORNLAT");
                                lat = '1'
                            } finally {
                                try {
                                    lon = currentSearch.resultJson[i].location.lon;
                                } catch (err) {
                                    console.log("ERRORLON");
                                    lon = '1'
                                } finally {
                                    try {
                                        imaged = currentSearch.resultJson[i].description.images[0].url;
                                    } catch (err) {
                                        console.log("IMAGEERROR");
                                    } finally {
                                        try{
                                            url = currentSearch.resultJson[i].info_url;
                                        }catch (err){
                                            console.log("ERROR NO URL INFO");
                                        }finally {
                                            datalist.push({
                                                name: named,
                                                bodydes: bodyd,
                                                id: idd,
                                                description: desc,
                                                locationlon: lon,
                                                locationlat: lat,
                                                image: imaged,
                                                url: url
                                            });
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }

        }
        if (Searchprecise === 1){
            console.log("ONESEARCH");
            mainElem.innerHTML = '';
            SHOWDATA();
        }else{
        tagi++
        if (tagi <= tags.length - 1) {
            setTimeout(function () {
                findCultureData()
            }, 2000);
        } else {
            Searchprecise = 0;
            console.log("DONE")
            mainElem.innerHTML = '';
            SHOWDATA()
        }
        }


        console.log(datalist)
    }, 200);
}

function SHOWDATA() {

    for (let i = 1; i < datalist.length; i++) {
        if (datalist[i].image === null || datalist[i].description === null || datalist[i].bodydes === null) {
            console.log("no info,not adding");
        } else {

            let articletwo = document.createElement("article");
            articletwo.className = "CULTDATARTCLASStwo";
            articletwo.classList.add('CULTDATARTCLASStwo', 'new-CULTDATARTCLASS');
            let article = document.createElement("div");
            article.className = "CULTDATARTCLASS";
            article.id = "DataARTICLE" + i;

            let img = document.createElement("img");
            img.className = "CultIMG";

            let IMGSRC;
            try {
                IMGSRC = datalist[i].image;
            } catch (err) {
                console.log("NOPICTURE")
                IMGSRC = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg";
            } finally {
                img.src = datalist[i].image;
            }

            let articleheader = document.createElement("div");
            articleheader.innerText = datalist[i].name;
            articleheader.className = "DataARTICLE";
            articleheader.style = " margin: 1%;" +
                "padding: 0;" +
                "width: 100%;";

            let p = document.createElement("p");
            p.className = "DataPARAGRAPH";
            p.innerHTML = datalist[i].bodydes;
            let br = document.createElement("br");

            let button = document.createElement("button");
            button.className = "Karttanappi" + i;
            button.id = "Karttanappi";

            let buttondiv = document.createElement("div")
            buttondiv.id = "Buttonlist";

            let aINFO = document.createElement("a");

            let infobutton = document.createElement("button")
            infobutton.innerText = "KOTISIVU";
            infobutton.className = "InfoNappi";
            infobutton.id="Karttanappi";

            let mapdiv = document.createElement("div");
            mapdiv.className = "map";
            mapdiv.id = "map";
            mapdiv.style = "width: 95%; height: 300px;";

            mainElem.appendChild(br);
            mainElem.appendChild(articletwo);
            articletwo.appendChild(articleheader);
            articleheader.appendChild(img);
            articletwo.appendChild(article);
            article.appendChild(p);
            article.appendChild(buttondiv)

            let buttonid = document.getElementById("Karttanappi" + i)
            try {

                datalocation = datalist[i].locationlat;
                datalatcation = datalist[i].locationlon;
            } catch (err) {
                console.log("ERRORLOCATION");
                datalocation = 'Error';
                try {
                    buttonid.remove();
                } catch (err) {
                    console.log("ERROR REMOVINGBUTTON")
                }
            } finally {
                button.innerText = "KARTTA";
                button.onclick = function () {
                    naytamap(i);
                };
                buttondiv.appendChild(button);
                try{
                    aINFO.href = datalist[i].url
                    buttondiv.appendChild(aINFO)
                    aINFO.appendChild(infobutton);
                }catch (err){
                    console.log("NOURL NOT ADDING HOME PAGE")
                }

            }

        }


    }

}
function createPopup(eventDatai){
    //Elements
    let popupHeader = document.createElement('h2');
    let popupDescription= document.createElement('p');
    let popupMap = document.createElement('div');
    let popupCloseButton = document.createElement('button');


    //class
    popupMap.className = "map";

    //ID
    popupHeader.id = "popupHeader";
    popupDescription.id = "popupDesc";
    popupMap.id = "map";
    popupCloseButton.id = "closePopup";

    //Content
    popupHeader.innerHTML = datalist[eventDatai].name;
    popupDescription.innerHTML = datalist[eventDatai].description;
    popupCloseButton.type = "button";
    popupCloseButton.innerHTML = "Close";
    popupCloseButton.addEventListener('click', closePopup);
    popupMap.style = "width: 1100px; height: 500px;"

    //Pile up
    popup.appendChild(popupHeader);
    popup.appendChild(popupDescription);
    popup.appendChild(popupMap);
    popup.appendChild(popupCloseButton);

}
//NÄYTETÄÄN KARTTA (DATALINDEX) = napissa oleva index arvo mikä tehtiin forloopissa ylhäällä.
function naytamap(datalindex) {
    popup.classList.add('open-popup');
    currentMAP = new MapData();
    currentMAP.Mapincluded = 1;
    createPopup(datalindex);
    console.log("Löyty " + datalist[datalindex].id + " === " + datalindex);
    if (counter === 1) {
        try {
            currentMAP.mapleaf.remove();
        } catch (err) {
            console.log("ERRORREMVOVE");
        }

    }
    let NAME;
    console.log(datalindex);
    try {
        currentMAP.posLat = datalist[datalindex].locationlat;
    } catch (err) {
        console.log("ErrorLAT");
        currentMAP.posLat = '';
    } finally {
        try {
            currentMAP.posLong = datalist[datalindex].locationlon;
        } catch (err) {
            console.log("ErrorLON");
            currentMAP.posLong = '';
        } finally {
            try {
                currentMAP.mapleaf = L.map('map').setView([currentMAP.posLat, currentMAP.posLong], 13);
            } catch (err) {
                console.log("ErrorMAP");
                currentMAP.mapleaf = '';
            } finally {
                try {
                    currentMAP.options = mapoptiondata;
                } catch (err) {
                    console.log("ErrorOPTIONS");
                    currentMAP.options = '';
                } finally {
                    try {
                        NAME = datalist[datalindex].name
                    } catch (err) {
                        console.log("ERRORNAME");
                        NAME = "error";
                    } finally {
                        console.log(NAME)
                        try {
                            currentMAP.Lmarker = L.marker([currentMAP.posLat, currentMAP.posLong]).addTo(currentMAP.mapleaf).bindPopup(NAME);
                        } catch (err) {
                            console.log("ERROR MARKER");
                        } finally {
                            counter = 1;
                            console.log("GOTLOCATION");
                            currentMAP.showMap();
                        }

                    }
                }

            }
        }
    }


}

function closePopup() {
    popup.classList.remove('open-popup');
    popup.replaceChildren();
    popUpOpen = false;
}

function EventType(num){
    const button = num.target.value;
    mainElem.innerHTML = '';
    datalist = [{}];
    if (button == 5){
        Searchprecise = 5
        findCultureData();
    }else {
        Searchprecise = 1;
        console.log(num.target.value);
        tagsearch = tags[button].name;
        findCultureData();
    }

}

searchButtonMusic.addEventListener('click', EventType);
searchButtonKirjasto.addEventListener('click',EventType);
searchButtonConcerts.addEventListener('click',EventType);
searchButtonHistory.addEventListener('click',EventType);
searchButtonMuseums.addEventListener('click',EventType);
searchButtonKaikki.addEventListener('click',EventType);


