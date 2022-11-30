import SearchData from '../api/myHelsinkiApiNew.js';

const mainElem = document.getElementById("cultureMain");
const headerElem = document.getElementById('topHeader');
const searchButton = document.getElementById('hakunappi');
const searchInputField = document.getElementById('hakuteksti');
const apiUrlSearchTab = "v1/events/?tags_filter=culture,";

let currentSearch;
let keyword;
let lastsearch = "";
const datalist = [{
    name:""
}];
function findCultureData(){
    //Luetaan käyttäjänsyöte
    keyword = searchInputField.value;
    //Luodaan hakuolio
    currentSearch = new SearchData();
    //Tehdään haku
    currentSearch.doQuery(apiUrlSearchTab,keyword);

    setTimeout(function() {
        for (let i = 0; i < currentSearch.resultJson.length; i++){

            console.log(currentSearch.resultJson[i].name.fi);
            datalist.push(currentSearch.resultJson[i].name.fi);

            if (currentSearch.resultJson[i].name.fi === datalist[i]){
                console.log("duplicate")

            }else {

                let article = document.createElement("article");
                article.id = "DataARTICLE" + i;
                article.style = " margin: 2%;" +
                    "padding: 0% 1% 0%;" +
                    "display: flex;";

                let img = document.createElement("img");
                img.style = "height:25%; width:25%;";

                if (currentSearch.resultJson[i].description.images[0].url == null) {
                    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
                }else if (currentSearch.resultJson[i].description.images[0].url != null){
                    img.src = currentSearch.resultJson[i].description.images[0].url;
                }

                let h2 = document.createElement("h2");
                h2.innerText = currentSearch.resultJson[i].name.fi;
                h2.class = "DataHEADER";
                h2.style = " margin: 1%;" +
                    "padding: 0;" +
                    "width: 25%;";
                let p = document.createElement("p");
                p.class = "DataPARAGRAPH";
                p.innerText = currentSearch.resultJson[i].description.intro
                let br = document.createElement("br");

                mainElem.appendChild(article);
                article.appendChild(img);
                article.appendChild(h2);
                article.appendChild(p);
            }
        }
    }, 500);
}


searchButton.addEventListener('click', findCultureData);




