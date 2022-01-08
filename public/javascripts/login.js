const loginForm = document.querySelector('#login-form')
const email = loginForm.querySelector('#email')

loginForm.addEventListener('submit', event => {
  if (!loginForm.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
  if (email.validity.typeMismatch) {
    email.nextElementSibling.textContent = '請輸入 EMAIL。'
  }
  loginForm.classList.add('was-validated')
})
