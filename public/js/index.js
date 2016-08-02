
let updatefood = document.getElementById('submitEditButton')
let inputfood = document.getElementById('foodText')
let test = document.getElementById('test')
let testValue = test.value

console.log(testValue)

updatefood.addEventListener('click', function() {
    fetch('editFood', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'content': inputfood,
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload()
    })
})



test.addEventListener('click', function() {
  console.log(testValue)
})

/*var remove = document.getElementById('delete');

remove.addEventListener('click', function () {
  fetch('friends', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'joey'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})*/
