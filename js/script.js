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

// function checkName() {
//     const nameInput = document.querySelector('#name');
//     const nameRegEx = /^[a-zA-Z]+$/;
//     let validName;
//     nameInput.addEventListener('input', () => {
//         validName = nameRegEx.test(nameInput.value);
//     });
//     if (validName) {
//         console.log("it's valid");
//     }
// }

// checkName();

const nameInput = document.querySelector('#name');
const nameRegEx = /^[a-z]+$/i;
let isValidName;

nameInput.addEventListener('input', checkName);

function checkName() {
    isValidName = nameRegEx.test(nameInput.value);
    if (!isValidName) {
        alert(`The Name field is invalid.`); 
        alert(`You can only use letters, and it must not be empty`);
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

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    if(checkName() && checkEmail()) {
        console.log('So far we is good');
    } else {
        console.log('not today buddy');
    }
    e.preventDefault();

});