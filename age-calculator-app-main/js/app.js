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
    if( ! Number.isInteger( dayOfBirth ) || dayOfBirth < 1 || dayOfBirth > 31 )
        throw new TypeError("Must be a valid day");

    const daysOfMonthOfBirth = new Date( year, month, 0 ).getDate();
    if( dayOfBirth > daysOfMonthOfBirth )
        throw new TypeError("This month doesn't have this numbers of days");
        
}

function isEmptyString( string ) {
    if( string.length === 0 )
        throw new Error("This field is required");
}

function calcAge( day, month, year ) {
    const birthDate = new Date(year, month, day);
    const currentDate = new Date( Date.now() );

    // Init the age
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months, days;

    // Calc the difference in time
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const daysDifference  = currentDate.getDate()  - birthDate.getDate();

    // If the current month is before the birthday's month
    if( monthDifference < -1 || currentDate.getDate() < birthDate.getDate() ) {
        years--;
        months =  12 - (birthDate.getMonth() - currentDate.getMonth()) + 1;
    }
    else if( monthDifference === -1 ) {
        
        months = 0;
    }
    else
        months =  monthDifference + 1;

    // If the current day is before the birthday's day
    if( daysDifference < 0 ) {
        const daysInLastMonth = new Date( currentDate.getFullYear(), currentDate.getMonth() - 1, 0 ).getDate();
        days = daysInLastMonth - birthDate.getDate() + currentDate.getDate();
        months--;
    }
    else
        days = daysDifference;

    return {
        years,
        months,
        days
    };
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
        dayOfBirthOutput.innerText = age.days;
        monthOfBirthOutput.innerText = age.months;
        yearOfBirthOutput.innerText = age.years;
    }
    
}

