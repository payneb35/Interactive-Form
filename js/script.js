const name = document.querySelector('input#name');

const otherJobRole = document.querySelector('input.other-job-role');

const shirtColors = document.querySelector('.shirt-colors');
const shirtDesigns = document.querySelector('#design');

const activitiesBox = document.querySelector('.activities')
const activitiesBoxCheckboxes = document.querySelectorAll('#activities-box label input');
const totalCost = document.querySelector('.activities-cost');

const creditCard = document.querySelector('.credit-card');
const paypal = document.querySelector('.paypal');
const bitcoin = document.querySelector('.bitcoin');
const paymentOptions = document.querySelector('#payment');

name.focus();

paymentOptions.value = 'credit-card';
paypal.hidden = true;
bitcoin.hidden = true;

document.addEventListener('DOMContentLoaded', () => {
    const jobRole = document.querySelector('#title');

    jobRole.addEventListener('change', (event) => {
        if (jobRole.value === 'other') {
            otherJobRole.style.display = 'flex';
        } else {
            otherJobRole.style.display = 'none';
        }
    });
});

shirtDesigns.addEventListener('change', () => {
    shirtColors.style.display = 'block';
    const listedShirtColors = document.querySelectorAll('#color option');
    for (let i = 0; i < listedShirtColors.length; i++) {
        listedShirtColors[i].hidden = true;
        if (listedShirtColors[i].getAttribute('data-theme') == shirtDesigns.value) {
            listedShirtColors[i].hidden = false;
        }
    }
});

activitiesBox.addEventListener('change', (e) => {
    let cost = 0;
    for (let i = 0; i < activitiesBoxCheckboxes.length; i++) {
        if (activitiesBoxCheckboxes[i].checked) {
            cost += parseInt(activitiesBoxCheckboxes[i].getAttribute('data-cost'));
        }
    }
    totalCost.textContent = `Total: $${cost}`;
});

paymentOptions.addEventListener('change', () => {
    creditCard.hidden = true;
    paypal.hidden = true;
    bitcoin.hidden = true;
    if (paymentOptions.value === 'credit-card') {
        creditCard.hidden = false;
    }
    if (paymentOptions.value === 'paypal') {
        paypal.hidden = false;
    }
    if (paymentOptions.value === 'bitcoin') {
        bitcoin.hidden = false;
    }
});

const nameInput = document.querySelector('#name');
const nameRegEx = /^[a-z]+$/i;
let isValidName;

nameInput.addEventListener('input', checkName);

function checkName() {
    isValidName = nameRegEx.test(nameInput.value);
    if (!isValidName) {
        //alert(`The Name field is invalid.`); 
        //alert(`You can only use letters, and it must not be empty`);
    }
    return isValidName;
}

const emailInput = document.querySelector('#email');
const emailRegEx = /^[^@]+@[^@.]+\.com$/i;
let isValidEmail;

emailInput.addEventListener('input', checkEmail);

function checkEmail() {
    isValidEmail = emailRegEx.test(emailInput.value);
    if (!isValidEmail) {
        // alert(`The Email field is invalid`);
        // alert(`It must be in the ****@****.com format`);
    }
    return isValidEmail;
}

function checkActivities() {
    let isActivityChecked = [];
    for (let i = 0; i < activitiesBoxCheckboxes.length; i++) {
        if (activitiesBoxCheckboxes[i].checked) {
            isActivityChecked.push(true);
        }
    }
    if (isActivityChecked.includes(true)) {
        return true;
    } else {
        //alert("You haven't selected any activities");
        return false;
    }
}

const cardNumberInput = document.querySelector('#cc-num');
const cardNumberRegEx = /^\d{13,16}$/;
let isValidCardNumber;

cardNumberInput.addEventListener('input', checkCardNumber);

function checkCardNumber() {
    isValidCardNumber = cardNumberRegEx.test(cardNumberInput.value);
    //if (!isValidCardNumber)
    return isValidCardNumber;
}

const zipNumberInput = document.querySelector('#zip');
const zipNumberRegEx = /^\d{5}$/;
let isValidZipNumber;

zipNumberInput.addEventListener('input', checkZipNumber);

function checkZipNumber() {
    isValidZipNumber = zipNumberRegEx.test(zipNumberInput.value);
    //if (!isValidCardNumber)
    return isValidZipNumber;
}

const cvvNumberInput = document.querySelector('#cvv');
const cvvNumberRegEx = /^\d{3,4}$/;
let isValidCvvNumber;

cvvNumberInput.addEventListener('input', checkCvvNumber);

function checkCvvNumber(e) {
    isValidCvvNumber = cvvNumberRegEx.test(cvvNumberInput.value);
    if (!isValidCardNumber) {
        cvvNumberInput.classList.add('not-valid');
        console.log("Please enter a valid CVV");
        e.preventDefault();
    } else {
        cvvNumberInput.classList.remove('not-valid');
    }
    return isValidCvvNumber;
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    if (!checkName()) {
        console.log("Please enter a valid name");
        e.preventDefault();
    } else if (!checkEmail()) {
        console.log("Please enter a valid email");
        e.preventDefault();
    } else if (!checkActivities()) {
        console.log("Please check an activity");
        e.preventDefault();
    } else if (paymentOptions.value === 'credit-card') {
        if (!checkCardNumber()) {
            console.log("Please enter a valid credit card number");
            e.preventDefault();
        } else if (!checkZipNumber()) {
            console.log("Please enter a valid zip code");
            e.preventDefault();
        } else if (!checkCvvNumber()) {
            console.log("Please enter a valid CVV");
            e.preventDefault();
        } 
    } else {
        alert("Form submitted!!");
    }

    //e.preventDefault();
});

for (let i = 0; i < activitiesBoxCheckboxes.length; i++) {
    activitiesBoxCheckboxes[i].addEventListener('focus', (e) => {
        const focusLabel = e.target.parentElement;
        focusLabel.classList.add('focus');
    });
    activitiesBoxCheckboxes[i].addEventListener('blur', (e) => {
        const focusLabel = e.target.parentElement;
        focusLabel.classList.remove('focus');
    });
}