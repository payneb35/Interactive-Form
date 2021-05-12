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
        for (let j = 0; j < activitiesBoxCheckboxes.length; j++) {
            const firstTime = activitiesBoxCheckboxes[i].getAttribute('data-day-and-time');
            const secondTime = activitiesBoxCheckboxes[j].getAttribute('data-day-and-time');
            if (activitiesBoxCheckboxes[i].checked) {
                if (firstTime && secondTime && firstTime === secondTime && i != j) {
                    activitiesBoxCheckboxes[j].disabled = true;
                    activitiesBoxCheckboxes[j].parentElement.classList.add('disabled');
                }
            } else {
                if (firstTime && secondTime && firstTime === secondTime && i != j) {
                    activitiesBoxCheckboxes[j].disabled = false;
                    activitiesBoxCheckboxes[j].parentElement.classList.remove('disabled');
                }
            }
        }
    }
    totalCost.textContent = `Total: $${cost}`;
    checkActivities();
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
nameInput.addEventListener('input', checkName);

function checkName() {
    const isValidName = /^[a-z]+$/i.test(nameInput.value);
    if (!isValidName) {
        makeInvalid(nameInput.parentElement);
        const errorMessage = document.querySelector('span.hint');
        if (/\d/.test(nameInput.value)) {
            errorMessage.textContent = "Name field cannot include numbers";
        } else {
            errorMessage.textContent = "Name field cannot be blank";
        }
    } else {
        makeValid(nameInput.parentElement);
    }
    return isValidName;
}

const emailInput = document.querySelector('#email');
emailInput.addEventListener('input', checkEmail);

function checkEmail() {
    const isValidEmail = /^[^@]+@[^@.]+\.com$/i.test(emailInput.value);
    if (!isValidEmail) {
        makeInvalid(emailInput.parentElement);
    } else {
        makeValid(emailInput.parentElement);
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
        makeValid(activitiesBox);
        return true;
    } else {
        makeInvalid(activitiesBox);
        return false;
    }
}

const cardNumberInput = document.querySelector('#cc-num');
cardNumberInput.addEventListener('input', checkCardNumber);

function checkCardNumber() {
    const isValidCardNumber = /^\d{13,16}$/.test(cardNumberInput.value);
    if (!isValidCardNumber) {
        makeInvalid(cardNumberInput.parentElement);
    } else {
        makeValid(cardNumberInput.parentElement);
    }
    return isValidCardNumber;
}

const zipNumberInput = document.querySelector('#zip');
zipNumberInput.addEventListener('input', checkZipNumber);

function checkZipNumber() {
    const isValidZipNumber = /^\d{5}$/.test(zipNumberInput.value);
    if (!isValidZipNumber) {
        makeInvalid(zipNumberInput.parentElement);
    } else {
        makeValid(zipNumberInput.parentElement);
    }
    return isValidZipNumber;
}

const cvvNumberInput = document.querySelector('#cvv');
cvvNumberInput.addEventListener('input', checkCvvNumber);

function checkCvvNumber() {
    const isValidCvvNumber = /^\d{3,4}$/.test(cvvNumberInput.value);
    if (!isValidCvvNumber) {
        makeInvalid(cvvNumberInput.parentElement);
    } else {
        makeValid(cvvNumberInput.parentElement);
    }
    return isValidCvvNumber;
}

const form = document.querySelector('form');

form.addEventListener('submit', () => {
    checkName();
    checkEmail();
    checkActivities();
    if (paymentOptions.value === 'credit-card') {
        checkCardNumber();
        checkZipNumber();
        checkCvvNumber();
    }
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

function makeValid(element) {
    element.classList.remove('not-valid');
    element.lastElementChild.style.display = 'none';
    element.classList.add('valid');
}

function makeInvalid(element) {
    element.classList.add('not-valid');
    element.lastElementChild.style.display = 'flex';
    element.classList.remove('valid');
    event.preventDefault();
}