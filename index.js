/* get custom property color values */
const rootStyles = getComputedStyle(document.documentElement)
const primaryRed = rootStyles.getPropertyValue('--clr-primary-red')
const lightGrey = rootStyles.getPropertyValue('--clr-neutral-lightGrey')

const dateInput = document.querySelector('[data-day-input]')
const monthInput = document.querySelector('[data-month-input]')
const yearInput = document.querySelector('[data-year-input]')

const inputFields = document.querySelectorAll('input[type="number"]')
const labels = document.querySelectorAll('label')
const submitBtn = document.querySelector('[data-submit-btn]')

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1
const currentDate = new Date().getDate()

function checkEmptyInput (inputValue) {
  return inputValue.trim() === '' ? false : true
  /* trim() method just accepts string type values */
}

function displayWarningColor () {
  inputFields.forEach(i => {
    labels.forEach(l => {
      l.style.color = primaryRed
      i.style.borderColor = primaryRed
    })
  })
}

function removeWarningColor () {
  inputFields.forEach(i => {
    labels.forEach(l => {
      l.style.color = lightGrey
      i.style.borderColor = lightGrey
    })
  })
}

function checkYearValidation () {
  const yearErrorMsg = document.querySelector('[data-year-errMsg]')
  let birthYear = yearInput.value
  yearErrorMsg.textContent = ''
  if (!checkEmptyInput(birthYear)) {
    yearErrorMsg.textContent = 'This field is required'
    displayWarningColor()
  } else if (birthYear > currentYear) {
    yearErrorMsg.textContent = 'Must be in the past'
    displayWarningColor()
  } else {
    return true
  }
}

function adjustLeapYear (year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 29
  } else {
    return 28
  }
}

function checkMonthValidation () {
  const monthErrorMsg = document.querySelector('[data-month-errMsg]')
  let birthMonth = monthInput.value
  monthErrorMsg.textContent = ''
  if (!checkEmptyInput(birthMonth)) {
    monthErrorMsg.textContent = 'This field is required'
    displayWarningColor()
  } else if (Number(birthMonth) < 1 || Number(birthMonth) > 12) {
    monthErrorMsg.textContent = 'Must be a valid month'
    displayWarningColor()
  } else {
    return true
  }
}

function getDaysInMonth (month) {
  let monthNumber = Number(month)
  if (!checkMonthValidation()) {
    return false /* 'Must be a valid month' */
  } else {
    let days = 31
    if (monthNumber === 2) {
      days = adjustLeapYear(Number(yearInput))
    } else if (
      monthNumber === 4 ||
      monthNumber === 6 ||
      monthNumber === 9 ||
      monthNumber === 11
    ) {
      days = 30
    }
    return days
  }
}

function checkDateValidation () {
  const dateErrorMsg = document.querySelector('[data-date-errMsg]')
  let birthDate = dateInput.value
  let birthMonth = monthInput.value
  let days = getDaysInMonth(birthMonth)
  dateErrorMsg.textContent = ''
  if (!checkEmptyInput(birthDate)) {
    dateErrorMsg.textContent = 'This field is required'
    displayWarningColor()
  } else if (Number(birthDate) < 1 || Number(birthDate) > 31) {
    dateErrorMsg.textContent = 'Must be a valid day'
    displayWarningColor()
  } else if (Number(birthDate) > days) {
    dateErrorMsg.textContent = 'Must be a valid date'
    displayWarningColor()
  } else {
    return true
  }
}

function checkBirthDateValidation (year, month, day) {
  if (!year || !month || !day) return
  else {
    removeWarningColor()
    return true
  }
}

function calculateAge () {
  const yearsOldTextElement = document.querySelector('[data-years-old]')
  const monthsOldTextElement = document.querySelector('[data-months-old]')
  const daysOldTextElement = document.querySelector('[data-days-old]')
  yearsOldTextElement.textContent = '--'
  monthsOldTextElement.textContent = '--'
  daysOldTextElement.textContent = '--'

  let birthDate = dateInput.value
  let birthMonth = monthInput.value
  let birthYear = yearInput.value

  let yearsOld
  let monthsOld
  let daysOld

  if (
    !checkBirthDateValidation(
      checkYearValidation(),
      checkMonthValidation(),
      checkDateValidation()
    )
  )
    return
  else {
    if (birthDate == currentDate && birthMonth == currentMonth) {
      daysOld = 0
      monthsOld = 0
      yearsOld = currentYear - birthYear
    }
    if (birthDate > currentDate) {
      monthsOld = monthsOld - 1
      let lastMonthDays = getDaysInMonth(currentMonth - 1)
      /* TO AVOID NEGATIVE RESULTS */
      if (lastMonthDays == 28 && birthDate == 31 && currentDate == 1) {
        daysOld = 0
      } else daysOld = lastMonthDays - birthDate + currentDate + 1
      /* THE +1 ABOVE IS TO COUNT THE CURRENT DAY ALSO */
    } else {
      daysOld = currentDate - birthDate
    }
    if (birthMonth > currentMonth) {
      yearsOld = currentYear - birthYear - 1
      monthsOld = 12 - birthMonth + currentMonth - 1
    } else if (birthMonth == currentMonth) {
      if (birthDate > currentDate) {
        monthsOld = 11
        yearsOld = currentYear - birthYear - 1
      } else if (birthDate < currentDate) {
        monthsOld = 0
        yearsOld = currentYear - birthYear
      }
    } else {
      yearsOld = currentYear - birthYear
      monthsOld = currentMonth - birthMonth - 1
    }

    yearsOldTextElement.textContent = yearsOld
    monthsOldTextElement.textContent = monthsOld
    daysOldTextElement.textContent = daysOld
  }
}

submitBtn.addEventListener('click', () => {
  calculateAge()
})
