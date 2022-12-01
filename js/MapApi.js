
//Funktio kutsussa lähetä koordinaatit mukana.
export default class MapData {
    constructor() {
        this.posLat = '';
        this.posLong = '';
        this.options;
    }
    //voitte katsoa culture.js, siellä näkyy miten käydän classiä.
    // enableHighAccuracy: true,
    // timeout: 5000,
    // maximumAge: 0


    /*Pikku ohjeet:
    * Tee itselle uusi class omaan scriptiin näin -
    * currentMAP;
    * currentMAP = new MapData();
    * ja jos haluat lähettää tänne tiedoja voit tehdä näin:
    * currentMAP.showMap(datalat, datalon,mapoptiondata);
    *
    * datalat on (let lati) datalon on (let longi)
    * ja mapoptiondata on kartan optioneille tarkoitettu data.
    * kaiken voit kirjoitta omassa javascriptissä.*/


    // Tänne palautetaan Lat,Long, ja kartta options omasta javascriptistä.
    showMap(lat, long,mapoptions) {
        console.log('sisällä karttafunctiossa');
        let lati = this.posLat = lat;
        let longi =this.posLong = long;
        // Asetukset paikkatiedon hakua varten (valinnainen)
        this.options = mapoptions;

        // Funktio, joka ajetaan, kun paikkatiedot on haettu
        function success(pos) {
            const crd = pos.coords;

            // Tulostetaan paikkatiedot konsoliin
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            // Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)
            //const map = L.map('map').setView([crd.latitude, crd.longitude], 13);
            const map = L.map('map').setView([lati, longi], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);


            L.marker([lati, longi]).addTo(map)
                //L.marker([crd.latitude, crd.longitude]).addTo(map)
                .bindPopup('TÄÄLLÄ.')
                .openPopup();
        }

        // Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        // Käynnistetään paikkatietojen haku
        navigator.geolocation.getCurrentPosition(success, error, mapoptions);
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