var updateFood = document.getElementById('submitEditButton')

updateFood.addEventListener('click', function () {
  fetch('infoPost', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'content': 'this is the food and diet page for pet rats if you want to add' +
    'you knolege of edit something feel free to with the edit button below'
    })
  })
})
