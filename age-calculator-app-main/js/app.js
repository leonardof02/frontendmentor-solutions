// ----------------------------- Validators
function validateYear( yearOfBirth ) {
    const currentYear = new Date( Date.now() );
    
    if( yearOfBirth.toString().length !== 4 || ! Number.isInteger( Number.parseInt(yearOfBirth) ) || yearOfBirth <= 0 )
        throw new TypeError("Must be a valid year");

    if( yearOfBirth > currentYear.getFullYear()  )
        throw new RangeError("Must be in the past");

    return
}

function validateMonth( monthOfBirth ) {
    if( ! Number.isInteger( monthOfBirth ) || monthOfBirth < 1 || monthOfBirth > 12 )
    throw new TypeError("Must be a valid month");
}

function validateDay( dayOfBirth) {
    const month = Number.parseInt( monthOfBirthInput.value );
    const year = Number.parseInt( yearOfBirthInput.value );
    const daysOfMonthOfBirth = new Date( year, month, 0 ).getDate();
    if( ! Number.isInteger( dayOfBirth ) || dayOfBirth < 1 || dayOfBirth > daysOfMonthOfBirth )
        throw new TypeError("Must be a valid day");
}

function isEmptyString( string ) {
    if( string.length === 0 )
        throw new Error("This field is required");
}

function calcAge( day, month, year ) {
    const birthDate = new Date(year, month, day);
    const currentDate = new Date( Date.now() );

    const age = {
        years: currentDate.getFullYear() - birthDate.getFullYear(),
        months: currentDate.getMonth() - birthDate.getMonth(),
        day: currentDate.getDate() - birthDate.getDate()
    }

    return age;
}

// ---------------------------- UI Control
const calcButton = document.getElementById("calc-age-button");

// Inputs
const dayOfBirthInput = document.getElementById("day-input");
const monthOfBirthInput = document.getElementById("month-input");
const yearOfBirthInput = document.getElementById("year-input");

// Outputs
const dayOfBirthOutput = document.getElementById("day-output");
const monthOfBirthOutput = document.getElementById("month-output");
const yearOfBirthOutput = document.getElementById("year-output");

//Error msgs
const dayError = document.getElementById("day-error-msg");
const monthError = document.getElementById("month-error-msg");
const yearError = document.getElementById("year-error-msg");

function checkErrors( yearOfBirth, monthOfBirth, dayOfBirth ) {

    let err = false;

    try {
        isEmptyString( yearOfBirthInput.value );
        validateYear( yearOfBirth );
        yearOfBirthInput.parentElement.classList.remove("error");
    } catch( error ) {
        yearOfBirthInput.parentElement.classList.add("error")
        yearError.innerText = error.message;
        err = true;
    }

    try {
        isEmptyString( monthOfBirthInput.value );
        validateMonth( monthOfBirth );
        monthOfBirthInput.parentElement.classList.remove("error");
    } catch( error ) {
        monthOfBirthInput.parentElement.classList.add("error");
        monthError.innerText = error.message;
        err = true;
    }

    try {
        isEmptyString( dayOfBirthInput.value );
        validateDay( dayOfBirth);
        dayOfBirthInput.parentElement.classList.remove("error");
    } catch( error ) {
        dayOfBirthInput.parentElement.classList.add("error");
        dayError.innerText = error.message;
        err = true;
    }

    return err;
}


calcButton.onclick = () => {

    const dayOfBirth = Number.parseInt( dayOfBirthInput.value );
    const monthOfBirth = Number.parseInt( monthOfBirthInput.value );
    const yearOfBirth = Number.parseInt( yearOfBirthInput.value );

    if( checkErrors( yearOfBirth, monthOfBirth, dayOfBirth ) ) {
        dayOfBirthOutput.innerText = "--";
        monthOfBirthOutput.innerText = "--";
        yearOfBirthOutput.innerText = "--";
    }
    else {
        const age = calcAge( dayOfBirth, monthOfBirth, yearOfBirth );
        dayOfBirthOutput.innerText = age.day;
        monthOfBirthOutput.innerText = age.months;
        yearOfBirthOutput.innerText = age.years;
    }
    
}

