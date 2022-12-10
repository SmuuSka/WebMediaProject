'use strict';
//By Samu

//Api-script imports
import SearchData from '../api/myHelsinkiApiNew.js';
import MapData from "../js/MapApi.js";

//Static url
const apiUrlSearchTab = "v1/events/?tags_filter=sports";

//Main elements
const searchBox = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');
const divElem = document.getElementById('result');
const eventList = document.createElement('ul');

//popup elements
const popup = document.getElementById('popup');
let popupArticle = document.createElement('article');
// const closePopupBtn = document.getElementById('closePopup');
// const popupHeader = document.getElementById('popupHeader');
// const popupDescription = document.getElementById('popupDesc');

//new dictionary for json data
const newDict = [];

//Map elements
let map;
let currentMap;
let mapOptionData =
    {enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0};


let currentSearch;
let waitTime = 0;
let events;
let currentDay;
let popUpOpen = false;

window.addEventListener("load", () => {
    //This function will execute after page load
    findSportDataDefault();
});

//Search box-button will launch findWithKeyword-function,
// which at first removing all default data from site, then it read
// Search input field data, and trying to find
// a matching tag from events-dictionary.
// If not match any tag, it will load a default data
function findWithKeyword() {
    //divElem.replaceChildren();
    eventList.replaceChildren();
    let searchTag = searchBox.value.toString();
    let count = 0;
    for(let i = 0; i < events.length;i++){
        for(let j = 0; j < events[i].eventTags.length; j++) {
            let tag = events[i].eventTags[j].name;
            if (searchTag.match(tag)) {
                count++;
                if (events[i].date >= currentDay) {
                    eventSetBySearch(i);
                    console.log("Löyty: " + tag);
                }
            }
        }
    }
    if (count < 1){
        alert("Any of event couldn't found by tag");
        findSportDataDefault();
    }
}

//Buttons
searchBtn.addEventListener('click', () =>{

    if(popUpOpen !== true){
        if(searchBox.value.length >= 3){
            findWithKeyword();
        }else{
            alert("Too sort tag");
            divElem.replaceChildren();
            findSportDataDefault();
        }
    }
});

//Function will create a new searchObject,
//execute query for api data and returning parsed
//json data from api
function findSportDataDefault() {
    currentSearch = new SearchData();

    //Tehdään haku
    currentSearch.doQuery(apiUrlSearchTab, "");
    waitUntilDataArrived();
}

function waitUntilDataArrived(){
    setTimeout(function() {
        waitTime++;
        if (waitTime >= 30){
           location.reload();
        }
        if (currentSearch.dataArrived !== true) {
            waitUntilDataArrived();
        }
        else {
             events = errorCheck(currentSearch.resultJson);
             currentDay = new Date();
            for (let i = 0; i < events.length; i++)
            {
                if(events[i].date >= currentDay){
                    //eventSet(i);
                    eventSetBySearch(i);
                }
            }
        }
    }, 1000)
}

// function eventSet(index){
//     //Elementit
//     let eventItem = document.createElement('article');
//     article = document.createElement('button');
//     let eventNameItem = document.createElement('h2');
//     let h2DataTime = document.createElement('h2');
//
//     //Luokat
//     eventItem.className = "eventItemContainer";
//     h2DataTime.className = "eventItem-date";
//     article.className = "eventItem-event";
//     article.id = events[index].eventID;
//
//     eventNameItem.innerHTML = events[index].eventName;
//     eventNameItem.id = events[index].eventID;
//     h2DataTime.innerHTML = events[index].date.toDateString();
//
//     //Koostaminen
//     eventItem.appendChild(h2DataTime);
//     article.appendChild(eventNameItem);
//     article.addEventListener('click', (event) => {
//         console.log("Event ID: " + event.target.getAttribute('id'));
//         let eventID = event.target.getAttribute('id');
//         openPopup(eventID);
//
//     });
//     eventItem.appendChild(article);
//     divElem.appendChild(eventItem);
// }

function openPopup(id){
    popup.classList.add('open-popup');
    for (let i = 0; i < newDict.length; i++) {
        if (newDict[i].eventID.match(id)) {
            console.log("Löyty " + newDict[i].eventID + " === " + id);
            // popupHeader.innerHTML = newDict[i].eventData.eventName;
            // popupDescription.innerHTML = newDict[i].eventData.eventDescription.intro;

            //Map
            currentMap = new MapData();
            createPopup(newDict[i].eventData);
            mapFunction(newDict[i].eventData.eventLocation);
        }
    }
}

function createPopup(eventData){
    //Elements
    let popupHeader = document.createElement('h2');
    let popupDescription= document.createElement('p');
    let popupMap = document.createElement('div');
    let popupCloseButton = document.createElement('button');


    //class
    popupMap.className = "map";

    //ID
    popupArticle.id = "popupContent";
    popupHeader.id = "popupHeader";
    popupDescription.id = "popupDesc";
    popupMap.id = "map";
    popupCloseButton.id = "closePopup";

    //Content
    popupHeader.innerHTML = eventData.eventName;
    popupDescription.innerHTML = eventData.eventDescription.intro;
    popupCloseButton.type = "button";
    popupCloseButton.innerHTML = "Close";
    popupCloseButton.addEventListener('click', closePopup);
    popupMap.style.width = "600px";
    popupMap.style.height = "300px";

    //Pile up
    popupArticle.appendChild(popupHeader);
    popupArticle.appendChild(popupDescription);
    popupArticle.appendChild(popupMap);
    popupArticle.appendChild(popupCloseButton);
    popup.appendChild(popupArticle);
}

//closePopupBtn.addEventListener('click', closePopup);
function closePopup(){
    popup.classList.remove('open-popup');
    popup.replaceChildren();
    popupArticle.replaceChildren();
    popUpOpen = false;
}

function eventSetBySearch(index){

    //Elements
    let eventListElement = document.createElement('li');
    let eventNameItem = document.createElement('button');
    let h2DataTime = document.createElement('h2');

    //Class
    eventNameItem.className = "eventItem-button";
    eventList.className = "eventItemContainer";
    h2DataTime.className = "eventItem-date";
    eventListElement.className = "event-li-item";

    eventNameItem.innerHTML = events[index].eventName;
    h2DataTime.innerHTML = events[index].date.toDateString();
    eventNameItem.id = events[index].eventID;
    eventNameItem.title = "Click for more information";

    //Pile up
    eventListElement.appendChild(h2DataTime);
    eventListElement.appendChild(eventNameItem);
    eventList.appendChild(eventListElement);
    divElem.appendChild(eventList);

    eventNameItem.addEventListener('click', (event) => {
        console.log("Event ID: " + event.target.getAttribute('id'));
        let eventID = event.target.getAttribute('id');
        if (popUpOpen === false){
            popUpOpen = true;
            openPopup(eventID);
        }
    });
}

//sortData function will iterate the data  and looks for errors
function errorCheck(data){
    let jsonDate;
    let idOfDate;
    let eventName;
    let location;
    let infoUrl;
    let tags;
    let description;

    let eventDictionary = [];
    for (let i = 0; i < data.length; i++){
        try {
            jsonDate = data[i].event_dates.starting_day;
            jsonDate = jsonDate.split('T');
        }catch (err){
            console.log("Error in date " +  i + ". " + err.stack);
            jsonDate = "Date missing!";
        }finally{
            try {
                idOfDate = data[i].id;
            }catch (err){
                console.log("Error in id " + err.stack);
                idOfDate = "Missing id!";
            }finally {
                try {
                    eventName = data[i].name.fi;
                }catch (err){
                    console.log("Error in name " + err.stack);
                    eventName = "Missing name!";
                }finally {
                    try {
                        location = data[i].location;
                    }catch (err){
                        console.log("Error in locations " + err.stack);
                        location = 'Location data missing!';
                    }
                    finally {
                        try {
                            infoUrl = data[i].info_url;
                        }catch (err){
                            console.log("Error in info_url " + err.stack);
                            infoUrl = 'Infolink missing!';
                        }finally {
                            try {
                                tags = data[i].tags;
                            }catch (err){
                                console.log("Error in tags " + err.stack);
                                tags = 'tags missing!';
                            }
                            finally {
                                try {
                                    description = data[i].description;
                                }catch (err){
                                    console.log("Error in description " + err.stack);
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

//Function sorting the data by date;
function sortingDict(dict){

    dict.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });

    return dict;
}

function mapFunction(currentEvent){

    currentMap.posLat = currentEvent.lat;
    currentMap.posLong = currentEvent.lon;

    currentMap.mapleaf = L.map('map').setView([currentMap.posLat, currentMap.posLong], 13);
    currentMap.options = mapOptionData;

    currentMap.Lmarker = L.marker([currentMap.posLat, currentMap.posLong]).addTo(currentMap.mapleaf).bindPopup("Here");

    currentMap.showMap();
}




