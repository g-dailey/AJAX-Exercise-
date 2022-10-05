'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div

  fetch('/fortune')
  .then((response) => response.text())
  .then((serverData) => {
    document.querySelector('#fortune-text').innerText = JSON.stringify(serverData);
  });

}


document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({ zipcode: 94110 }).toString();
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
    melon : document.querySelector('#melon-type-field').value,
    qty : document.querySelector('#qty-field').value,
  }

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),

  })
  .then((response) => response.json())
  .then((responseJson) => {
    alert(responseJson.status);
  })

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
