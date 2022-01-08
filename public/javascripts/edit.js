const dataForm = document.querySelector('#data-form')
const rating = dataForm.querySelector('#rating')
const image = dataForm.querySelector('#image')
const googleMap = dataForm.querySelector('#google-map')

dataForm.addEventListener('submit', event => {
  if (!dataForm.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
  if (rating.validity.rangeOverflow || rating.validity.rangeUnderflow || rating.validity.ststepMismatch) {
    rating.nextElementSibling.textContent = '請輸入數字 0.0 - 5.0。'
  }
  if (image.validity.typeMismatch) {
    image.nextElementSibling.textContent = '請輸入 URL。'
  }
  if (googleMap.validity.typeMismatch) {
    googleMap.nextElementSibling.textContent = '請輸入 URL。'
  }
  dataForm.classList.add('was-validated')
})
