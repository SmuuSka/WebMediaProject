'use strict';

import sportData from '../jsonFiles/sport.json' assert { type: 'json' };
import cultureData from '../jsonFiles/culture.json' assert {type: 'json'};
import restaurantData from '../jsonFiles/restaurant.json' assert {type: 'json'};
let typeParam;
export function parseData(page){
    switch (page) {
        case "sport":
            typeParam = JSON.stringify(sportData);
            console.log("Sporttia: ");
            break;
        case "culture":
            typeParam = JSON.stringify(cultureData);
            console.log("Kulttuuria: ");
            break;
        case "restaurant":
            typeParam = JSON.stringify(restaurantData);
            console.log("Ruokaa: ");
            break
    }
    let parsedJson = JSON.parse(typeParam);
    //parsedJson.data on sama kuin resultJson
    return parsedJson.data;
}