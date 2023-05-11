
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

function validateAge(value, dateValue) {
    let ok = /^\d+$/.test(value) && value >= 8 && value <= 50;
    ok = ok && (new Date().getFullYear() - dateValue.split("-")[0] == value);
    return ok;
}

function validateEmail(value) {
    return /^[a-z][a-z0-9]+@[a-z][a-z0-9]+\.[a-z]+$/.test(value);
}

$(document).ready(() => {
    $('form').on('submit', function(event) {
        event.preventDefault();

        let errors = "";

        let nameInput = $("form[name='myForm'] input[name='form_name']");
        let dateInput = $("form[name='myForm'] input[name='form_date']");
        let ageInput = $("form[name='myForm'] input[name='form_age']");
        let emailInput = $("form[name='myForm'] input[name='form_email']");

        if (!validateName(nameInput.val())) {
            errors += "Campul nume nu este completat corect.\n";
            nameInput.css("border", "3px solid red");
        } else {
            nameInput.css("border", "1px solid black");
        }

        if (!validateDate(dateInput.val())) {
            errors += "Campul data nu este completat corect.\n";
            dateInput.css("border", "3px solid red");
        } else {
            dateInput.css("border", "1px solid black");
        }

        if (!validateAge(ageInput.val(), dateInput.val())) {
            errors += "Campul varsta nu este completat corect.\n";
            ageInput.css("border", "3px solid red");
        } else {
            ageInput.css("border", "1px solid black");
        }

        if (!validateEmail(emailInput.val())) {
            errors += "Campul email nu este completat corect.\n";
            emailInput.css("border", "3px solid red");
        } else {
            emailInput.css("border", "1px solid black");
        }

        if (errors.length > 0) {
            alert(errors);
            return false;
        } else {
            alert('Datele sunt completate corect');
            return true;
        }
    })
})