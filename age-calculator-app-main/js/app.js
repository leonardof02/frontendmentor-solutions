// ----------------------------- Validators
function validateYear( yearOfBirth = 3 ) {
    const currentYear = new Date( Date.now() );
    
    if( yearOfBirth.toString().length != 4 || ! Number.isInteger(yearOfBirth) || yearOfBirth <= 0 )
        throw new TypeError("Must be a valid year");

    if( yearOfBirth > currentYear.getFullYear()  )
        throw new RangeError("Must be in the past");
}

function validateMonth( monthOfBirth ) {
    if( ! Number.isInteger( monthOfBirth ) || monthOfBirth < 1 || monthOfBirth > 12 )
    throw new TypeError("Must be a valid month");
}

function validateDay( dayOfBirth, monthOfBirth, yearOfBirth ) {
    const daysOfMonthOfBirth = new Date( yearOfBirth, monthOfBirth, 0 ).getDate();
    if( ! Number.isInteger( dayOfBirth ) || dayOfBirth < 1 || dayOfBirth > daysOfMonthOfBirth )
        throw new TypeError("Must be a valid day");
}

// ---------------------------- UI Control
const calcButton = document.getElementById("calc-age-button");

const dayOfBirthInput = document.getElementById("day-input");
const monthOfBirthInput = document.getElementById("month-input");
const yearOfBirthInput = document.getElementById("year-input");

const dayOfBirthOutput = document.getElementById("day-output");
const monthOfBirthOutput = document.getElementById("month-output");
const yearOfBirthOutput = document.getElementById("year-output");

calcButton.onclick = () => {
    const dayOfBirth = Number.parseInt( dayOfBirthInput.value );
    const monthOfBirth = Number.parseInt( monthOfBirthInput.value );
    const yearOfBirth = Number.parseInt( yearOfBirthInput.value );

    validateYear( yearOfBirth );
    validateMonth( monthOfBirth );

    console.log( dayOfBirth, monthOfBirth, yearOfBirth );
}