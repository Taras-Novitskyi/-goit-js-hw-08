import throttle from 'lodash.throttle';

const input = document.querySelector('form');
const email = input.querySelector('[name="email"]');
const textarea = input.querySelector('[name="message"]');

const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = {};

populateForm();

input.addEventListener('submit', onFormSubmit);
input.addEventListener('input', throttle(onInput, 500));

function onInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  if (!email.value || !textarea.value) {
    alert('Please fill in all input fields');
    return;
  }
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  formData = {};
}

function populateForm() {
  const savedInfo = localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedInfo) {
    const parsedInfo = JSON.parse(savedInfo);

    if (parsedInfo.email) {
      email.value = parsedInfo.email;
    }
    if (parsedInfo.message) {
      textarea.value = parsedInfo.message;
    }

    for (const property in parsedInfo) {
      formData[property] = parsedInfo[property];
    }
  }
}
