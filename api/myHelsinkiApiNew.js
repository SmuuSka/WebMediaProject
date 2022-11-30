'use strict';
export default class SearchData {
    constructor() {
        this.resultJson = "";
        //Kiinteä haku Url tapahtumien hakuun
        this.apiUrl = 'https://open-api.myhelsinki.fi/';
        //Kiinteä proxy Url tapahtumien hakuun
        this.proxyUrl = 'https://api.allorigins.win/get?url=';
    }

    doQuery(tab, keyword) {
        //Kiinteään linkkiin lisätään välilehtikohtainen hakulinkki ja käyttäjän hakusana
        let apiQuery = this.apiUrl + tab + keyword;
        let proxyUrlQuery = this.proxyUrl + encodeURIComponent(apiQuery);

        console.log("Haku url: " + proxyUrlQuery);
        fetch(proxyUrlQuery).then(function (response) {
            return response.json();
        }).then(response => this.parseJsonData(response))
        return;
    }
    parseJsonData(jsonData){
        let jSonData = JSON.parse(jsonData.contents);
        let realData = jSonData.data;
        //Välilehdellä käytettävä Json data löytyy Oma hakuolio.resultJson
        //Hakuolio luodaan esim. haku = new SearchData();
        //Muista lisätä import SearchData from '../api/myHelsinkiApiNew.js'; moduuli omaan scriptiisi
        this.resultJson = realData;
        return;
    }
}





