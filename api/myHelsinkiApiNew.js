//Samu,Kaspar,Turo
'use strict';
export default class SearchData {
    constructor() {
        this.resultJson = "";
        //Kiinteä haku Url tapahtumien hakuun
        this.apiUrl = 'https://open-api.myhelsinki.fi/';
        //Kiinteä proxy Url tapahtumien hakuun
        this.proxyUrl = 'https://api.allorigins.win/get?url=';

        this.dataArrived = false;
    }

    doQuery(tab, keyword) {
        //Kiinteään linkkiin lisätään välilehtikohtainen hakulinkki ja käyttäjän hakusana
        let apiQuery = this.apiUrl + tab + keyword;
        console.log(apiQuery);
        let proxyUrlQuery = this.proxyUrl + encodeURIComponent(apiQuery);

        console.log("Haku url: " + proxyUrlQuery);
        console.log('Data call', this.dataArrived);
        fetch(proxyUrlQuery).then(function (response) {
            return response.json();
        }).then(response => this.parseJsonData(response))
            .then((result) => {
                console.log('Success:', result);
                this.dataArrived = true;
                console.log('Data arrived', this.dataArrived);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
        //return;
    }

    parseJsonData(jsonData) {
        let jSonData = JSON.parse(jsonData.contents);
        let realData = jSonData.data;
        //Välilehdellä käytettävä Json data löytyy Oma hakuolio.resultJson
        //Hakuolio luodaan esim. haku = new SearchData();
        //Muista lisätä import SearchData from '../api/myHelsinkiApiNew.js'; moduuli omaan scriptiisi
        this.resultJson = realData;
        //return;
    }
}





