const sort = document.querySelector('#sort')
const searchForm = document.querySelector('#search-form')
const dataPanel = document.querySelector('#data-panel')
const modalBody = document.querySelector('#modal-body')
const confirm = document.querySelector('#confirm')

sort.addEventListener('change', event => {
  if (event.target.matches('select')) {
    searchForm.submit()
  }
})

dataPanel.addEventListener('click', event => {
  if (event.target.matches('.delete-btn')) {
    modalBody.textContent = `確定要刪除『${event.target.dataset.name}』嗎？`
    confirm.action = `/restaurants/${event.target.dataset.id}?_method=delete`
  }
})
