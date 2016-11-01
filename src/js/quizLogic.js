$(() => {
  let countryData = [];
  let selectedCountries = [];
  let currentCountry = "";
  let currentCapital = "";
  let isCountry = "";
  let answerToQuestion = "";

  let $playerOnePower = $('#playerOnePower');
  let $playerTwoPower = $('#playerTwoPower');
  let $turnDisplay = $('.turnDisplay');
  let $p1PowerCounter = 10;
  let $p2PowerCounter = 10;
  let $turnCounter = 2;

  // create array of objects of all countries with properties name, capital, alpha2Code and latLng.
  $.get("https://restcountries.eu/rest/v1/all")
  .done(function(data) {
    // Creating power counters for players and display for number of turns left
    // must be moved inside game start function once that is made
    $playerOnePower.html ('Power: ' + $p1PowerCounter);
    $playerTwoPower.html ('Power: ' + $p2PowerCounter);
    $turnDisplay.html ('Turns left: ' + $turnCounter);
    //
    countryData = data.map((country) => {
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
    let index = countryData.findIndex((country) => {
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
    let randomIndex = Math.floor(Math.random() * countryData.length);
    return countryData[randomIndex];
  }

  //Select first four countries from randam array and check for duplicate selectioins.
  function selectCountries(alpha2Code) {
    selectedCountries.push(findCountryByAlpha2Code(alpha2Code));
    for(let i = 0;i<3;i++) {
      let country = findRandomCountry();
      while(selectedCountries.indexOf(country) !== -1) {
        country = findRandomCountry();
      }
      selectedCountries.push(country);
    }
    return selectedCountries;
  }

  //Shuffle the list of four countries selected from random list.
  function shuffle(array) {
    var m = array.length, t, i;

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
  $('#quizBtn').on('click', quizQuestion);

  //Present selection of four options for answer to question.
  function quizQuestion() {
    selectCountries("GB");
    selectedCountries = shuffle(selectedCountries);
    // console.log(selectedCountries);

    let isCountry = currentCountry;
    console.log(isCountry);
    console.log(currentCountry);
    // document.getElementById('whichCountry').value = isCountry;

    $("#quiz").html(`
      <p>Select the capital of: </p><label id="whichCountry"></label>
      <label>${selectedCountries[0].capital}</label>
      <input type="radio" name="answer" value="${selectedCountries[0].capital}">
      <label>${selectedCountries[1].capital}</label>
      <input type="radio" name="answer" value="${selectedCountries[1].capital}">
      <label>${selectedCountries[2].capital}</label>
      <input type="radio" name="answer" value="${selectedCountries[2].capital}">
      <label>${selectedCountries[3].capital}</label>
      <input type="radio" name="answer" value="${selectedCountries[3].capital}">

      `);

      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(
        function() {
          if ($(this).val() == currentCapital) {
            answerToQuestion = true;
            console.log(answerToQuestion);
            console.log('correct selected: ' + currentCapital);
            // Should update players amount of power upon answering question correctly
            $p1PowerCounter++;
            $playerOnePower.html ('Power: ' + $p1PowerCounter);
            // should update number of turns left after question is answered
            $turnCounter--;
            $turnDisplay.html ('Turns left: ' + $turnCounter);
        }
        else {
            answerToQuestion = false;
            console.log(answerToQuestion);
            console.log('correct not selected: ' + currentCapital);
            // should update number of turns left after question is answered
            $turnCounter--;
            $turnDisplay.html ('Turns left: ' + $turnCounter);
        }
      });
  }

});
