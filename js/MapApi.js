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
        this.Mapincluded = 0;
    }

    showMap() {
        console.log('sisällä karttafunctiossa');
        let lati = this.posLat;
        let longi = this.posLong;

        let LtileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });
        let mapROUTEON = this.Mapincluded
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
                if (mapROUTEON === 1){
                    L.Routing.control({
                    waypoints: [
                        L.latLng(crd.latitude, crd.longitude),
                        L.latLng(lati, longi)
                    ],
                }).addTo(map);
                    LtileLayer.addTo(map);
                    Lmarker.openPopup();
                }else{
            LtileLayer.addTo(map);

                Lmarker.openPopup();
                }
        }

        // Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        // Käynnistetään paikkatietojen haku
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
}