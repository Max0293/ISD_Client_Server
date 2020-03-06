const sessionId = (new Date()).toISOString();

	document.addEventListener('DOMContentLoaded', () => {
		let name = localStorage.getItem('Name');
		fetch ('/drow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Name: name})
        }).then(response => response.json()).then(response => {
		    if (response){
				let count = 0;
		  		for (let x of response) {
			    	for (let y of x) {
				   		if (y === false) {
							  document.getElementById(`${count}`).style.backgroundColor = 'green';
							  count++;
			        	} else if (y === -1) {
							document.getElementById(`${count}`).style.backgroundColor = 'red';
							count++;
						} else {count++;};
			    	};
				};
			};
        });
	});

 	document.getElementById("submit").addEventListener("click", function (e){
		let idElement;
		let Y = document.getElementById("Y").value;
		let X = document.getElementById("X").value;		
		let userName = localStorage.getItem('Name');
		let data = JSON.stringify({Y: Y, X: X, sessionId: sessionId, userName: userName});
		let request = new XMLHttpRequest();
		request.open("POST", "/submit", true);
		request.setRequestHeader("Content-Type", "application/json");
		request.send(data);
		request.addEventListener("load", function(){
			let receivedResponse = JSON.parse(request.response);
			if (receivedResponse.length > 1) {
				alert(receivedResponse);
			}
			Y = parseInt(Y);	
			X = parseInt(X);			
			if(Y === 0){
				idElement = X;
			} else {
				idElement = X + Y*10;
			}
			if(receivedResponse === -1){
			document.getElementById(idElement).style.backgroundColor = "red";
			
			} else if (receivedResponse === 0 || receivedResponse === 1){
				document.getElementById(idElement).style.backgroundColor = "green";
			}
		});
		e.preventDefault();
	});

	document.getElementById("delete").addEventListener("click", function (e){
		let request = new XMLHttpRequest();
		request.open("DELETE", "/delete", true);
		request.send();
		document.getElementById("Results").innerHTML = '';
		e.preventDefault();
	});

	document.getElementById("view").addEventListener("click", function (e){
			fetch('/shots', {method: 'GET'}).then(response => response.json())
			.then(shots => {
			let shootCoordinate = '';
			for(let i in shots){
				shootCoordinate += `Coordinate Y: ${shots[i].y}, 
				Coordinate X: ${shots[i].x}  <br>`;
			};
			document.getElementById("Results").innerHTML = shootCoordinate;
		});
		e.preventDefault();
	});

	document.getElementById('toHome').addEventListener('click', function(e){
		location = '/';
		e.preventDefault();
	})