
function validateName(value) {
    if (value == "") {
        return false;
    }
    return /^[A-Z][a-zA-z ]*$/.test(value);
}

function validateDate(value) {
    let elem = value.split('-');
    return elem[0] <= 2013 && elem[0] >= 1973;
}

function validateAge(value) {
    return /^\d+$/.test(value) && value >= 10 && value <= 50;
}

function validateEmail(value) {
    return /^[a-z][a-z0-9]+@[a-z][a-z0-9]+\.[a-z]+$/.test(value);
}

function validateInput() {
    let errors = "";

    let nameInput = document.forms["myForm"]["form_name"];
    let dateInput = document.forms["myForm"]["form_date"];
    let ageInput = document.forms["myForm"]["form_age"];
    let emailInput = document.forms["myForm"]["form_email"];
    
    if (!validateName(nameInput.value)) {
        errors += "Campul nume nu este completat corect.\n";
        nameInput.style.border = "3px solid red";
    } else {
        nameInput.style.border = "1px solid black";
    }

    if (!validateDate(dateInput.value)) {
        errors += "Campul data nu este completat corect.\n";
        dateInput.style.border = "3px solid red";
    } else {
        dateInput.style.border = "1px solid black";
    }

    if (!validateAge(ageInput.value)) {
        errors += "Campul varsta nu este completat corect.\n";
        ageInput.style.border = "3px solid red";
    } else {
        ageInput.style.border = "1px solid black";
    }

    if (!validateEmail(emailInput.value)) {
        errors += "Campul email nu este completat corect.\n";
        emailInput.style.border = "3px solid red";
    } else {
        emailInput.style.border = "1px solid black";
    }

    if (errors.length > 0) {
        alert(errors);
        return false;
    } else {
        alert('Datele sunt completate corect');
        return true;
    }
}