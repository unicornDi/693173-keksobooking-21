'use strict';

const AVATARS = [
  `img/avatars/user01.png`,
  `img/avatars/user02.png`,
  `img/avatars/user03.png`,
  `img/avatars/user04.png`,
  `img/avatars/user05.png`,
  `img/avatars/user06.png`,
  `img/avatars/user07.png`,
  `img/avatars/user08.png`,
];
const ACCOMODATION_TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
const ACCOMODATION_FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const TIME = [
  `12:00`,
  `13:00`,
  `14:00`
];
const ACCOMODATION_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

let getRandomInt = (min, max) => Math.round(((Math.random() * (max - min)) + min));

let getRandomArrElement = (arr) => Math.floor(Math.random() * arr.length);

let generateAdData = function (numberOfArrays) {
  let advertisments = [];
  for (let i = 0; i < numberOfArrays; i++) {
    let offerData = {
      "author": {
        "avatar": AVATARS[getRandomArrElement(AVATARS)],
      },
      "offer": {
        "title": `Заголовок предложения`,
        "address": `${getRandomInt(0, 600)}, ${getRandomInt(0, 350)}`,
        "price": getRandomInt(10000, 50000),
        "type": ACCOMODATION_TYPES[getRandomArrElement(ACCOMODATION_TYPES)],
        "rooms": getRandomInt(1, 4),
        "guests": getRandomInt(1, 5),
        "checkin": TIME[getRandomArrElement(TIME)],
        "checkout": TIME[getRandomArrElement(TIME)],
        "features": ACCOMODATION_FEATURES.slice(0, getRandomInt(1, 5)),
        "description": ``,
        "photos": ACCOMODATION_PHOTOS[getRandomArrElement(ACCOMODATION_PHOTOS)],
      },
      "location": {
        "x": getRandomInt(130, 1200),
        "y": getRandomInt(130, 630),
      }
    };
    advertisments.push(offerData);
  }
  return advertisments;
};

const createPin = function (data) {
  let pinButtonTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let newPin = pinButtonTemplate.cloneNode(true);
  newPin.style.left = (data.location.x - 20) + `px`;
  newPin.style.top = (data.location.y - 40) + `px`;
  let avatar = newPin.querySelector(`img`);
  avatar.src = data.author.avatar;
  avatar.alt = data.offer.title;

  return newPin;
};

let renderPins = function () {
  let data = generateAdData(8);
  let poolPins = document.querySelector(`.map__pins`);
  let fragment = document.createDocumentFragment();
  let map = document.querySelector(`.map`);
  map.classList.remove(`map--faded`);

  for (let i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }

  return poolPins.appendChild(fragment);
};

renderPins();
