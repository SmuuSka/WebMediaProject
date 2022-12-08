import SearchDataFINNKINO from '../api/FinnkinoData.js';
//Semen-Morozov Ja Kaspar Tullus
const slider = document.querySelector(".slider");
const btnLeft = document.getElementById("moveLeft");
const btnRight = document.getElementById("moveRight");
const indicators = document.querySelectorAll(".indicator");

//let baseSliderWidth = slider.offsetWidth;
let activeIndex = 0; // Sliderin sivu

//PÄÄ DATA LISTA (TÄNNE TULEE KAIKKI DATA SISÄLLE!)
let movies = [{}];

// VALMISTELLAAN UUSI CLASS finnkinoDATA.jssä jotta saadan DATA.
let currentpictures = new SearchDataFINNKINO();

// Tämä ottaa kaiken tarvittavan tiedon FinnkinoData.jstä!
currentpictures.loadDoc();

// Täälä valmistellaan "LIGHTBOX"/"CAROUSEL" elementtejä for loopilla!
function populateSlider() {

    // Tässä for loopissa lisäämme kaiken Saadun datan movies Object/Array listaan!
    for (let i = 0; i < currentpictures.Filmkuvalista.length; i++) {
        movies = currentpictures.Filmkuvalista;
    }
    console.log(movies);

    // Tässä tulostetaan tiedot ja valmistellaan elementtejä saadusta tiedosta.
    setTimeout(function () {
        for (let i = 0; i < 30 + Math.floor(Math.random()*60); i++) {
            console.log(movies.length);
            if (movies[i].srcL === null) {
                movies[i].srcL === movies[i+1].srcL
                console.log("NULL");
            }else if (movies[i] === null){

            }else {

                //1 ELEMENTTI
                const newmoviefig = document.createElement("figure");
                newmoviefig.className = "movie";
                newmoviefig.id = "movie" + i;
                slider.appendChild(newmoviefig)

                //2 ELEMENTTI, 1 ELEMENTIN SISÄLLÄ
                const newMovie = document.createElement('img');
                newMovie.src = movies[i+1].srcL;
                newMovie.alt = ""
                newMovie.srcset = ""
                newmoviefig.appendChild(newMovie);

                //3 ELEMENTTI, 2 ELEMENTIN SISÄLLÄ
                const descfig = document.createElement('figure');
                descfig.className = "description"
                const a = document.createElement("a")
                a.href =movies[i].movieurl
                a.innerText = "Leffan Kotisivu"
                descfig.appendChild(a)

                //4 ELEMENTTI, 3 ELEMENTIN SISÄLLÄ
                const descbuttonfig = document.createElement('figure');
                descbuttonfig.className = "description__buttons-container"

                //5 ELEMENTTI, 3 ELEMENTIN SISÄLLÄ
                const figcapbuttonfaplay = document.createElement('figcaption');
                figcapbuttonfaplay.className = "description__button"

                //6 ELEMENTTI, 3 ELEMENTIN SISÄLLÄ
                const figcapbuttonfaplus = document.createElement('figcaption')
                figcapbuttonfaplus.className = "description__button"

                //7 ELEMENTTI, 3 ELEMENTIN SISÄLLÄ
                const figcapbuttonthumup = document.createElement('figcaption')
                figcapbuttonthumup.className = "description__button"

                //8 ELEMENTTI, 3 ELEMENTIN SISÄLLÄ
                const figcapbuttonthumdown = document.createElement('figcaption')
                figcapbuttonthumdown.className = "description__button"

                //9 ELEMENTTI, 3 ELEMENTIN SISÄLLÄ
                const figcapbuttonchevrondown = document.createElement('figcaption')
                figcapbuttonchevrondown.className = "description__button"

                //10 ELEMENTTI, 5 ELEMENTIN SISÄLLÄ
                const iplay = document.createElement('i')
                iplay.className = "fas fa-play"

                //11 ELEMENTTI, 6 ELEMENTIN SISÄLLÄ
                const iplus = document.createElement('i')
                iplus.className = "fas fa-plus"

                //12 ELEMENTTI, 7 ELEMENTIN SISÄLLÄ
                const ithumup = document.createElement('i')
                ithumup.className = "fas fa-thumbs-up"

                //13 ELEMENTTI, 8 ELEMENTIN SISÄLLÄ
                const ithumdown = document.createElement('i')
                ithumdown.className = "fas fa-thumbs-down"

                //14 ELEMENTTI, 9 ELEMENTIN SISÄLLÄ
                const ichevro = document.createElement("i")
                ichevro.className = "fas fa-chevron-down"

                const divtexcont = document.createElement('div')
                divtexcont.className= "description__text-container"
                const divspanmatch = document.createElement('span')
                divspanmatch.className ="description__match"
                divspanmatch.innerText = movies[i].movieyear
                const divspanrating = document.createElement('span')
                divspanrating.className ="description__rating"
                divspanrating.innerText = movies[i].movieRating

                const divspanlenght = document.createElement('span')
                divspanlenght.className ="description__length"
                const hours = Math.floor(movies[i].movieduration / 60);
                const minutes = movies[i].movieduration % 60;
                divspanlenght.innerText = hours+"h "+minutes+"m ";

                const divspangenre = document.createElement('span')
                divspangenre.className = "genrespan"
                divspangenre.innerText = movies[i].movieGenre
                const br = document.createElement('br')

                descfig.appendChild(descbuttonfig);
                descbuttonfig.appendChild(figcapbuttonfaplay)
                figcapbuttonfaplay.appendChild(iplay)

                descbuttonfig.appendChild(figcapbuttonfaplus)
                figcapbuttonfaplus.appendChild(iplus)

                descbuttonfig.appendChild(figcapbuttonthumup)
                figcapbuttonthumup.appendChild(ithumup)

                descbuttonfig.appendChild(figcapbuttonthumdown)
                figcapbuttonthumdown.appendChild(ithumdown)

                descbuttonfig.appendChild(figcapbuttonchevrondown)
                figcapbuttonchevrondown.appendChild(ichevro)


                newmoviefig.appendChild(descfig);
                descfig.appendChild(divtexcont)
                divtexcont.appendChild(divspanmatch)
                divtexcont.appendChild(divspanrating)
                divtexcont.appendChild(divspanlenght)
                divtexcont.appendChild(divspangenre)
                divtexcont.appendChild(br)
                divtexcont.appendChild(br)



                slider.insertBefore(newmoviefig, slider.childNodes[slider.childNodes.length - 1]);
            }
        }
    }, 1000);

}
populateSlider()
// delete the initial movie in the html
const initialMovie = document.getElementById("movie0");
initialMovie.remove();

// Update the indicators that show which page we're currently on
function updateIndicators(index) {
    indicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });
    let newActiveIndicator = indicators[index];
    newActiveIndicator.classList.add("active");
}
// Scroll Left button
btnLeft.addEventListener("click", (e) => {
    let movieWidth = document.querySelector(".movie").getBoundingClientRect()
        .width;
    let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

    slider.scrollBy({
        top: 0,
        left: -scrollDistance,
        behavior: "smooth",
    });
    activeIndex = (activeIndex - 1) % 5;
    console.log(activeIndex);
    updateIndicators(activeIndex);
});

// Scroll Right button
btnRight.addEventListener("click", (e) => {
    let movieWidth = document.querySelector(".movie").getBoundingClientRect()
        .width;
    let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

    console.log(`movieWidth = ${movieWidth}`);
    console.log(`scrolling right ${scrollDistance}`);
    if (activeIndex === 3){
        setTimeout(function (){

            for (let i = 0; i < 6; i++){
                let elements = slider.getElementsByClassName('movie');
                elements[i].remove();
                console.log("REMOVE")
            }
        },200);
        setTimeout(function (){
            for (let i = 16; i > 15; i--){
                let elements = slider.getElementsByClassName('movie');
                elements[i].remove();
                console.log("REMOVE")
            }
        },200);


    }
    // if we're on the last page
    if (activeIndex === 3) {
        populateSlider();

        // duplicate all the items in the slider (this is how we make 'looping' slider)
        slider.scrollBy({
            top: 0,
            left: -scrollDistance,
            behavior: "smooth",
        });
        activeIndex = 0;
        updateIndicators(activeIndex);
    } else {
        slider.scrollBy({
            top: 0,
            left: +scrollDistance,
            behavior: "smooth",
        });
        activeIndex = (activeIndex + 1) % 5;
        console.log(activeIndex);
        updateIndicators(activeIndex);
    }
});



