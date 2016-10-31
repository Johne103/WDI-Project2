'use strict';

$(function () {
  var countryData = [];
  var selectedCountries = [];

  $.get("https://restcountries.eu/rest/v1/all").done(function (data) {
    countryData = data.map(function (country) {
      return {
        name: country.name,
        capital: country.capital,
        id: country.alpha2Code,
        location: {
          lat: country.latlng[0],
          lng: country.latlng[1]
        }
      };
    });
  });

  function findCountryByAlpha2Code(alpha2Code) {
    var index = countryData.findIndex(function (country) {
      return country.id === alpha2Code;
    });

    return countryData[index];
  }

  function findRandomCountry() {
    var randomIndex = Math.floor(Math.random() * countryData.length);
    return countryData[randomIndex];
  }

  function selectCountries(alpha2Code) {
    selectedCountries.push(findCountryByAlpha2Code(alpha2Code));
    for (var i = 0; i < 3; i++) {
      var country = findRandomCountry();
      while (selectedCountries.indexOf(country) !== -1) {
        country = findRandomCountry();
      }
      selectedCountries.push(country);
    }
    return selectedCountries;
  }

  function shuffle(array) {
    var m = array.length,
        t,
        i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  $('#quizBtn').on('click', quizQuestion);

  function quizQuestion() {
    selectCountries("GB");
    selectedCountries = shuffle(selectedCountries);
    $("#quiz").html('\n      <p>This is the first capital</p>\n      <label>' + selectedCountries[0].capital + '</label>\n      <input type="radio" name="answer" value="' + selectedCountries[0].capital + '">\n      <label>' + selectedCountries[1].capital + '</label>\n      <input type="radio" name="answer" value="' + selectedCountries[1].capital + '">\n      <label>' + selectedCountries[2].capital + '</label>\n      <input type="radio" name="answer" value="' + selectedCountries[2].capital + '">\n      <label>' + selectedCountries[3].capital + '</label>\n      <input type="radio" name="answer" value="' + selectedCountries[3].capital + '">\n\n      ');
  }
});

// const getQuestions = () => {
//   $.ajax({
//     method: 'GET',
//     url: "http://localhost:8000/cars"
//   })
//   .done((data) => {
//     console.log(data);
//     $.each(data, (index, car) => {
//       addCar(car);
//     });
//   });
// };