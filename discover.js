// document.getElementById("mapSubmit").addEventListener("click", function(event) {
//     event.preventDefault();
//     //turn value into lat long
//     const foodUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.2338%2C111.6585&radius=5000&key=AIzaSyDlgl-q7AUCr6ETqUBu0Q80i0dBmZDe-GA"
//     fetch(foodUrl)
//         .then(function(response) {
//             return response.json();
//         }).then(function(json) {
//             console.log(json);
//         });
// });

document.getElementById("mapSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("mapInput").value;
    if (value === "")
        return;
    console.log(value);
    //turn value into lat long
    const geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + value + "&key=AIzaSyDlgl-q7AUCr6ETqUBu0Q80i0dBmZDe-GA";
    var temp = "";
    fetch(geoUrl)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            return json.results[0].geometry.location.lat + "%2C" + json.results[0].geometry.location.lng;
            console.log(temp)
        }).then(function(temp) {
            const foodUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=food&location=" + temp + "&radius=50000&key=AIzaSyDlgl-q7AUCr6ETqUBu0Q80i0dBmZDe-GA";
            fetch(foodUrl)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    console.log(json);
                    document.getElementById("foodHeader").innerHTML = "<h3>Popular Nearby Restaraunts:</h3>"
                    let results = '';
                    for (let i = 0; i < json.results.length; i++) {
                        results += '<h4 class="locations">' + json.results[i].name + '</h4>';
                        results += '<p class="info">' + json.results[i].vicinity;
                        results += ' // Customer Rating: ' + json.results[i].rating + '</p>';
                    }
                    console.log(results);
                    document.getElementById("mapResults").innerHTML = results;
                })
        });
});






//***********
//   const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=food&location=" + temp + "&radius1500&key=AIzaSyDlgl-q7AUCr6ETqUBu0Q80i0dBmZDe-GA";
//   fetch(url)
//     .then(function(response) {
//       return response.json();
//     }).then(function(json) {
//       let results = "";
//       console.log(json);
//       results += '<h2>map in ' + json.name + "</h2>";
//       for (let i=0; i < json.map.length; i++) {
// 	      results += '<img src="http://openmapmap.org/img/w/' + json.map[i].icon + '.png"/>';
//       }
//       results += '<h2>' + json.main.temp + " &deg;F</h2>"
//       results += '<h3>(Feels Like: ' + json.main.feels_like + ' &deg;F)</h3>';
//       results += "<p>"
//       for (let i=0; i < json.map.length; i++) {
// 	      results += json.map[i].description
// 	      if (i !== json.map.length - 1)
// 	        results += ", "
//       }
//       results += ', wind speed: ' + json.wind.speed + 'm/sec , humidity: ' + json.main.humidity + '%'
//       results += "</p>";
//       document.getElementById("mapResults").innerHTML = results;
//     });
// });
