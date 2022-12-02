//Turo,Samu,Kaspar

//Funktio kutsussa lähetä koordinaatit mukana.
export default class MapData {
    constructor() {
        // Tänne palautetaan Lat,Long,kartta options,kartta markkerit ja mapleafit omasta javascriptistä.

        //Kertoo lat posiition
        this.posLat = '';
        //Kertoo long posiition
        this.posLong = '';
        // Asetukset paikkatiedon hakua varten (valinnainen)
        this.options = '';

        //tässä on meijän L property(Leafapi property) kartta.
        this.mapleaf = '';

        //Tässä on meijän kartta markkeri.
        this.Lmarker = '';
    }
    //voitte katsoa culture.js, siellä näkyy miten käydän classiä.
    // enableHighAccuracy: true,
    // timeout: 5000,
    // maximumAge: 0


    /*Pikku ohjeet:
    * Tee itselle uusi class omaan scriptiin näin -
    *
    * currentMAP;
    * currentMAP = new MapData();
    *
    * ja jos haluat tästä  tiedoja voit tehdä näin:
    * currentMAP.showMap();
    * (let lati) on this.posLat, (let longi) on this.posLong
    * ja (let options) on this.options (omassa koodissa voit sanoa CurrentMap.options = esimerkiksi options arraylista.)
    * kaiken voit kirjoitta omassa javascriptissä.
    * mapleaf on leafletin L property eli
    * L.map('map').setView([lati, longi], 13);
    * melkein sama juttu Lmarkerin kanssa:
    * L.marker([currentMAP.posLat, currentMAP.posLong]).addTo(currentMAP.mapleaf).bindPopup(datalist[datalindex].name);
    *
    * Näiden käyttö esimerkki löytyy culture.js viimeinen rivi.*/

    showMap() {
        console.log('sisällä karttafunctiossa');
        let lati = this.posLat;
        let longi = this.posLong;

        let LtileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });

        let options = this.options;
        const map = this.mapleaf;
        const Lmarker = this.Lmarker;
        // Asetukset paikkatiedon hakua varten (valinnainen)

        // Funktio, joka ajetaan, kun paikkatiedot on haettu
        function success(pos) {
            const crd = pos.coords;

            // Tulostetaan paikkatiedot konsoliin
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            // Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)

            LtileLayer.addTo(map);

            Lmarker.openPopup();
        }

        // Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        // Käynnistetään paikkatietojen haku
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
}



//Vanha versio:

// //Funktio kutsussa lähetä koordinaatit mukana.
//
// export function showMap(lat, long){
//
//     console.log('sisällä karttafunctiossa');
//     let posLat = lat;
//     let posLong = long;
//
//     // Asetukset paikkatiedon hakua varten (valinnainen)
//     const options = {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//     };
//
//     // Funktio, joka ajetaan, kun paikkatiedot on haettu
//     function success(pos) {
//         const crd = pos.coords;
//
//         // Tulostetaan paikkatiedot konsoliin
//         console.log('Your current position is:');
//         console.log(`Latitude : ${crd.latitude}`);
//         console.log(`Longitude: ${crd.longitude}`);
//         console.log(`More or less ${crd.accuracy} meters.`);
//
//         // Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)
//         //const map = L.map('map').setView([crd.latitude, crd.longitude], 13);
//         const map = L.map('map').setView([posLat, posLong], 13);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         }).addTo(map);
//
//
//
//         L.marker([posLat, posLong]).addTo(map)
//             //L.marker([crd.latitude, crd.longitude]).addTo(map)
//             .bindPopup('TÄÄLLÄ.')
//             .openPopup();
//     }
//
//     // Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
//     function error(err) {
//         console.warn(`ERROR(${err.code}): ${err.message}`);
//     }
//
//     // Käynnistetään paikkatietojen haku
//     navigator.geolocation.getCurrentPosition(success, error, options);
// }