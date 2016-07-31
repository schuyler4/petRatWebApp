var update = document.getElementById('submitEditButton');

update.addEventListener('click', function() {
    console.log('panda')
    fetch('editFood', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'content': 'i hope this worksssssssssssssssssssssssss',
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload()
    })
});

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
