"use strict";

$(function () {
  var countryData = [];
  var selectedCountries = [];
  var currentCountry = "";
  var currentCapital = "";
  var currentPopulation = "";
  var currentArea = "";
  var currentSubRegion = "";
  var currentCurrency = "";
  var currentBorder = "";
  var currentCountryPower = 0;
  var isCountry = "";
  var answerToQuestion = "";
  var numberOfQuestionOptions = 0; //Number of options to select for each question.
  gv.players.player1.powerDiv = $('#hud .playerPower');
  gv.players.player2.powerDiv = $('#hud2 .playerPower');
  var $answerGiven = $('.answerGiven');
  var $turnDisplay = $('.turnDisplay');
  gv.players.player1.turnDisplayDiv = $('#hud .playerPower');
  gv.players.player2.turnDisplayDiv = $('#hud2 .playerPower');
  var $gameOverScreen = $('#gameOverDiv');
  gv.players.player1.power = 0;
  gv.players.player2.power = 0;
  gv.players.player1.turnCounter = 3;
  gv.players.player2.turnCounter = 3;

  // functions to check if the turns have ended and to display gameOver screen when out of turns

  function conquerCountry(marker) {
    google.maps.event.clearListeners(gv.turnInfo.currentIcon);
    console.log('NO CLECK NO CRY');
  }

  function makeResetWork() {
    $('#restart').click(function () {
      console.log("CLEKCK!");
    });
  }

  function endGame() {
    console.log("GAME OVER!!");
    $gameOverScreen.html("\n      <h2>Game Over</h2>\n      <p id=\"playerOneFinalScore\">Player One has " + gv.players.player1.power + "</p>\n      <p id=\"playeTwoFinalScore\">Player Two has " + gv.players.player2.power + "</p>\n      <button id=\"restart\">Restart</button>\n    ");
    makeResetWork();
  }

  function gameOverChecker() {
    if (gv.players.player2.turnCounter <= 0) {
      console.log("GAME OVER MAN");
      endGame();
    }
  }

  function processTurn() {
    gv.players["player" + gv.turnInfo.turn].turnDisplayDiv.parent().parent().parent().css('opacity', '0.7');
    gv.players["player" + gv.turnInfo.turn].turnCounter--;
    gv.players["player" + gv.turnInfo.turn].turnDisplayDiv.html('Turns left: ' + gv.players["player" + gv.turnInfo.turn].turnCounter);
    gv.turnInfo.turn = gv.turnInfo.turn === 1 ? gv.turnInfo.turn + 1 : gv.turnInfo.turn - 1;

    console.log(gv.turnInfo.turn);
    gv.players["player" + gv.turnInfo.turn].turnDisplayDiv.parent().parent().parent().css('opacity', '1');
    closeWindow();
  }

  getArray(function () {
    $('#map').on('click', '.conquer', function () {
      var countryCode = $(this).data('country');
      $('#quizPopup').show();
      infoWindow.close();
      quizQuestion(countryCode);
    });
  });

  $('#quizPopup').on("click", '.stopBtn', processTurn);

  function closeWindow() {
    $('#quizPopup').hide();
    gameOverChecker();
  }

  function getArray(callback) {
    console.log("getArray started");
    // create array of objects of all countries with properties name, capital, alpha2Code and latLng.
    $.get("https://restcountries.eu/rest/v1/all").done(function (data) {
      // console.log(`Data: ${data}`); // Got an array
      // Creating power counters for players and display for number of turns left
      // must be moved inside game start function once that is made
      //
      countryData = data.map(function (country) {
        return {
          name: country.name,
          capital: country.capital,
          id: country.alpha2Code,
          population: country.population,
          region: country.region,
          subRegion: country.subregion,
          area: country.area,
          borders: country.borders,
          currencies: country.currencies,
          location: {
            lat: country.latlng[0],
            lng: country.latlng[1]
          }
        };
      });

      // data has come back from the server...
      return callback();
    });
  }
  //Select current coountry with alpha2Code and a holders currentCountry & currentCapital.
  function findCountryByAlpha2Code(alpha2Code) {
    var index = countryData.findIndex(function (country) {
      return country.id === alpha2Code;
    });
    currentCountry = countryData[index].name;
    currentCapital = countryData[index].capital;
    currentPopulation = countryData[index].population;
    currentArea = countryData[index].area;
    currentSubRegion = countryData[index].subRegion;
    currentCurrency = countryData[index].currency;
    currentBorder = countryData[index].border;

    currentCountryPower = $('html').find('.cPower').html();
    // console.log('find: ' + currentCountryPower[0], currentCountryPower);
    currentCountryPower = parseFloat(currentCountryPower);
    return countryData[index];
  }

  //Change order of all countries in array.
  function findRandomCountry() {
    var randomIndex = Math.floor(Math.random() * countryData.length);
    return countryData[randomIndex];
  }

  numberOfQuestionOptions = 3;

  //Select first four countries from randam array and check for duplicate selectioins.
  function selectCountries(alpha2Code) {
    selectedCountries = [];
    selectedCountries.push(findCountryByAlpha2Code(alpha2Code));
    for (var i = 0; i < 3; i++) {
      var country = findRandomCountry();
      console.log(country);
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

  function quizQuestion(countryCode) {
    selectedCountries = shuffle(selectCountries(countryCode));

    //First Question
    ask1stQuestion(selectedCountries[0].capital, selectedCountries[1].capital, selectedCountries[2].capital, selectedCountries[3].capital);

    function ask1stQuestion(option1, option2, option3, option4) {

      $("#quizPopup").html("\n        <p>What is the capital of " + countries[countryCode].name + "? </p>\n        </div>\n        <div class=\"qHolder\">\n          <label>" + option1 + "</label>\n          <input type=\"radio\" name=\"answer\" value=\"" + option1 + "\">\n        </div>\n        <div class=\"qHolder\">\n          <label>" + option2 + "</label>\n          <input type=\"radio\" name=\"answer\" value=\"" + option2 + "\">\n        </div>\n        <div class=\"qHolder\">\n          <label>" + option3 + "</label>\n          <input type=\"radio\" name=\"answer\" value=\"" + option3 + "\">\n        </div>\n        <div class=\"qHolder\">\n          <label>" + option4 + "</label>\n          <input type=\"radio\" name=\"answer\" value=\"" + option4 + "\">\n        </div>\n        <button class=\"stopBtn\">Stop Questions</button>\n\n        ");

      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(function () {
        if ($(this).val() == currentCapital) {
          answerToQuestion = true;
          $answerGiven.html('Yeh You Gave the Right Answer');
          // $main.html(`Oh Yes.`);
          // Should update players amount of power upon answering question correctly
          gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
          gv.players['player' + gv.turnInfo.turn].powerDiv.html('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
          changeIcon(gv.turnInfo.currentIcon);
          //function to check if game has ended(out of turns)
          gameOverChecker();
        } else {
          answerToQuestion = false;
          $answerGiven.html('Oh No You Gave the Wrong Answer');
          // $main.html(`Oh No.`);
          // should update number of turns left after question is answered
          processTurn(gv.turnInfo.turn);
          //function to check if game has ended(out of turns)
          gameOverChecker();
        }
        if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
          $('#quizPopup').hide();
        } else {
          conquerCountry();
          ask2ndQuestion(selectedCountries[0].population, selectedCountries[1].population, selectedCountries[2].population, selectedCountries[3].population);
        }
      });
    }

    //Second Question
    function ask2ndQuestion(option1, option2, option3, option4) {
      $("#quizPopup").html("\n        <p>What is the population of " + countries[countryCode].name + "? </p>\n        </div>\n        <div class=\"qHolder\"><label>" + option1 + "</label>\n        <input type=\"radio\" name=\"answer\" value=\"" + option1 + "\">\n        </div>\n        <div class=\"qHolder\"><label>" + option2 + "</label>\n        <input type=\"radio\" name=\"answer\" value=\"" + option2 + "\">\n        </div>\n        <div class=\"qHolder\"><label>" + option3 + "</label>\n        <input type=\"radio\" name=\"answer\" value=\"" + option3 + "\">\n        </div>\n        <div class=\"qHolder\"><label>" + option4 + "</label>\n        <input type=\"radio\" name=\"answer\" value=\"" + option4 + "\">\n        </div>\n        <button class=\"stopBtn\">Stop Questions</button>\n      ");

      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(function () {
        if ($(this).val() == currentPopulation) {
          answerToQuestion = true;
          $answerGiven.html('Yeh You Gave the Right Answer');

          // Should update players amount of power upon answering question correctly
          gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
          gv.players['player' + gv.turnInfo.turn].powerDiv.html('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
        } else {
          answerToQuestion = false;
          $answerGiven.html('Oh No You Gave the Wrong Answer');
          // should update number of turns left after question is answered
          processTurn();
          //function to check if game has ended(out of turns)
          gameOverChecker();
        }
        if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
          $('#quizPopup').hide();
        } else {
          ask3rdQuestion(selectedCountries[0].area, selectedCountries[1].area, selectedCountries[2].area, selectedCountries[3].area);
        }
      });
    }
    //Third Question
    function ask3rdQuestion(option1, option2, option3, option4) {
      $("#quizPopup").html("\n          <p>What is the area of " + countries[countryCode].name + "? </p>\n\n          <div class=\"qHolder\">\n            <label>" + option1 + "</label>\n            <input type=\"radio\" name=\"answer\" value=\"" + option1 + "\">\n          </div>\n          <div class=\"qHolder\">\n            <label>" + option2 + "</label>\n            <input type=\"radio\" name=\"answer\" value=\"" + option2 + "\">\n          </div>\n          <div class=\"qHolder\">\n            <label>" + option3 + "</label>\n            <input type=\"radio\" name=\"answer\" value=\"" + option3 + "\">\n          </div>\n          <div class=\"qHolder\">\n            <label>" + option4 + "</label>\n            <input type=\"radio\" name=\"answer\" value=\"" + option4 + "\">\n          </div>\n          <button class=\"stopBtn\">Stop Questions</button>\n          ");

      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(function () {
        if ($(this).val() == currentArea) {
          answerToQuestion = true;
          $answerGiven.html('Yeh You Gave the Right Answer');
          console.log("Answer: " + answerToQuestion);
          console.log('correct selected: ' + currentArea);

          // Should update players amount of power upon answering question correctly
          gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
          gv.players['player' + gv.turnInfo.turn].powerDiv.html('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
          // should update number of turns left after question is answered
          // gv.players.player1.turnCounter--;
        } else {
          answerToQuestion = false;
          $answerGiven.html('Oh No You Gave the Wrong Answer');
          console.log("Answer: " + answerToQuestion);
          console.log('correct not selected: ' + currentArea);
          // should update number of turns left after question is answered
          //function to check if game has ended(out of turns)
          processTurn();
          gameOverChecker();
        }
        if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
          $('#quizPopup').hide();
        } else {
          ask4thQuestion(selectedCountries[0].subRegion, selectedCountries[1].subRegion, selectedCountries[2].subRegion, selectedCountries[3].subRegion);
        }
      });
    }
    //Forth Question
    function ask4thQuestion(option1, option2, option3, option4) {
      $("#quizPopup").html("\n            <p>In what subregion is " + countries[countryCode].name + " located? </p>\n\n            <div class=\"qHolder\">\n              <label>" + option1 + "</label>\n              <input type=\"radio\" name=\"answer\" value=\"" + option1 + "\">\n            </div>\n            <div class=\"qHolder\">\n              <label>" + option2 + "</label>\n              <input type=\"radio\" name=\"answer\" value=\"" + option2 + "\">\n            </div>\n            <div class=\"qHolder\">\n              <label>" + option3 + "</label>\n              <input type=\"radio\" name=\"answer\" value=\"" + option3 + "\">\n            </div>\n            <div class=\"qHolder\">\n              <label>" + option4 + "</label>\n              <input type=\"radio\" name=\"answer\" value=\"" + option4 + "\">\n            </div>\n            <button class=\"stopBtn\">Stop Questions</button>\n            ");

      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(function () {
        if ($(this).val() == currentSubRegion) {
          answerToQuestion = true;
          $answerGiven.html('Yeh You Gave the Right Answer');
          console.log("Answer: " + answerToQuestion);
          console.log('correct selected: ' + currentSubRegion);

          // Should update players amount of power upon answering question correctly
          gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
          gv.players['player' + gv.turnInfo.turn].powerDiv.html('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
          // should update number of turns left after question is answered
        } else {
          answerToQuestion = false;
          $answerGiven.html('Oh No You Gave the Wrong Answer');
          console.log("Answer: " + answerToQuestion);
          // console.log('correct not selected: ' + currentRegion);
          // should update number of turns left after question is answered
          // processTurn();
          //function to check if game has ended(out of turns)
          processTurn();
          gameOverChecker();
        }
        if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
          $('#quizPopup').hide();
        } else {

          selectedCountries = shuffle(selectCountries(countryCode));
          ask5thQuestion(selectedCountries[0].currencies, selectedCountries[1].currencies, selectedCountries[2].currencies, selectedCountries[3].currencies);
        }
      });
    }
    //Fifth Question
    var ask5thQuestion = function ask5thQuestion(option1, option2, option3, option4) {
      $("#quizPopup").html("\n              <p>Which currency is used in " + countries[countryCode].name + "? </p>\n\n              <div class=\"qHolder\">\n                <label>" + option1 + "</label>\n                <input type=\"radio\" name=\"answer\" value=\"" + option1 + "\">\n              </div>\n              <div class=\"qHolder\">\n                <label>" + option2 + "</label>\n                <input type=\"radio\" name=\"answer\" value=\"" + option2 + "\">\n              </div>\n              <div class=\"qHolder\">\n                <label>" + option3 + "</label>\n                <input type=\"radio\" name=\"answer\" value=\"" + option3 + "\">\n              </div>\n              <div class=\"qHolder\">\n                <label>" + option4 + "</label>\n                <input type=\"radio\" name=\"answer\" value=\"" + option4 + "\">\n              </div>\n              <button class=\"stopBtn\">Stop Questions</button>\n              ");

      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(function () {
        if ($(this).val() == currentCurrency) {
          answerToQuestion = true;
          $answerGiven.html('Yeh You Gave the Right Answer');

          // Should update players amount of power upon answering question correctly
          gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
          gv.players['player' + gv.turnInfo.turn].powerDiv.html('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
          // should update number of turns left after question is answered
        } else {
          answerToQuestion = false;
          $answerGiven.html('Oh No You Gave the Wrong Answer');
          processTurn();
          gameOverChecker();
          // should update number of turns left after question is answered
        }
        if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
          $('#quizPopup').hide();
        } else {

          selectedCountries = shuffle(selectCountries(countryCode));
          ask6thQuestion(selectedCountries[0].borders, selectedCountries[1].borders, selectedCountries[2].borders, selectedCountries[3].borders);
        }
      });
    };

    //Sixth Question
    var ask6thQuestion = function ask6thQuestion(option1, option2, option3, option4) {
      $("#quizPopup").html("\n                <p>Which country borders " + countries[countryCode].name + "? </p>\n\n                <div class=\"qHolder\">\n                  <label>" + option1 + "</label>\n                  <input type=\"radio\" name=\"answer\" value=\"" + option1 + "\">\n                </div>\n                <div class=\"qHolder\">\n                  <label>" + option2 + "</label>\n                  <input type=\"radio\" name=\"answer\" value=\"" + option2 + "\">\n                </div>\n                <div class=\"qHolder\">\n                  <label>" + option3 + "</label>\n                  <input type=\"radio\" name=\"answer\" value=\"" + option3 + "\">\n                </div>\n                <div class=\"qHolder\">\n                  <label>" + option4 + "</label>\n                  <input type=\"radio\" name=\"answer\" value=\"" + option4 + "\">\n                </div>\n\n                <button class=\"stopBtn\">Stop Questions</button>\n                ");

      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(function () {
        if ($(this).val() == currentCurrency) {
          answerToQuestion = true;
          $answerGiven.html('Yeh You Gave the Right Answer');
          console.log("Answer: " + answerToQuestion);
          console.log('correct selected: ' + currentCurrency);

          // Should update players amount of power upon answering question correctly
          gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
          gv.players['player' + gv.turnInfo.turn].powerDiv.html('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
        } else {
          answerToQuestion = false;
          $answerGiven.html('Oh No You Gave the Wrong Answer');
          console.log("Answer: " + answerToQuestion);
          console.log('correct not selected: ' + currentCurrency);
        }
        // if ($turnCounter === 0) {
        $('#quizPopup').hide();
        // } else {
        // ask7thQuestion(selectedCountries[0].borders[0], selectedCountries[1].borders[0], selectedCountries[2].borders[0], selectedCountries[3].borders[0]);
        // }
        processTurn();
      });
    };
  }
});