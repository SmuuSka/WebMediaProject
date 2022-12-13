export default class SearchDataFINNKINO {

    constructor() {
        this.Filmkuvalista = [{}];
    }

    loadDoc() {
        let filmsList = this.Filmkuvalista;
        fetch('https://www.finnkino.fi/xml/Schedule/')
            .then((res) => res.text())
            .catch((error) => {
                console.error('Error:', error);
            })
            .then(function (data) {
                let parser = (new window.DOMParser()).parseFromString(data, 'text/xml');

                for (let i = 0; i < parser.getElementsByTagName('Show').length; i++) {

                    let title = parser.getElementsByTagName('Title')[i].childNodes[0].nodeValue;
                    let genres = parser.getElementsByTagName('Genres')[i].childNodes[0].nodeValue;
                    let filmImagelarge = parser.getElementsByTagName('EventLargeImagePortrait')[i].childNodes[0].nodeValue;
                    let rating = parser.getElementsByTagName('Rating')[i].childNodes[0].nodeValue;
                    let filmImagesmall = parser.getElementsByTagName('EventSmallImagePortrait')[i].childNodes[0].nodeValue;
                    let movietime = parser.getElementsByTagName('LengthInMinutes')[i].childNodes[0].nodeValue;
                    let year = parser.getElementsByTagName('ProductionYear')[i].childNodes[0].nodeValue;
                    let showurl = parser.getElementsByTagName('ShowURL')[i].childNodes[0].nodeValue;
                    let theatreName = parser.getElementsByTagName('Theatre')[i].childNodes[0].nodeValue;
                    let theatreID = parser.getElementsByTagName('TheatreID')[i].childNodes[0].nodeValue;

                    filmsList.push({
                        srcL: filmImagelarge,
                        srcS: filmImagesmall,
                        name: title,
                        movieGenre: genres.replace(/,/g, '\n'),
                        movieRating: rating,
                        movieduration: movietime,
                        movieyear: year,
                        movieurl: showurl,
                        cinemaName: theatreName,
                        cinemaID: theatreID
                    });
                }

            });
        this.Filmkuvalista = filmsList;

    }
}