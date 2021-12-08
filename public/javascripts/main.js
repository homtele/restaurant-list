document.querySelector('#sort').addEventListener('change', event => {
  if (event.target.matches('select')) {
    event.target.parentElement.parentElement.submit()
  }
})

document.querySelector('#data-panel').addEventListener('click', event => {
  if (event.target.matches('.delete-btn')) {
    document.querySelector('#modal-body').textContent = `確定要刪除『${event.target.dataset.name}』嗎？`
    document.querySelector('#confirm').action = `/restaurants/${event.target.dataset.id}?_method=delete`
  }
})
