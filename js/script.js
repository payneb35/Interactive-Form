const name = document.querySelector('input#name');

const otherJobRole = document.querySelector('input.other-job-role');

const shirtColors = document.querySelector('.shirt-colors');
const shirtDesigns = document.querySelector('#design');

name.focus();

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

const activitiesBox = document.querySelector('#activities-box')
const activitiesBoxCheckboxes = document.querySelectorAll('#activities-box label input');
const totalCost = document.querySelector('.activities-cost');
activitiesBox.addEventListener('change', (e) => {
    let cost = 0;
    for (let i = 0; i < activitiesBoxCheckboxes.length; i++) {
        if (activitiesBoxCheckboxes[i].checked) {
            cost += parseInt(activitiesBoxCheckboxes[i].getAttribute('data-cost'));
        }
    }
    totalCost.textContent = `Total: $${cost}`;
});