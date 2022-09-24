import throttle from 'lodash.throttle';

const input = document.querySelector('form');
const email = input.querySelector('[name="email"]');
const textarea = input.querySelector('[name="message"]');

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

console.log(formData);

populateForm();

input.addEventListener('submit', onFormSubmit);
input.addEventListener('input', throttle(onInput, 1000));

function onInput(e) {
	formData[e.target.name] = e.target.value;

	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(e) {
	e.preventDefault();
	e.currentTarget.reset();
	
	localStorage.removeItem(LOCALSTORAGE_KEY);
}

function populateForm() {
	const savedInfo = localStorage.getItem(LOCALSTORAGE_KEY)

	if (savedInfo) {
		const parsedInfo = JSON.parse(savedInfo);

		if (parsedInfo.email) {
			email.value = parsedInfo.email;
			formData.email = parsedInfo.email;
		} 
		if (parsedInfo.message) {
			textarea.value = parsedInfo.message;
			formData.message = parsedInfo.message;
		} 
	}
}