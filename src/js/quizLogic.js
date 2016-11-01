$(() => {
  let countryData = [];
  let selectedCountries = [];
  let currentCountry = "";
  let currentCapital = "";
  let currentCountryPower = 0;
  let isCountry = "";
  let answerToQuestion = "";
  let numberOfQuestionOptions = 0; //Number of options to select for each question.

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
        population: country.population,
        region: country.region,
        subRegion: country.subregion,
        area: country.area,
        borders: country.borders,
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
    currentCountryPower = $('.countryPower').html();
    console.log(currentCountry);
    currentCountryPower = parseFloat(currentCountryPower);
    console.log(currentCountryPower);
    console.log(currentCapital);
    return countryData[index];
  }

  //Change order of all countries in array.
  function findRandomCountry() {
    let randomIndex = Math.floor(Math.random() * countryData.length);
    return countryData[randomIndex];
  }

  numberOfQuestionOptions = 3;

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
  // $('#quizBtn').on('click', quizQuestion);

  $('#map').on('click', '.conquer', function() {
    var countryCode = $(this).data('country');
    $('#quizPopup').show();
    quizQuestion(countryCode);
  });



  function quizQuestion(countryCode) {
    selectCountries(countryCode);
    selectedCountries = shuffle(selectedCountries);
    // console.log(selectedCountries);

    let isCountry = currentCountry;
    console.log(`isCountry: ${isCountry}`);
    console.log(`currentCountry: ${currentCountry}`);



    let askQuestion = function(option1, option2, option3, option4) {

      $("#quizPopup").html(`
        <p>What is the capital of ${countries[countryCode].name}? </p><label id="whichCountry"></label>
        <label>${option1}</label>
        <input type="radio" name="answer" value="${option1}">
        <label>${option2}</label>
        <input type="radio" name="answer" value="${option2}">
        <label>${option3}</label>
        <input type="radio" name="answer" value="${option3}">
        <label>${option4}</label>
        <input type="radio" name="answer" value="${option4}">

        `);

      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(
        function() {
          if ($(this).val() == currentCapital) {
            answerToQuestion = true;
            console.log(`Answer: ${answerToQuestion}`);
            console.log('correct selected: ' + currentCapital);

            // Should update players amount of power upon answering question correctly
            $p1PowerCounter += currentCountryPower;
            $playerOnePower.html ('Power: ' + $p1PowerCounter);
            // should update number of turns left after question is answered
            $turnCounter--;
            $turnDisplay.html ('Turns left: ' + $turnCounter);

        }
        else {
            answerToQuestion = false;
            console.log(`Answer: ${answerToQuestion}`);
            console.log('correct not selected: ' + currentCapital);
            // should update number of turns left after question is answered
            $turnCounter--;
            $turnDisplay.html ('Turns left: ' + $turnCounter);
        }
      });
    };
    //First Question
    askQuestion(selectedCountries[0].capital, selectedCountries[1].capital, selectedCountries[2].capital, selectedCountries[3].capital);

    //Second Question
    // askQuestion(selectedCountries[0].population, selectedCountries[1].population, selectedCountries[2].population, selectedCountries[3].population);

  }
});
