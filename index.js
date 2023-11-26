const errorMsg = document.querySelector('.err-msg')
const label = document.querySelectorAll('label')
const inputField = document.querySelectorAll('input[type="number"]')
const submitBtn = document.querySelector('.submit-btn')

const rootStyles = getComputedStyle(document.documentElement)
const primaryRed = rootStyles.getPropertyValue('--clr-primary-red')

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
