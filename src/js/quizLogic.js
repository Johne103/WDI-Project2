$(() => {
  let countryData = [];
  let selectedCountries = [];
  let currentCountry = "";
  let currentCapital = "";
  let currentPopulation = "";
  let currentArea = "";
  let currentRegion = "";
  let currentCurrency = "";
  let currentBorder = "";
  let currentCountryPower = 0;
  let isCountry = "";
  let answerToQuestion = "";
  let numberOfQuestionOptions = 0; //Number of options to select for each question.
  let $playerOnePower = $('#playerOnePower');
  let $playerTwoPower = $('#playerTwoPower');
  let $answerGiven = $('.answerGiven');
  let $turnDisplay = $('.turnDisplay');
  let $gameOverScreen = $('#gameOverDiv');
  // let $resetButton = $('#restart');
  gv.players.player1.power = 0;
  gv.players.player2.power = 0;
  let $turnCounter = 20;

  getArray(() => {
    $('#map').on('click', '.conquer', function() {
      let countryCode = $(this).data('country');
      $('#quizPopup').show();
      quizQuestion(countryCode);
      // findCountryByAlpha2Code(); //Takes an array and sets global varibles from that one country (2)
      // findRandomCountry();
      // selectCountries();
      // shuffle();
      // quizQuestion(countryCode);
    });
  });




  $('#quizPopup').on("click", '.stopBtn', closeWindow);

  function closeWindow () {
    $('#quizPopup').hide();
  }


  function init () {

  }

  function getArray(callback) {
    console.log("getArray started");
    // create array of objects of all countries with properties name, capital, alpha2Code and latLng.
    $.get("https://restcountries.eu/rest/v1/all")
    .done(function(data) {
      // console.log(`Data: ${data}`); // Got an array
      // Creating power counters for players and display for number of turns left
      // must be moved inside game start function once that is made
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
    let index = countryData.findIndex((country) => {
      return country.id === alpha2Code;
    });
    currentCountry = countryData[index].name;
    currentCapital = countryData[index].capital;
    currentPopulation = countryData[index].population;
    currentArea = countryData[index].area;
    currentRegion = countryData[index].region;
    currentCurrency = countryData[index].currency;
    currentBorder = countryData[index].border;

    currentCountryPower = $('.countryPower').html();
    currentCountryPower = parseFloat(currentCountryPower);
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
    selectedCountries = [];
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






  function quizQuestion(countryCode) {

    selectedCountries = shuffle(selectCountries(countryCode));

    function ask1stQuestion(option1, option2, option3, option4) {

      $("#quizPopup").html(`
        <p>What is the capital of ${countries[countryCode].name}? </p>
        <label>${option1}</label>
        <input type="radio" name="answer" value="${option1}">
        <label>${option2}</label>
        <input type="radio" name="answer" value="${option2}">
        <label>${option3}</label>
        <input type="radio" name="answer" value="${option3}">
        <label>${option4}</label>
        <input type="radio" name="answer" value="${option4}">
        <button class="stopBtn">Stop Questions</button>

        `);

      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(
        function() {
          if ($(this).val() == currentCapital) {
            answerToQuestion = true;
            $answerGiven.html ('Yeh You Gave the Right Answer');
            // $main.html(`Oh Yes.`);
            console.log(`Answer: ${answerToQuestion}`);
            console.log('correct selected: ' + currentCapital);

            // Should update players amount of power upon answering question correctly
            gv.players.player1.power += currentCountryPower;
            $playerOnePower.html ('Power: ' + gv.players.player1.power);
            // should update number of turns left after question is answered
            // $turnCounter--;
            $turnDisplay.html ('Turns left: ' + $turnCounter);
            console.log(gv.turnInfo.currentIcon);
            changeIcon(gv.turnInfo.currentIcon);
            //function to check if game has ended(out of turns)
            gameOverChecker();
          } else {
            answerToQuestion = false;
            $answerGiven.html ('Oh No You Gave the Wrong Answer');
            // $main.html(`Oh No.`);
            console.log(`Answer: ${answerToQuestion}`);
            console.log('correct not selected: ' + currentCapital);
            // should update number of turns left after question is answered
            $turnCounter--;
            $turnDisplay.html ('Turns left: ' + $turnCounter);
            //function to check if game has ended(out of turns)
            gameOverChecker();
            closeWindow();
          }
          if ($turnCounter === 0) {
            $('#quizPopup').hide();
          } else {
            conquerCountry();
            ask2ndQuestion(selectedCountries[0].population, selectedCountries[1].population, selectedCountries[2].population, selectedCountries[3].population);
          }
        });
    }
    //First Question
    ask1stQuestion(selectedCountries[0].capital, selectedCountries[1].capital, selectedCountries[2].capital, selectedCountries[3].capital);

    //Second Question
    function ask2ndQuestion(option1, option2, option3, option4) {
      $("#quizPopup").html(`
        <p>What is the population of ${countries[countryCode].name}? </p>
        <label>${option1}</label>
        <input type="radio" name="answer" value="${option1}">
        <label>${option2}</label>
        <input type="radio" name="answer" value="${option2}">
        <label>${option3}</label>
        <input type="radio" name="answer" value="${option3}">
        <label>${option4}</label>
        <input type="radio" name="answer" value="${option4}">
        <button class="stopBtn">Stop Questions</button>
      `);

        //Check for correct answer and return true or false.
        $('input:radio[name="answer"]').change(
          function() {
            if ($(this).val() == currentPopulation) {
              answerToQuestion = true;
              $answerGiven.html ('Yeh You Gave the Right Answer');
              console.log(`Answer: ${answerToQuestion}`);
              console.log('correct selected: ' + currentPopulation);

              // Should update players amount of power upon answering question correctly
              gv.players.player1.power += currentCountryPower;
              $playerOnePower.html ('Power: ' + gv.players.player1.power);
            } else {
              answerToQuestion = false;
              $answerGiven.html ('Oh No You Gave the Wrong Answer');
              console.log(`Answer: ${answerToQuestion}`);
              console.log('correct not selected: ' + currentPopulation);
              // should update number of turns left after question is answered
              $turnCounter--;
              $turnDisplay.html ('Turns left: ' + $turnCounter);
              //function to check if game has ended(out of turns)
              gameOverChecker();
              closeWindow();
            }
            if ($turnCounter === 0) {
                $('#quizPopup').hide();
            } else {
            ask3rdQuestion(selectedCountries[0].area, selectedCountries[1].area, selectedCountries[2].area, selectedCountries[3].area);
            }
          });
      }
      //Third Question
      function ask3rdQuestion(option1, option2, option3, option4) {
        $("#quizPopup").html(`
          <p>What is the area of ${countries[countryCode].name}? </p>
          <label>${option1}</label>
          <input type="radio" name="answer" value="${option1}">
          <label>${option2}</label>
          <input type="radio" name="answer" value="${option2}">
          <label>${option3}</label>
          <input type="radio" name="answer" value="${option3}">
          <label>${option4}</label>
          <input type="radio" name="answer" value="${option4}">
          <button class="stopBtn">Stop Questions</button>
          `);

          //Check for correct answer and return true or false.
          $('input:radio[name="answer"]').change(
            function() {
              if ($(this).val() == currentArea) {
                answerToQuestion = true;
                $answerGiven.html ('Yeh You Gave the Right Answer');
                console.log(`Answer: ${answerToQuestion}`);
                console.log('correct selected: ' + currentArea);

                // Should update players amount of power upon answering question correctly
                gv.players.player1.power += currentCountryPower;
                $playerOnePower.html ('Power: ' + gv.players.player1.power);
                // should update number of turns left after question is answered
                // $turnCounter--;
                $turnDisplay.html ('Turns left: ' + $turnCounter);
              } else {
                answerToQuestion = false;
                $answerGiven.html ('Oh No You Gave the Wrong Answer');
                console.log(`Answer: ${answerToQuestion}`);
                console.log('correct not selected: ' + currentArea);
                // should update number of turns left after question is answered
                $turnCounter--;
                $turnDisplay.html ('Turns left: ' + $turnCounter);
                //function to check if game has ended(out of turns)
                gameOverChecker();
                closeWindow();
              }
              if ($turnCounter === 0) {
                  $('#quizPopup').hide();
              } else {
              ask4thQuestion(selectedCountries[0].region, selectedCountries[1].region, selectedCountries[2].region, selectedCountries[3].region);
              }
            });
        }
        //Forth Question
        function ask4thQuestion(option1, option2, option3, option4) {
          $("#quizPopup").html(`
            <p>In what region is ${countries[countryCode].name} located? </p>
            <label>${option1}</label>
            <input type="radio" name="answer" value="${option1}">
            <label>${option2}</label>
            <input type="radio" name="answer" value="${option2}">
            <label>${option3}</label>
            <input type="radio" name="answer" value="${option3}">
            <label>${option4}</label>
            <input type="radio" name="answer" value="${option4}">
            <button class="stopBtn">Stop Questions</button>
            `);

            //Check for correct answer and return true or false.
            $('input:radio[name="answer"]').change(
              function() {
                if ($(this).val() == currentRegion) {
                  answerToQuestion = true;
                  $answerGiven.html ('Yeh You Gave the Right Answer');
                  console.log(`Answer: ${answerToQuestion}`);
                  console.log('correct selected: ' + currentRegion);

                  // Should update players amount of power upon answering question correctly
                  gv.players.player1.power += currentCountryPower;
                  $playerOnePower.html ('Power: ' + gv.players.player1.power);
                  // should update number of turns left after question is answered
                  $turnCounter--;
                  $turnDisplay.html ('Turns left: ' + $turnCounter);
                } else {
                  answerToQuestion = false;
                  $answerGiven.html ('Oh No You Gave the Wrong Answer');
                  console.log(`Answer: ${answerToQuestion}`);
                  console.log('correct not selected: ' + currentRegion);
                  // should update number of turns left after question is answered
                  $turnCounter--;
                  $turnDisplay.html ('Turns left: ' + $turnCounter);
                  //function to check if game has ended(out of turns)
                  gameOverChecker();
                  closeWindow();
                }
                $('#quizPopup').hide();
                ask5thQuestion(selectedCountries[0].currency, selectedCountries[1].currency, selectedCountries[2].currency, selectedCountries[3].currency);
              });
          }
          //Fifth Question
          let ask5thQuestion = function(option1, option2, option3, option4) {
            $("#quizPopup").html(`
              <p>What currency is used Int32Array() ${countries[countryCode].name}? </p>
              <label>${option1}</label>
              <input type="radio" name="answer" value="${option1}">
              <label>${option2}</label>
              <input type="radio" name="answer" value="${option2}">
              <label>${option3}</label>
              <input type="radio" name="answer" value="${option3}">
              <label>${option4}</label>
              <input type="radio" name="answer" value="${option4}">
              <button class="stopBtn">Stop Questions</button>
              `);

              //Check for correct answer and return true or false.
              $('input:radio[name="answer"]').change(
                function() {
                  if ($(this).val() == currentCurrency) {
                    answerToQuestion = true;
                    $answerGiven.html ('Yeh You Gave the Right Answer');
                    console.log(`Answer: ${answerToQuestion}`);
                    console.log('correct selected: ' + currentCurrency);

                    // Should update players amount of power upon answering question correctly
                    gv.players.player1.power += currentCountryPower;
                    $playerOnePower.html ('Power: ' + gv.players.player1.power);
                    // should update number of turns left after question is answered
                    $turnCounter--;
                    $turnDisplay.html ('Turns left: ' + $turnCounter);
                  } else {
                    answerToQuestion = false;
                    $answerGiven.html ('Oh No You Gave the Wrong Answer');
                    console.log(`Answer: ${answerToQuestion}`);
                    console.log('correct not selected: ' + currentCurrency);
                    // should update number of turns left after question is answered
                    $turnCounter--;
                    $turnDisplay.html ('Turns left: ' + $turnCounter);
                  }
                  $('#quizPopup').hide();
                  // ask5thQuestion(selectedCountries[0].border, selectedCountries[1].border, selectedCountries[2].border, selectedCountries[3].border);
                });
            };

        }

        function conquerCountry(marker) {
          // console.log(fnc_removeListener);
          google.maps.event.clearListeners(currentIcon);
          console.log("The Marker: ", marker);
        }

        // functions to check if the turns have ended and to display gameOver screen when out of turns
        function gameOverChecker() {
          if ($turnCounter <= 0){
            console.log("GAME OVER MAN");
            endGame();
          }
        }

        function makeResetWork() {
          $('#restart').click( function() {
            console.log("CLEKCK!");
            // window.reload();
          });
        }

        function endGame() {
          console.log("GAME OVER!!");
          $gameOverScreen.html(`
            <h2>Game Over</h2>
            <p id="playerOneFinalScore">Player One has `+ gv.players.player1.power +`</p>
            <p id="playeTwoFinalScore">Player Two has `+ gv.players.player2.power +`</p>
            <button id="restart">Restart</button>
          `);
          makeResetWork();
        }



});
