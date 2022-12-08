//Samu,Kaspar,Turo
'use strict';

export default class SearchData {
    constructor() {
        this.resultJson = "";
        //Kiinteä haku Url tapahtumien hakuun
        this.apiUrl = 'https://open-api.myhelsinki.fi/';
        //Kiinteä proxy Url tapahtumien hakuun
        this.proxyUrl = 'https://users.metropolia.fi/~ilkkamtk/proxy.php?url=';

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
        }).then((data) =>  {
            this.parseJsonData(data);
            this.dataArrived = true;
        }).catch((error) =>{
            console.error('Error: ' + error);
        });
    }



    parseJsonData(jsonData) {
        // Välilehdellä käytettävä Json data löytyy Oma hakuolio.resultJson
        // Hakuolio luodaan esim. haku = new SearchData();
        // Muista lisätä import SearchData from '../api/myHelsinkiApiNew.js'; moduuli omaan scriptiisi
        let parsedJson = JSON.stringify(jsonData);
        this.resultJson = JSON.parse(parsedJson).data;
    }
}





