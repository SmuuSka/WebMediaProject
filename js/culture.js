//Kaspar Tullus
import SearchData from '../api/myHelsinkiApiNew.js';
import MapData from "../js/MapApi.js";

const mainElem = document.getElementById("MAINDATA");
const searchButton = document.getElementById('hakunappi');
const searchInputField = document.getElementById('hakuteksti');
const apiUrlSearchTab = "v1/events/?tags_search=";

let loader;
//popup
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopup');
let popupHeader = document.getElementById('popupHeader');
let popupDescription = document.getElementById('popupDesc');


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
const datalist = [{}];
const tags = [{
    name: "Musiikki,"
}, {
    name: "Libraries,"
}, {
    name: "Elokuvat,"
}];
findCultureData()

function findCultureData() {
    if (tagi === tags.length) {
        console.log("DONE")
        tagi = 0;
    }
    //Luetaan käyttäjänsyöte
    keyword = searchInputField.value;
    //Luodaan hakuolio
    currentSearch = new SearchData();

    currentMAP = new MapData();
    //Tehdään haku
    currentSearch.doQuery(apiUrlSearchTab + tags[tagi].name, keyword);
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

    console.log("CULTUREDATA" + tagi)
    setTimeout(function () {
        for (let i = 0; i < currentSearch.resultJson.length; i++) {
            console.log(currentSearch.resultJson[i].name.fi);
            try {
                named = currentSearch.resultJson[i].name.fi
            } catch (err) {
                console.log("ERRORNAME");
                named = '';
            } finally {
                try {
                    desc = currentSearch.resultJson[i].description.intro
                } catch (err) {
                    console.log("ERRORDESC");
                    desc = ''
                } finally {
                    try {
                        idd = currentSearch.resultJson[i].id
                    } catch (err) {
                        console.log("ERRORID");
                        idd = ''
                    } finally {
                        try {
                            bodyd = currentSearch.resultJson[i].description.body
                        } catch (err) {
                            console.log("ERRORBODY");
                            bodyd = '';
                        } finally {
                            try {
                                lat = currentSearch.resultJson[i].location.lat
                            } catch (err) {
                                console.log("ERRORNLAT");
                                lat = '1'
                            } finally {
                                try {
                                    lon = currentSearch.resultJson[i].location.lon
                                } catch (err) {
                                    console.log("ERRORLON");
                                    lon = '1'
                                } finally {
                                    try {
                                        imaged = currentSearch.resultJson[i].description.images[0].url
                                    } catch (err) {
                                        console.log("IMAGEERROR")
                                    } finally {
                                        datalist.push({
                                            name: named,
                                            bodydes: bodyd,
                                            id: idd,
                                            description: desc,
                                            locationlon: lon,
                                            locationlat: lat,
                                            image: imaged
                                        });
                                    }

                                }
                            }
                        }
                    }
                }
            }

        }
        tagi++
        if (tagi <= tags.length - 1) {
            setTimeout(function () {
                findCultureData()
            }, 2000);
        } else {
            console.log("DONE")
            mainElem.innerHTML = '';
            SHOWDATA()
        }

        console.log(datalist)
    }, 200);

}

function SHOWDATA() {

    for (let i = 1; i < datalist.length; i++) {

        if (datalist[i].image === null && datalist[i].description === null || datalist[i].bodydes === null) {
            console.log("no info,not adding")
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
                IMGSRC = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
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
            p.innerHTML = datalist[i].bodydes
            let br = document.createElement("br");

            let button = document.createElement("button");
            button.className = "Karttanappi" + i
            button.id = "Karttanappi";


            let mapdiv = document.createElement("div");
            mapdiv.className = "map";
            mapdiv.id = "map";
            mapdiv.style = "width: 95%; height: 300px;";

            mainElem.appendChild(br)
            mainElem.appendChild(articletwo)
            articletwo.appendChild(articleheader);
            articleheader.appendChild(img);
            articletwo.appendChild(article);
            article.appendChild(p);

            let buttonid = document.getElementById("Karttanappi" + i)
            try {

                datalocation = datalist[i].locationlat
                datalatcation = datalist[i].locationlon
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
                article.appendChild(button);
            }

        }


    }

}

//NÄYTETÄÄN KARTTA (DATALINDEX) = napissa oleva index arvo mikä tehtiin forloopissa ylhäällä.
function naytamap(datalindex) {
    popup.classList.add('open-popup');
    console.log("Löyty " + datalist[datalindex].id + " === " + datalindex);
    popupHeader.innerHTML = datalist[datalindex].name;
    popupDescription.innerHTML = datalist[datalindex].description;
    if (counter === 1) {
        try {
            currentMAP.mapleaf.remove()
        } catch (err) {
            console.log("ERRORREMVOVE")
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
                        console.log("ERRORNAME")
                        NAME = "error";
                    } finally {
                        console.log(NAME)
                        try {
                            currentMAP.Lmarker = L.marker([currentMAP.posLat, currentMAP.posLong]).addTo(currentMAP.mapleaf).bindPopup(NAME);
                        } catch (err) {
                            console.log("ERROR MARKER")
                        } finally {
                            counter = 1;
                            console.log("GOTLOCATION")
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
    currentMap.mapleaf.remove('map');
}


closePopupBtn.addEventListener('click', closePopup);
searchButton.addEventListener('click', findCultureData);




