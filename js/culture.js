//Kaspar Tullus
import SearchData from '../api/myHelsinkiApiNew.js';
import MapData from "../js/MapApi.js";
const mainElem = document.getElementById("cultureMain");
const searchButton = document.getElementById('hakunappi');
const searchInputField = document.getElementById('hakuteksti');
const apiUrlSearchTab = "v1/events/?tags_search=";
let currentMAP;
let mapoptiondata =
    {enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0};
let currentSearch;
let keyword;
let tagi = 0;
const datalist = [{}];
const tags = [{
    name: "Musiikki,"
},{
    name: "Libraries,"
},{
    name: "Elokuvat,"
}];
function findCultureData(){
    if (tagi == tags.length){
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
    LaunchCultureData();

}
function LaunchCultureData(){
    console.log("CULTUREDATA" + tagi)
    setTimeout(function() {
        for (let i = 0; i < currentSearch.resultJson.length; i++) {
            console.log(currentSearch.resultJson[i].name.fi);
            datalist.push({
                name: currentSearch.resultJson[i].name.fi,
                description: currentSearch.resultJson[i].description.intro,
                id: currentSearch.resultJson[i].id,
                bodydes: currentSearch.resultJson[i].description.body,
                locationlat: currentSearch.resultJson[i].location.lat,
                locationlon: currentSearch.resultJson[i].location.lon
            });


            if (currentSearch.resultJson[i].name.fi === datalist[i].name ||
                currentSearch.resultJson[i].description.intro == datalist[i].description ||
                currentSearch.resultJson[i].id == datalist[i].id ||
                currentSearch.resultJson[i].description.body == datalist[i].bodydes)
            {
                console.log("duplicate")
            }else if (currentSearch.resultJson[i].description.images[0] == null && currentSearch.resultJson[i].description.intro == null || currentSearch.resultJson[i].description.body == null){
                console.log("no info,not adding")
            }else {

                let articletwo = document.createElement("article");
                articletwo.className = "CULTDATARTCLASStwo";

                let article = document.createElement("article");
                article.className = "CULTDATARTCLASS";
                article.id = "DataARTICLE" + i;
                article.classList.add('CULTDATARTCLASS','new-CULTDATARTCLASS');

                let img = document.createElement("img");
                img.className = "CultIMG";


                if (currentSearch.resultJson[i].description.images[0] == null) {
                    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                }else if (currentSearch.resultJson[i].description.images[0] != null){
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
                button.innerText = "KARTTA";
                button.id = "Karttanappi"+i;
                button.onclick = function() { naytamap(i); };

                let mapdiv = document.createElement("div");
                mapdiv.className="map";
                mapdiv.id ="map";
                mapdiv.style = "width: 95%; height: 300px;";

                mainElem.appendChild(br)
                mainElem.appendChild(articletwo)
                articletwo.appendChild(h3);
                mainElem.appendChild(article);
                article.appendChild(img);
                article.appendChild(p);
                article.appendChild(button);
                if (datalist[i].locationlat != null && datalist[i].locationlon != null){
                    console.log("ALL GUCCI")
                }else{
                    console.log("NOT GUCCI")
                    let buttonid = document.getElementById("Karttanappi" + i);
                    buttonid.remove();
                }
            }

        }

    },1000);

    tagi++
    if (tagi <= tags.length - 1){
        setTimeout(function () {
            findCultureData()
        },1000);
    }else{

        console.log("DONE")
    }
}

function naytamap(datalindex){
    let datalat = datalist[datalindex].locationlat;
    let datalon = datalist[datalindex].locationlon;
        console.log("GOTLOCATION")
    currentMAP.showMap(datalat, datalon,mapoptiondata);
}

searchButton.addEventListener('click', findCultureData);




