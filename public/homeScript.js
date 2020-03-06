document.getElementById('okBtn').addEventListener('click', function(e){
    let doc = document.getElementById('userName');
    let name = doc.value;
    if (doc.validity.valid) {
        doc.style.border = '1px solid black'
    fetch('/authorize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Name: name})
        })
        .then(response => response.json())
        .then(answer => {
            if (answer === true) {
                document.getElementById('newGame').removeAttribute('disabled');
                document.getElementById('continueGame').removeAttribute('disabled');
            } else {
                document.getElementById('newGame').removeAttribute('disabled');
            }
        })            
    e.preventDefault();
    } else {doc.style.border = 'solid 2px red'}
});

document.getElementById('newGame').addEventListener('click', function(e){
    let name = document.getElementById('userName').value;
    localStorage.setItem('Name', `${name}`);
    fetch('/newGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Name: name})
    }).then(response => response.json()).then(response => {            
        location = response;
    });
    e.preventDefault();
});

document.getElementById('continueGame').addEventListener('click', function (e) {
    let name = document.getElementById('userName').value;
    localStorage.setItem('Name', `${name}`);
    fetch ('/continueGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Name: name})
    }).then(response => response.json()).then(response => {
        location = response;
    });
    e.preventDefault();
});