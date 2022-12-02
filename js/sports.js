'use strict';
import SearchData from '../api/myHelsinkiApiNew.js';

const mainElem = document.querySelector("main");
const headerElem = document.getElementById('topHeader');
const searchButton = document.getElementById('hakunappi');
const divElem = document.getElementById('result');
const searchInputField = document.getElementById('hakuteksti');


const apiUrlSearchTab = "v1/events/?tags_filter=sports,";

const map = document.getElementById('map');


let currentSearch;
let keyword;
let dateTime = {};


window.addEventListener("load", () => {
    console.log("This function is executed once the page is fully loaded");
    findSportDataDefault();
});

function findSportDataDefault() {
    //Luetaan käyttäjänsyöte
    keyword = "";

    //Luodaan hakuolio
    currentSearch = new SearchData();

    //Tehdään haku
    currentSearch.doQuery(apiUrlSearchTab, "");

    setTimeout(function ()
    {sortData(currentSearch.resultJson);
        for (let i = 0; i < 10; i++)
        {
                defaultEventSet(i);
        }
        }, 100)
}

function defaultEventSet(index){
    //Indeksimuuttujat
    let date = currentSearch.resultJson[index].event_dates.starting_day;
    let eventName = currentSearch.resultJson[index].name.fi;

    //Elementit
    let eventItem = document.createElement('article');
    let article = document.createElement('article');
    let eventNameItem = document.createElement('h2');
    let h2DataTime = document.createElement('h2');

    //Luokat
    eventItem.className = "eventItemContainer";
    h2DataTime.className = "eventItem-date";
    article.className = "eventItem-event";


    date = date.split('T');
    let datestring = date;
    let datestring1 = datestring[0].split('-');
    let dateFixed = swapElements(datestring1);
    console.log(dateFixed);



    eventNameItem.innerHTML = eventName;
    h2DataTime.innerHTML = dateFixed.toString();

    //Koostaminen
    eventItem.appendChild(h2DataTime);
    article.appendChild(eventNameItem);
    eventItem.appendChild(article);
    divElem.appendChild(eventItem);
}

function swapElements(array) {
    let date = array[2].toString() + ".";
    date += array[1].toString() + ".";
    date += array[0].toString();
    return date;
}

function sortData(data){
    let jsonDate;
    let idOfDate;

    let eventDictionary = {};
    for (let i = 0; i < data.length; i++){
        try {
            jsonDate = data[i].event_dates.starting_day;
            jsonDate = jsonDate.split('T');
        }catch (err){
            console.log("Jokin virhe " + err.stack);
            jsonDate = "Date missing!";
        }finally{
            try {
                idOfDate = data[i].id;
            }catch (err){
                console.log("Jokin virhe " + err.stack);
                idOfDate = "Missing id!";
            }finally {

                let datestring = jsonDate;
                let dateObject = new Date(datestring);

                eventDictionary[idOfDate] = dateObject.toDateString();

            }
        }
    }
    console.log("Event dict " + eventDictionary[data[0].id]);
}





    // function findSportData() {
    //     //Luetaan käyttäjänsyöte
    //     keyword = searchInputField.value;
    //     //Luodaan hakuolio
    //     currentSearch = new SearchData();
    //     //Tehdään haku
    //     currentSearch.doQuery(apiUrlSearchTab, keyword);
    //
    //     setTimeout(function () {
    //         for (let i = 0; i < currentSearch.resultJson.length; i++) {
    //             console.log(currentSearch.resultJson[i].name.fi);
    //             let article =
    //                 `
    //             <article>
    //                 <header class="article">
    //                     <h2>${currentSearch.resultJson[i].name.fi}</h2>
    //                 </header>
    //             </article>
    //             `
    //             divElem.innerHTML += article;
    //         }
    //     }, 100)
    // };

//document.addEventListener("DOMContentLoaded", findSportData);
//searchButton.addEventListener('click', findSportData);





