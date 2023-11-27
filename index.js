const errorMsg = document.querySelector('.err-msg')
const label = document.querySelectorAll('label')
const inputField = document.querySelectorAll('input[type="number"]')
const submitBtn = document.querySelector('.submit-btn')

const rootStyles = getComputedStyle(document.documentElement)
const primaryRed = rootStyles.getPropertyValue('--clr-primary-red')

function checkYearValidation (birthYear) {
  const currentYear = new Date().getFullYear()
  return birthYear <= currentYear ? true : 'Must be in the past'
}

function checkMonthValidation (birthMonth) {
  return birthMonth < 13 && birthMonth > 0 ? true : false
}

function checkMonth (birthMonth) {
  if (!checkMonthValidation(birthMonth)) {
    return 'Must be a valid month'
  } else {
    let days = 31
    if (birthMonth === 2) {
      days = 28
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

console.log(checkMonth(1))

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
