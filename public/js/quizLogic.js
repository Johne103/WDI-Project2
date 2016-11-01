"use strict";

$(function () {
  var countryData = [];
  var selectedCountries = [];
  var currentCountry = "";
  var currentCapital = "";
  var isCountry = "";
  var answerToQuestion = "";

  // create array of objects of all countries with properties name, capital, alpha2Code and latLng.
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

  //Select current coountry with alpha2Code and a holders currentCountry & currentCapital.
  function findCountryByAlpha2Code(alpha2Code) {
    var index = countryData.findIndex(function (country) {
      return country.id === alpha2Code;
    });
    currentCountry = countryData[index].name;
    currentCapital = countryData[index].capital;
    console.log(currentCountry);
    console.log(currentCapital);
    return countryData[index];
  }

  //Change order of all countries in array.
  function findRandomCountry() {
    var randomIndex = Math.floor(Math.random() * countryData.length);
    return countryData[randomIndex];
  }

  //Select first four countries from randam array and check for duplicate selectioins.
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

  //Shuffle the list of four countries selected from random list.
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

  //On marker click - trigger generation of question.
  // $('#quizBtn').on('click', quizQuestion);

  $('#map').on('click', '.conquer', function () {
    var countryCode = $(this).data('country');
    $('#quizPopup').show();
    quizQuestion(countryCode);
  });

  function quizQuestion(countryCode) {
    selectCountries(countryCode);
    selectedCountries = shuffle(selectedCountries);
    // console.log(selectedCountries);

    var isCountry = currentCountry;
    console.log(isCountry);
    console.log(currentCountry);
    // document.getElementById('whichCountry').value = isCountry;

    $("#quizPopup").html("\n      <p>Select the capital of: </p><label id=\"whichCountry\"></label>\n      <label>" + selectedCountries[0].capital + "</label>\n      <input type=\"radio\" name=\"answer\" value=\"" + selectedCountries[0].capital + "\">\n      <label>" + selectedCountries[1].capital + "</label>\n      <input type=\"radio\" name=\"answer\" value=\"" + selectedCountries[1].capital + "\">\n      <label>" + selectedCountries[2].capital + "</label>\n      <input type=\"radio\" name=\"answer\" value=\"" + selectedCountries[2].capital + "\">\n      <label>" + selectedCountries[3].capital + "</label>\n      <input type=\"radio\" name=\"answer\" value=\"" + selectedCountries[3].capital + "\">\n\n      ");

    //Check for correct answer and return true or false.
    $('input:radio[name="answer"]').change(function () {
      if ($(this).val() == currentCapital) {
        answerToQuestion = true;
        console.log(answerToQuestion);
        console.log('correct selected: ' + currentCapital);
      } else {
        answerToQuestion = false;
        console.log(answerToQuestion);
        console.log('correct not selected: ' + currentCapital);
      }
    });
  }
});