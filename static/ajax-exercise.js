'use strict';

// PART 1: SHOW A FORTUNE

function showFortune() {

  fetch('/fortune')
  .then((response) => response.text())
  .then((serverData) => {
    document.querySelector('#fortune-text').innerHTML = serverData
  });

  // JSON.stringify(serverData);

}

//need to return based off of inline HTML


document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  //How to make this zipcode dynamic.
  const queryString = new URLSearchParams({ zipcode }).toString();
  const url = `/weather.json?${queryString}`

  fetch(url)
    .then((response) => response.text())
    .then((status) => {
      document.querySelector('#weather-info').innerHTML = status;
    });

}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();
  const formInputs = {
    melon_type : document.querySelector('#melon-type-field').value,
    qty : document.querySelector('#qty-field').value,
  }

  // do we need to remove the class order-error bc of cookies (when does it not error)? How does that work?
  //melon is returning as 'None'

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((responseJson) => {
    const orderStatus = document.querySelector("#order-status")
    orderStatus.innerHTML = responseJson.msg;
    orderStatus.classList.toggle("order-error")

  })

}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


function getDogImage(){

fetch('https://dog.ceo/api/breeds/image/random')
  .then((response) => response.json())
  .then((status) => {
    document.querySelector("#dog-image").insertAdjacentHTML('beforeend',`<img src = "${status.message}">`);
  });

}

document.querySelector('#get-dog-image').addEventListener('click', getDogImage);




