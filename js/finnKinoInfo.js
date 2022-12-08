import SearchDataFINNKINO from '../api/FinnkinoData.js';

let movielist = [{}];
let currentdata = new SearchDataFINNKINO();
let button = document.getElementById("CINEMATABLE");
let dropdown = document.getElementById("custom-select");
let counter;
const defaultValues = document.getElementById('film-table');

currentdata.loadDoc();

setTimeout(dropdowndata,1000)


function dropdowndata(){
    for (let i = 1; i < currentdata.Filmkuvalista.length; i++) {
        movielist = currentdata.Filmkuvalista;
    }
    console.log("Toimii")
    let result = movielist.filter(
        (item, index) => index === movielist.findIndex(
            other => item.cinemaName === other.cinemaName
        ));
    let mySelect = document.getElementById('custom-select')
    for (let j = 1; j<result.length; j++) {
        let resultNew = result.sort();


        let myOption = document.createElement('option')
        myOption.text = resultNew[j].cinemaName;
        myOption.value = j;
        mySelect.appendChild(myOption)

    }


}

function finnKinoSheudule() {

    console.log("SISÄLLÄ")

    for (let i = 1; i < movielist.length; i++) {
        let hours = Math.floor(movielist[i].movieduration / 60);
        let minutes = movielist[i].movieduration % 60;
        let movieTimeConvert = hours + 't ' + minutes + ' min';
        let table;
        table = '<tr>' +
            '<td class="poster"><img src="' + movielist[i].srcS + '" alt="image"></td>' +
            '<td class="film-title">' + movielist[i].name +
            '</td>' + '<br>' +
            '<td>' + movielist[i].movieGenre + '<br>' +
            '<p>' + movieTimeConvert + '</p>' +
            '<p>Rating:' + movielist[i].movieRating + '</p>' +
            '</td>' +
            '<td><a href=" ' + movielist[i].movieurl + ' "><button type="submit" class="btn-ticket"' +
            ' style="width: 100px; height: 50px; background-color: crimson;' +
            'color: white; border-radius: 10px; ">Osta liput</button></a></td>' +
            '<td>' + movielist[i].cinemaName + '</td>' +
            '</tr>';
        document.getElementById("film-table").innerHTML += table;
    }
}


// this function change values dropdown
function changeVal() {

    let index = document.getElementById('custom-select').selectedIndex;
    let Tchoose = movielist[index];
    let thechosenvalue = document.getElementById('custom-select').options[index].text
    // let inputtext = document.getElementById('searchMovie').value


    // alert("value =" + document.getElementById('custom-select').value); // show selected value
    // alert("text =" + document.getElementById('custom-select').options[index].text);

    for (let i = 0; i < movielist.length; i++) {
        let hours = Math.floor(movielist[i].movieduration / 60);
        let minutes = movielist[i].movieduration % 60;
        let movieTimeConvert = hours + 't ' + minutes + ' min';
        let table;
        if (movielist[i].cinemaName === thechosenvalue) {
            console.log("YES")
            table = '<tr>' +
                '<td class="poster"><img src="' + movielist[i].srcS + '" alt="image"></td>' +
                '<td class="film-title">' + movielist[i].name +
                '</td>' + '<br>' +
                '<td>' + movielist[i].movieGenre + '<br>' +
                '<p>' + movieTimeConvert + '</p>' +
                '<p>Rating:' + movielist[i].movieRating + '</p>' +
                '</td>' +
                '<td><a href=" ' + movielist[i].movieurl + ' "><button type="submit" class="btn-ticket"' +
                ' style="width: 100px; height: 50px; background-color: crimson;' +
                'color: white; border-radius: 10px; ">Osta liput</button></a></td>' +
                '<td>' + movielist[i].cinemaName + '</td>' +
                '</tr>';


            document.getElementById("film-table").innerHTML += table;
        }
        // else if (inputtext.includes(movielist[i].name) && movielist[i].cinemaName === thechosenvalue){
        //     console.log("MATCH")
        //     table = '<tr>' +
        //         '<td class="poster"><img src="' + movielist[i].srcS + '" alt="image"></td>' +
        //         '<td class="film-title">' + movielist[i].name +
        //         '</td>' + '<br>' +
        //         '<td>' + movielist[i].movieGenre + '<br>' +
        //         '<p>' + movieTimeConvert + '</p>' +
        //         '<p>Rating:' + movielist[i].movieRating + '</p>' +
        //         '</td>' +
        //         '<td><a href=" ' + movielist[i].movieurl + ' "><button type="submit" class="btn-ticket"' +
        //         ' style="width: 100px; height: 50px; background-color: crimson;' +
        //         'color: white; border-radius: 10px; ">Osta liput</button></a></td>' +
        //         '<td>' + movielist[i].cinemaName + '</td>' +
        //         '</tr>';
        //     document.getElementById("film-table").innerHTML += table;
        //     break;
        // }
    }
}

button.addEventListener('click', changeVal);
dropdown.addEventListener('change', resetInputs);

function resetInputs() {
    // Reset the child select options to default
    if (counter === 1 ) {
        counter = 0;
    }
    defaultValues.innerHTML = '';
}


// search movie jos tarvitse

// else if (inputtext.includes(movielist[i].name) && movielist[i].cinemaName === thechosenvalue){
//     console.log("MATCH")
//     table = '<tr>' +
//         '<td class="poster"><img src="' + movielist[i].srcS + '" alt="image"></td>' +
//         '<td class="film-title">' + movielist[i].name +
//         '</td>' + '<br>' +
//         '<td>' + movielist[i].movieGenre + '<br>' +
//         '<p>' + movieTimeConvert + '</p>' +
//         '<p>Rating:' + movielist[i].movieRating + '</p>' +
//         '</td>' +
//         '<td><a href=" ' + movielist[i].movieurl + ' "><button type="submit" class="btn-ticket"' +
//         ' style="width: 100px; height: 50px; background-color: crimson;' +
//         'color: white; border-radius: 10px; ">Osta liput</button></a></td>' +
//         '<td>' + movielist[i].cinemaName + '</td>' +
//         '</tr>';
//     document.getElementById("film-table").innerHTML += table;
//     break;
// }