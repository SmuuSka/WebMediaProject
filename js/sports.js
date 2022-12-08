'use strict';
import SearchData from '../api/myHelsinkiApiNew.js';
import MapData from "../js/MapApi.js";
import sportData from '../jsonFiles/sport.json' assert { type: 'json' };

const data = JSON.stringify(sportData);
const sportJSON = JSON.parse(data);


const mainElem = document.querySelector("main");
const headerElem = document.getElementById('topHeader');
const searchBox = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');
const divElem = document.getElementById('result');

//popup
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopup');
let popupHeader = document.getElementById('popupHeader');
let popupDescription = document.getElementById('popupDesc');

//newDict
let newDict = [];

//Map
let currentMap;
let mapOptionData =
    {enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0};

const apiUrlSearchTab = "v1/events/?tags_filter=sports";

const map = document.getElementById('map');

let currentSearch;
let keyword;
let dateTime = {};
let waitTime = 0;
let events;
let currentDay;

let article;


window.addEventListener("load", () => {
    console.log("This function is executed once the page is fully loaded");
    //findSportDataDefault();
    bypassJsonFunc(sportJSON);
});

function bypassJsonFunc(sportJSON){
    //Luetaan käyttäjänsyöte
    keyword = "";

    //Luodaan hakuolio
    currentSearch = new SearchData();

    //Fiksataan json
    currentSearch.resultJson = sportJSON;
    events = sortData(currentSearch.resultJson);
    currentDay = new Date();
    console.log("Current day: " + currentDay);
    for (let i = 0; i < events.length; i++)
    {
        if(events[i].date >= currentDay){
            defaultSetNew(i);
        }
    }

}

closePopupBtn.addEventListener('click', closePopup);


function findWithKeyword() {
    console.log("FIND: " + searchBox.value.toString());
    let searchTag = searchBox.value.toString();
    divElem.replaceChildren();
    if(searchTag.length > 1){
        for(let i = 0; i < events.length;i++){
            for(let j = 0; j < events[i].eventTags.length; j++){
                //console.log(events[i].eventTags[j].name);
                let tag = events[i].eventTags[j].name;

                if(searchTag.match(tag)){
                    if(events[i].date >= currentDay){
                        console.log("Löytyi: " + tag + " Event: " + events[i].eventName);
                        eventSetBySearch(i);
                    }
                }
            }
        }

    }else {
        console.log("Tyhjä arpa");
    }
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
        waitTime = waitTime + 1;
        if (currentSearch.dataArrived !== true) {
            console.log('Waiting data ' + waitTime);
            waitUntillDataArrvived();
        }
        else {
             events = sortData(currentSearch.resultJson);
             currentDay = new Date();
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
    //let article = document.createElement('article');
    article = document.createElement('button');
    let eventNameItem = document.createElement('h2');
    let h2DataTime = document.createElement('h2');

    //Luokat
    eventItem.className = "eventItemContainer";
    h2DataTime.className = "eventItem-date";
    article.className = "eventItem-event";
    article.id = events[index].eventID;

    eventNameItem.innerHTML = events[index].eventName;
    eventNameItem.id = events[index].eventID;
    h2DataTime.innerHTML = events[index].date.toDateString();

    //Koostaminen
    eventItem.appendChild(h2DataTime);
    article.appendChild(eventNameItem);
    article.addEventListener('click', (event) => {
        console.log("Event ID: " + event.target.getAttribute('id'));
        let eventID = event.target.getAttribute('id');
        openPopup(eventID);

    });
    eventItem.appendChild(article);
    divElem.appendChild(eventItem);
}

function openPopup(id){
    popup.classList.add('open-popup');
    for (let i = 0; i < newDict.length; i++) {
        if (newDict[i].eventID.match(id)) {
            console.log("Löyty " + newDict[i].eventID + " === " + id);
            popupHeader.innerHTML = newDict[i].eventData.eventName;
            popupDescription.innerHTML = newDict[i].eventData.eventDescription.intro;
            //Kartta
            currentMap = new MapData();
            naytamap(newDict[i].eventData.eventLocation);
        } else {
            //console.log("Ei löydy " + newDict[i].eventData.eventName);
        }
    }
}
function closePopup(){
    popup.classList.remove('open-popup');
    currentMap.mapleaf.remove('map');
}



function eventSetBySearch(index){
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

function sortData(data){
    let jsonDate;
    let idOfDate;
    let eventName;
    let location;
    let infoUrl;
    let tags;
    let description;
    console.log("datan määrä: " + data.length);
    let eventDictionary = [];
    for (let i = 0; i < data.length; i++){
        try {
            jsonDate = data[i].event_dates.starting_day;
            jsonDate = jsonDate.split('T');
        }catch (err){
            console.log("Jokin virhe päivämäärässä tapahtumassa " +  i + ". " + err.stack);
            jsonDate = "Date missing!";
        }finally{
            try {
                idOfDate = data[i].id;
            }catch (err){
                console.log("Jokin virhe id:ssä " + err.stack);
                idOfDate = "Missing id!";
            }finally {
                try {
                    eventName = data[i].name.fi;
                }catch (err){
                    console.log("Jokin virhe nimessä " + err.stack);
                    eventName = "Missing name!";
                }finally {
                    try {
                        location = data[i].location;
                    }catch (err){
                        console.log("Jokin virhe sijainnissa " + err.stack);
                        location = 'Location data missing!';
                    }
                    finally {
                        try {
                            infoUrl = data[i].info_url;
                        }catch (err){
                            console.log("Jokin virhe infolinkissä " + err.stack);
                            infoUrl = 'Infolink missing!';
                        }finally {
                            try {
                                tags = data[i].tags;
                            }catch (err){
                                console.log("Jokin virhe tägissä " + err.stack);
                                tags = 'tags missing!';
                            }
                            finally {
                                try {
                                    description = data[i].description;
                                }catch (err){
                                    console.log("Jokin virhe kuvailussa " + err.stack);
                                    description = 'description missing';
                                }finally {
                                    let date = new Date(jsonDate);
                                    eventDictionary.push({eventName:eventName, eventID:idOfDate,
                                                          date:date, eventLocation: location,eventInfoUrl:infoUrl,
                                                          eventTags:tags, eventDescription: description});
                                    newDict.push({
                                        eventID:idOfDate,
                                        eventData:{
                                            eventName:eventName,
                                            date:date,
                                            eventLocation: location,
                                            eventInfoUrl:infoUrl,
                                            eventTags:tags,
                                            eventDescription: description
                                        }});
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return  sortingDict(eventDictionary);
}

function sortingDict(dict){

    dict.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });

    return dict;
}

let counter = 0;

function naytamap(currentEvent){

    currentMap.posLat = currentEvent.lat;
    currentMap.posLong = currentEvent.lon;
    console.log("Lat " + currentEvent.lat + " Lon " + currentEvent.lon);

    currentMap.mapleaf = L.map('map').setView([currentMap.posLat, currentMap.posLong], 13);
    currentMap.options = mapOptionData;

    currentMap.Lmarker = L.marker([currentMap.posLat, currentMap.posLong]).addTo(currentMap.mapleaf).bindPopup("TÄÄLLÄ");

    console.log("GOTLOCATION")
    currentMap.showMap();
}




