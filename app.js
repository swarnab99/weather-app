document.addEventListener('DOMContentLoaded', () => {
	// DOM fully loaded

	const form = document.querySelector('#form');
	const input = form.querySelector('.input');
	const iconData = document.querySelector('#iconData');
	const cloudData = document.querySelector('#clouds');
	const tempData = document.querySelector('#tempData');
	const placeData = document.querySelector('#placeData');
	const loader = document.querySelector('.loader');

	form.addEventListener('submit', e => {
		e.preventDefault(); // Prevent page reload

		loader.style.display = 'block'; // show loader
		form.style.display = 'none'; // hide form

		var city = input.value;
		input.value = ''; // After entering city name input will be empty

		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${'416c7d77d4cffdfe15de2535d2fc07d2'}`
		)
			.then(response => response.json())
			.then(response => {
				// success
				console.log(response);

				loader.style.display = 'none'; // hide loader
				form.style.display = 'block'; // show form
				input.focus(); // focus on input box

				tempData.innerText = Math.round(response.main.temp); // Update Temparature Data
				placeData.innerText = `${response.name}, ${response.sys.country}`; // Update City and country
				cloudData.innerText = response.weather[0].description; // Update Cloud Data
				iconData.src = `icon/${response.weather[0].id}.png`; // Update the Icon with weather.id value
			})
			.catch(function(error) {
				// error
				console.log(error);
				alert(`"${city}" Weather Data Not Found.`);
			});
	}); // form add Event listener
}); // document ready function
