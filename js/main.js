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
const MAIN_PIN_SIZE = 65;
const mainPin = document.querySelector(`.map__pin--main`);
const formElements = document.querySelectorAll(`fieldset`);

let getRandomInt = (min, max) => Math.round(((Math.random() * (max - min)) + min));

let getRandomArrElement = (arr) => Math.floor(Math.random() * arr.length);

const initialState = () => {
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute(`disabled`, ``);
  }
};

let generateAdData = (numberOfArrays) => {
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

const createPin = (data) => {
  let pinButtonTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let newPin = pinButtonTemplate.cloneNode(true);
  newPin.style.left = (data.location.x - 20) + `px`;
  newPin.style.top = (data.location.y - 40) + `px`;
  let avatar = newPin.querySelector(`img`);
  avatar.src = data.author.avatar;
  avatar.alt = data.offer.title;

  return newPin;
};

const renderPins = () => {
  let data = generateAdData(8);
  let poolPins = document.querySelector(`.map__pins`);
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }

  return poolPins.appendChild(fragment);
};

const fillAddressField = () => {
  const addressField = document.querySelector(`#address`);
  let mainPinLocationX = parseFloat(mainPin.style.left) + Math.round(MAIN_PIN_SIZE / 2);
  let mainPinLocationY = parseFloat(mainPin.style.top) + Math.round(MAIN_PIN_SIZE);
  addressField.value = (`${mainPinLocationX}, ${mainPinLocationY}`);
};

const removeDisableClass = () => {
  let map = document.querySelector(`.map`);
  map.classList.remove(`map--faded`);
  let adForm = document.querySelector(`.ad-form`);
  adForm.classList.remove(`ad-form--disabled`);

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute(`disabled`);
  }
};

const activatePage = () => {
  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      removeDisableClass();
    }
  });
  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      removeDisableClass();
    }
  });
};

const roomCapacityValidation = () => {
  const roomSelection = document.querySelector(`#room_number`);
  const capacitySelection = document.querySelector(`#capacity`);

  roomSelection.addEventListener(`change`, function (evt) {
    const switchObj = {
      '1': [`1`],
      '2': [`1`, `2`],
      '3': [`1`, `2`, `3`],
      '100': [`0`]
    };
    let selectedGuestValue = capacitySelection.value;
    let validGuestsOptions = switchObj[evt.target.value];
    if (!validGuestsOptions.includes(selectedGuestValue)) {
      roomSelection.setCustomValidity(`Неподходящее колличество комнат!`);
    } else {
      roomSelection.setCustomValidity(``);
    }
    roomSelection.reportValidity();
  });

  capacitySelection.addEventListener(`change`, function (evt) {
    const switchObj = {
      '1': [`1`],
      '2': [`2`, `3`],
      '3': [`3`],
      '0': [`100`]
    };
    let selectedRoomValue = roomSelection.value;
    let validCapacityOptions = switchObj[evt.target.value];
    if (!validCapacityOptions.includes(selectedRoomValue)) {
      capacitySelection.setCustomValidity(`Неподходящее колличество гостей!`);
    } else {
      capacitySelection.setCustomValidity(``);
    }
    capacitySelection.reportValidity();
  });
};

initialState();
fillAddressField();
activatePage(roomCapacityValidation());
renderPins();
