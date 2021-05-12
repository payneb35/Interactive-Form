//Selecting all DOM elements that need to be manipulated
const name = document.querySelector('input#name');
const otherJobRole = document.querySelector('input.other-job-role');
const jobRole = document.querySelector('#title');
const shirtColors = document.querySelector('.shirt-colors');
const shirtDesigns = document.querySelector('#design');
const activitiesBox = document.querySelector('.activities')
const activitiesBoxCheckboxes = document.querySelectorAll('#activities-box label input');
const totalCost = document.querySelector('.activities-cost');
const creditCard = document.querySelector('.credit-card');
const paypal = document.querySelector('.paypal');
const bitcoin = document.querySelector('.bitcoin');
const paymentOptions = document.querySelector('#payment');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const cardNumberInput = document.querySelector('#cc-num');
const zipNumberInput = document.querySelector('#zip');
const cvvNumberInput = document.querySelector('#cvv');
const form = document.querySelector('form');

//Focusing on the name input when page loads
name.focus();

//Setting default payment type to credit card
paymentOptions.value = 'credit-card';
//Hiding extra info about other payment types
paypal.hidden = true;
bitcoin.hidden = true;

//Shows "Other job role?" input when "Other" is selected
jobRole.addEventListener('change', (event) => {
    if (jobRole.value === 'other') {
        otherJobRole.style.display = 'flex';
    } else {
        otherJobRole.style.display = 'none';
    }
});

//Show only color options available for selected design
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

//Handles all checking/unchecking in activities section
activitiesBox.addEventListener('change', (e) => {
    let cost = 0;
    for (let i = 0; i < activitiesBoxCheckboxes.length; i++) {
        //Adds up the total cost of selected activities
        if (activitiesBoxCheckboxes[i].checked) {
            cost += parseInt(activitiesBoxCheckboxes[i].getAttribute('data-cost'));
        }
        //Disables options that occur at the same time as already selected options
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

//Displays the correct information for a change in payment type
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

//Validates user input as it is entered into the form
nameInput.addEventListener('input', checkName);
emailInput.addEventListener('input', checkEmail);
cardNumberInput.addEventListener('input', checkCardNumber);
zipNumberInput.addEventListener('input', checkZipNumber);
cvvNumberInput.addEventListener('input', checkCvvNumber);

//Validates all required fields before submit
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

//Provides "focusing" on activities to help with accessibility
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

//This function validates the "Name" field
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

//This function validates the "Email" field
function checkEmail() {
    const isValidEmail = /^[^@]+@[^@.]+\.com$/i.test(emailInput.value);
    if (!isValidEmail) {
        makeInvalid(emailInput.parentElement);
    } else {
        makeValid(emailInput.parentElement);
    }
    return isValidEmail;
}

//This function verifies that at least one activity is selected
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

//This function validates the credit card number
function checkCardNumber() {
    const isValidCardNumber = /^\d{13,16}$/.test(cardNumberInput.value);
    if (!isValidCardNumber) {
        makeInvalid(cardNumberInput.parentElement);
    } else {
        makeValid(cardNumberInput.parentElement);
    }
    return isValidCardNumber;
}

//This function validates the credit card zip code
function checkZipNumber() {
    const isValidZipNumber = /^\d{5}$/.test(zipNumberInput.value);
    if (!isValidZipNumber) {
        makeInvalid(zipNumberInput.parentElement);
    } else {
        makeValid(zipNumberInput.parentElement);
    }
    return isValidZipNumber;
}

//This function validates the credit card CVV
function checkCvvNumber() {
    const isValidCvvNumber = /^\d{3,4}$/.test(cvvNumberInput.value);
    if (!isValidCvvNumber) {
        makeInvalid(cvvNumberInput.parentElement);
    } else {
        makeValid(cvvNumberInput.parentElement);
    }
    return isValidCvvNumber;
}

//This function adjusts the element styling when the element is valid
function makeValid(element) {
    element.classList.remove('not-valid');
    element.lastElementChild.style.display = 'none';
    element.classList.add('valid');
}

//This function adjusts the element stylying when the element is invalid
function makeInvalid(element) {
    element.classList.add('not-valid');
    element.lastElementChild.style.display = 'flex';
    element.classList.remove('valid');
    event.preventDefault();
}