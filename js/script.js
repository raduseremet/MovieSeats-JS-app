const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seats:not(.ocupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

// save selected movie index and price
function setMovieData(movieIndex, moviePrice){

    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};


function updateSelectedCount (){
    const selectedSeats = document.querySelectorAll('.row .seats.selected');

    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });
   
    const SelectedSeatsCount = selectedSeats.length;
    count.innerText = SelectedSeatsCount;
    total.innerText = SelectedSeatsCount  * ticketPrice;

    localStorage.setItem('seatsSelected', JSON.stringify(seatsIndex));

};

// get data from local storage and populate  UI
function populateUI () {
    const selectedSeats = JSON.parse(localStorage.getItem('seatsSelected'));
    // check to see if any seat is selected
    if (selectedSeats !== null && selectedSeats.length > 0){

        seats.forEach(function(seat, index){
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
    const selectMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectMovieIndex !== null){
        movieSelect.selectedIndex = selectMovieIndex;
    }
}



// Select Movie event
movieSelect.addEventListener('change', function(e){

ticketPrice = +e.target.value;
setMovieData(e.target.selectedIndex, e.target.value);

updateSelectedCount();
});



// Seats click event
container.addEventListener('click', function(e) {

    if (e.target.classList.contains('seats') && !e.target.classList.contains('occupied')) {
      
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
    
});

// Update count and total

updateSelectedCount();
















