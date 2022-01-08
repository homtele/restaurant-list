const registerForm = document.querySelector('#register-form')
const email = registerForm.querySelector('#email')

registerForm.addEventListener('submit', event => {
  if (!registerForm.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
  if (email.validity.typeMismatch) {
    email.nextElementSibling.textContent = '請輸入 EMAIL。'
  }
  registerForm.classList.add('was-validated')
})
