/* create a dateInput variable and get the day input */
const dateInput = document.querySelector('#day')
/* create a monthInput variable and get the month input */
const monthInput = document.querySelector('#month')
/* create a yearInput variable and get the year input */
const yearInput = document.querySelector('#year')
/* create an inputs variable and get all inputs pf type number*/
const inputFields = document.querySelectorAll('input[type="number"]')
/* create labels variable and get all labels */
const labels = document.querySelectorAll('label')
/* create submit button variable and get the submit button */
const submitBtn = document.querySelector('.submit-btn')
/* get custom property color values */
const rootStyles = getComputedStyle(document.documentElement)
const primaryRed = rootStyles.getPropertyValue('--clr-primary-red')
const lightGrey = rootStyles.getPropertyValue('--clr-neutral-lightGrey')
/* create a variable currentYear and get the current year value*/
const currentYear = new Date().getFullYear()
/* create a variable currentMonth and get the current month value */
const currentMonth = new Date().getMonth() + 1
/* create a variable currentMonth and get the current date value */
const currentDate = new Date().getDate()
/* create a birthDate variable and store the dateInput value in it */
let birthMonth = monthInput.value
let birthYear = yearInput.value

/* check if any of the inputs are empty */
/* create a variable emptyInput and check if it was empty return false otherwise return true */
function checkEmptyInput (emptyInput) {
  return emptyInput.trim() === '' ? false : true
  /* trim() method just accepts string type values */
}

/* check if user's year input is valid or not
if birthYear is greater than currentYear print out "Must be in the past" */
function checkYearValidation () {
  const yearErrorMsg = document.querySelector('#year-validation')
  let birthYear = yearInput.value
  yearErrorMsg.textContent = ''
  if (!checkEmptyInput(birthYear)) {
    yearErrorMsg.textContent = 'This field is required'
  } else {
    if (birthYear > currentYear) {
      yearErrorMsg.textContent = 'Must be in the past'
      return false
    } else {
      return true
    }
  }
}

/* check if month 2 has 28 or 29 days */
function adjustLeapYear (year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 29
  } else {
    return 28
  }
}

function checkMonthValidation () {
  let birthMonth = monthInput.value
  const monthErrorMsg = document.querySelector('#month-validation')
  monthErrorMsg.textContent = ''
  if (!checkEmptyInput(birthMonth)) {
    monthErrorMsg.textContent = 'This field is required'
  } else {
    if (Number(birthMonth) < 1 || Number(birthMonth) > 12) {
      monthErrorMsg.textContent = 'Must be a valid month'
      return false
    } else {
      return true
    }
  }
}

function checkMonth () {
  let birthMonth = Number(monthInput.value)
  if (!checkMonthValidation(birthMonth)) {
    return false /* 'Must be a valid month' */
  } else {
    let days = 31
    let birthYear = Number(yearInput.value)
    if (birthMonth === 2) {
      days = adjustLeapYear(birthYear)
    } else if (
      birthMonth === 4 ||
      birthMonth === 6 ||
      birthMonth === 9 ||
      birthMonth === 11
    ) {
      days = 30
    }
    return days
  }
}

function checkDateValidation () {
  let birthDate = dateInput.value
  let days = checkMonth()
  const dateErrorMsg = document.querySelector('#date-validation')
  dateErrorMsg.textContent = ''
  if (!checkEmptyInput(birthDate)) {
    dateErrorMsg.textContent = 'This field is required'
  } else {
    if (Number(birthDate) < 1 || Number(birthDate) > 31) {
      dateErrorMsg.textContent = 'Must be a valid day'
      return false
    } else {
      if (Number(birthDate) > days) {
        dateErrorMsg.textContent = 'Must be a valid date'
        return false
      }
      return true
    }
  }
}

function checkIsString (inputValue) {
  return isNaN(inputValue) ? false : true
}

function calculateAge () {
  const yearAge = document.querySelector('.year-age')
  const monthAge = document.querySelector('.month-age')
  const dayAge = document.querySelector('.day-age')

  let birthDate = Number(dateInput.value)
  let birthMonth = Number(monthInput.value)
  let birthYear = Number(yearInput.value)

  yearAge.textContent = currentYear - birthYear
  monthAge.textContent = currentMonth - birthMonth
  dayAge.textContent = currentDate - birthDate
}

function checkValidation (whatever) {
  inputFields.forEach(i => {
    labels.forEach(l => {
      l.style.color = lightGrey
      i.style.borderColor = lightGrey
    })
  })
  if (!whatever) {
    inputFields.forEach(i => {
      labels.forEach(l => {
        l.style.color = primaryRed
        i.style.borderColor = primaryRed
      })
    })
    return false
  }
  return true
}

submitBtn.addEventListener('click', () => {
  if (
    checkValidation(checkDateValidation()) &&
    checkValidation(checkMonthValidation()) &&
    checkValidation(checkYearValidation())
  ) {
    calculateAge()
  }
})
