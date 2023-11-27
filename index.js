const errorMsg = document.querySelector('.err-msg')
const label = document.querySelectorAll('label')
const inputField = document.querySelectorAll('input[type="number"]')
const submitBtn = document.querySelector('.submit-btn')

const rootStyles = getComputedStyle(document.documentElement)
const primaryRed = rootStyles.getPropertyValue('--clr-primary-red')

function checkYearValidation (birthYear) {
  const currentYear = new Date().getFullYear()
  return birthYear <= currentYear ? true : false /* 'Must be in the past' */
}

function adjustLeapYear (year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 29
  } else {
    return 28
  }
}

function checkMonthValidation (birthMonth) {
  return birthMonth < 13 && birthMonth > 0 ? true : false
}

function checkMonth (birthMonth) {
  if (!checkMonthValidation(birthMonth)) {
    return false /* 'Must be a valid month' */
  } else {
    let days = 31
    if (birthMonth === 2) {
      days = adjustLeapYear(2012)
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

function checkDateValidation (date) {
  return date < 1 || date > 31 ? false : true
}

function checkEmptyInput () {
  inputField.forEach(i => {
    if (i.value === '') {
      label.forEach(l => {
        l.style.color = primaryRed
        i.style.borderColor = primaryRed
      })
    }
  })
}

submitBtn.addEventListener('click', checkEmptyInput)
