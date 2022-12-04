'use strict';
import SearchData from '../api/myHelsinkiApiNew.js';

const mainElem = document.querySelector("main");
const headerElem = document.getElementById('topHeader');
const searchBox = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');
const divElem = document.getElementById('result');


const apiUrlSearchTab = "v1/events/?tags_filter=sports";

const map = document.getElementById('map');


let currentSearch;
let keyword;
let dateTime = {};
let waitTime = 0;
let events;


window.addEventListener("load", () => {
    console.log("This function is executed once the page is fully loaded");
    findSportDataDefault();
});

function findWithKeyword() {
    console.log("FIND: " + searchBox.value.toString());
}
searchBtn.addEventListener('click',findWithKeyword);


function findSportDataDefault() {
    //Luetaan käyttäjänsyöte
    keyword = "";

    //Luodaan hakuolio
    currentSearch = new SearchData();

    //Tehdään haku
    currentSearch.doQuery(apiUrlSearchTab, keyword);
    waitUntillDataArrvived();
    // setTimeout(function ()
    // {sortData(currentSearch.resultJson);
    //     for (let i = 0; i < 10; i++)
    //     {
    //             defaultEventSet(i);
    //     }
    //     }, 5000)
}

function waitUntillDataArrvived(){
    setTimeout(function() {
          //  your code here
        waitTime = waitTime + 1;
        if (currentSearch.dataArrived !== true) {
            console.log('Waiting data ' + waitTime);
            waitUntillDataArrvived();
        }
        else {
             events = sortData(currentSearch.resultJson);
             let currentDay = new Date();
             console.log("Current day: " + currentDay);
            for (let i = 0; i < events.length; i++)
            {
                if(events[i].date >= currentDay){
                    defaultSetNew(i);
                }
            }
        }
    }, 1000)
}

function defaultSetNew(index){
    //Elementit
    let eventItem = document.createElement('article');
    let article = document.createElement('article');
    let eventNameItem = document.createElement('h2');
    let h2DataTime = document.createElement('h2');

    //Luokat
    eventItem.className = "eventItemContainer";
    h2DataTime.className = "eventItem-date";
    article.className = "eventItem-event";

    eventNameItem.innerHTML = events[index].eventName;
    h2DataTime.innerHTML = events[index].date.toDateString();

    //Koostaminen
    eventItem.appendChild(h2DataTime);
    article.appendChild(eventNameItem);
    eventItem.appendChild(article);
    divElem.appendChild(eventItem);
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
    let eventName;
    let location;
    let infoUrl;
    console.log("datan määrä: " + data.length);
    let eventDictionary = [];
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
                try {
                    eventName = data[i].name.fi;
                }catch (err){
                    console.log("Jokin virhe " + err.stack);
                    eventName = "Missing name!";
                }finally {
                    //let datestring = jsonDate;
                    let date = new Date(jsonDate);
                    eventDictionary.push({eventName:eventName, eventID:idOfDate, date:date})
                    //eventDictionary[idOfDate] = date.toDateString();
                }
            }
        }
    }
    //console.log("Event dict " + eventDictionary.date);
    return  sortingDict(eventDictionary);
}

function sortingDict(dict){

    // let before = dict.slice(0, 5);
    // for (let i = 0; i < before.length; i++){
    //     //console.log("before: key " + dict[i].eventID);
    //     console.log("before: key " + before[i].eventID + " " + " before: value " + before[i].date);
    // }
    //
    // let array = [{eventID: currentSearch.resultJson[0].id, date: currentSearch.resultJson[0].event_dates.starting_day}];
    // array.push({eventID: currentSearch.resultJson[1].id, date: currentSearch.resultJson[1].event_dates.starting_day});
    // array.push({eventID: currentSearch.resultJson[2].id, date: currentSearch.resultJson[2].event_dates.starting_day});
    // for (let i = 0; i < dict.length; i++){
    //     //console.log("before: key " + dict[i].eventID);
    //     console.log("before: value " + dict[i].date);
    // }
    // console.log("before: key " + dict[0].eventID);
    // console.log("before: value " + dict[0].date);
    // console.log("before: " + array[1].date)
    // console.log("before: " + array[2].date)
    //
    dict.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });
    //
    // let after = dict.slice(0, 5);
    // for (let i = 0; i < after.length; i++){
    //     //console.log("after: key " + dict[i].eventID);
    //     console.log("after: key " + after[i].eventID + " " + " after: value " + after[i].date);
    // }
    // // console.log("after: " + array[0].date)
    // // console.log("after: " + array[1].date)
    // // console.log("after: " + array[2].date)
    // // //console.log("Testi arr: id " + array[0].eventID + "Date: " + array.date);
    return dict;
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





