//Kaspar Tullus
import SearchData from '../api/myHelsinkiApiNew.js';
import MapData from "../js/MapApi.js";

const mainElem = document.getElementById("cultureMain");
const searchButton = document.getElementById('hakunappi');
const searchInputField = document.getElementById('hakuteksti');
const apiUrlSearchTab = "v1/events/?tags_search=";
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

findCultureData();

function findCultureData() {
    if (tagi == tags.length) {
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
    setTimeout(function () {
        LaunchCultureData();
    }, 400)


}

function LaunchCultureData() {
    let named;
    let desc;
    let idd;
    let bodyd;
    let lat;
    let lon;

    console.log("CULTUREDATA" + tagi)
    setTimeout(function () {
        for (let i = 0; i < currentSearch.resultJson.length; i++) {
            console.log(currentSearch.resultJson[i].name.fi);
            try {
                named = currentSearch.resultJson[i].name
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
                                    datalist.push({
                                        name: named,
                                        bodydes: bodyd,
                                        id: idd,
                                        description: desc,
                                        locationlon: lon,
                                        locationlat: lat
                                    });

                                }
                            }
                        }
                    }
                }
            }

            console.log(datalist)

            if (currentSearch.resultJson[i].name.fi === datalist[i].name ||
                currentSearch.resultJson[i].description.intro === datalist[i].description ||
                currentSearch.resultJson[i].id === datalist[i].id ||
                currentSearch.resultJson[i].description.body === datalist[i].bodydes) {
                console.log("duplicate")
            } else if (currentSearch.resultJson[i].description.images[0] === null && currentSearch.resultJson[i].description.intro === null || currentSearch.resultJson[i].description.body === null) {
                console.log("no info,not adding")
            } else {

                let articletwo = document.createElement("article");
                articletwo.className = "CULTDATARTCLASStwo";

                let article = document.createElement("article");
                article.className = "CULTDATARTCLASS";
                article.id = "DataARTICLE" + i;
                article.classList.add('CULTDATARTCLASS', 'new-CULTDATARTCLASS');

                let img = document.createElement("img");
                img.className = "CultIMG";

                let IMGSRC;
                try {
                    IMGSRC = currentSearch.resultJson[i].description.images[0].url;
                } catch (err) {
                    console.log("NOPICTURE")
                    IMGSRC = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                } finally {
                    img.src = currentSearch.resultJson[i].description.images[0].url;
                }

                let h3 = document.createElement("h3");
                h3.innerText = currentSearch.resultJson[i].name.fi;
                h3.className = "DataHEADER";
                h3.style = " margin: 1%;" +
                    "padding: 0;" +
                    "width: 100%;";

                let p = document.createElement("p");
                p.className = "DataPARAGRAPH";
                p.innerHTML = currentSearch.resultJson[i].description.body
                let br = document.createElement("br");

                let button = document.createElement("button");
                button.id = "Karttanappi" + i;

                let buttonid = document.getElementById("Karttanappi" + i)


                let mapdiv = document.createElement("div");
                mapdiv.className = "map";
                mapdiv.id = "map";
                mapdiv.style = "width: 95%; height: 300px;";

                mainElem.appendChild(br)
                mainElem.appendChild(articletwo)
                articletwo.appendChild(h3);
                mainElem.appendChild(article);
                article.appendChild(img);
                article.appendChild(p);
                if (i === 0){
                    try {
                        buttonid.remove();
                    } catch (err) {
                        console.log("ERROR REMOVINGBUTTON")
                    }
                }else {
                    button.innerText = "KARTTA";
                    button.onclick = function () {
                        naytamap(i);
                    };
                    article.appendChild(button);
                }
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
                }

            }


        }

    }, 1000);

    tagi++
    if (tagi <= tags.length - 1) {
        setTimeout(function () {
            findCultureData()
        }, 2000);
    } else {

        console.log("DONE")
    }
}

//NÄYTETÄÄN KARTTA (DATALINDEX) = napissa oleva index arvo mikä tehtiin forloopissa ylhäällä.
function naytamap(datalindex) {

    if (counter === 1){
        try{
            currentMAP.mapleaf.remove()
        }catch (err){
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
                        NAME = datalist[datalindex + 1].name.fi
                    } catch (err) {
                        console.log("ERRORNAME")
                        NAME = "error";
                    } finally {
                        console.log(NAME)
                        try {
                            currentMAP.Lmarker = L.marker([currentMAP.posLat, currentMAP.posLong]).addTo(currentMAP.mapleaf).bindPopup(NAME);
                        }catch (err){
                            console.log("ERROR MARKER")
                        }finally {
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

searchButton.addEventListener('click', findCultureData);




