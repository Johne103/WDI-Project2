$(() => {

  // let $gameOverScreen;

  let countryData = [];
  let selectedCountries = [];
  let currentCountry = "";
  let currentCapital = "";
  let currentPopulation = "";
  let currentArea = "";
  let currentSubRegion = "";
  let currentCurrency = [];
  let currentBorder = [];
  let currentBorderCount = 0;
  let currentCountryPower = 0;
  let isCountry = "";
  let answerToQuestion = "";
  let numberOfQuestionOptions = 0; //Number of options to select for each question.
  gv.players.player1.powerDiv = $('#hud .playerPower');
  gv.players.player2.powerDiv = $('#hud2 .playerPower');
  gv.players.player1.$answerGiven = $('#hud .answerGiven');
  gv.players.player2.$answerGiven = $('#hud2 .answerGiven');
  let $turnIndicator = $('#showPlayerTurn');
  let $turnDisplay = $('.turnDisplay');
  gv.players.player1.turnDisplayDiv = $('#hud .turnDisplay');
  gv.players.player2.turnDisplayDiv = $('#hud2 .turnDisplay');
  let $gameOverScreen = $('#gameOverDiv');
  gv.players.player1.power = 0;
  gv.players.player2.power = 0;
  gv.players.player1.turnCounter = 1;
  gv.players.player2.turnCounter = 1;

  // functions to check if the turns have ended and to display gameOver screen when out of turns

  $gameOverScreen.hide();
  $turnIndicator.hide();

  function conquerCountry(marker) {
    google.maps.event.clearListeners(gv.turnInfo.currentIcon);
    console.log('NO CLECK NO CRY');
  }



  function makeResetWork() {
    $('#restart').click( function() {
      gv.players.player1.$answerGiven.html('');
      gv.players.player2.$answerGiven.html('');

      gv.players.player1.powerDiv.html('');
      gv.players.player2.powerDiv.html('');

      $turnDisplay.html('');

      gv.players.player1.turnDisplayDiv.html('');
      gv.players.player2.turnDisplayDiv.html('');

      gv.players.player1.power = 0;
      gv.players.player2.power = 0;
      gv.players.player1.turnCounter = 1;
      gv.players.player2.turnCounter = 1;

      $gameOverScreen.hide();

      startGame();
    });
  }

  function endGame() {
    let winner = gv.players.player1.power > gv.players.player2.power ? "player one" : "player two";
    let draw = gv.players.player1.power === gv.players.player2.power;
    let winStr = draw ? "It's a tie!" : `${winner} wins!`;
    clearMarkers();
    $turnIndicator.hide();
    $gameOverScreen.show();
    $gameOverScreen.html(`
      <h2>Game Over</h2>

      <p>${winStr}</p>
      <button id="restart">Restart</button>
    `);
    makeResetWork();
  }

  // <p id="playerOneFinalScore">Player One has `+ gv.players.player1.power +` points</p>
  // <p id="playerTwoFinalScore">Player Two has `+ gv.players.player2.power +` points</p>

  function gameOverChecker() {
    if (gv.players.player2.turnCounter <= 0){
      console.log("GAME OVER MAN");
      endGame();
    }
  }

  function processTurn() {
    gv.players["player"+gv.turnInfo.turn].powerDiv.parent().parent().parent().css('opacity', '0');
    gv.players["player"+gv.turnInfo.turn].turnCounter--;
    gv.players["player"+gv.turnInfo.turn].turnDisplayDiv.html ('Turns left: ' + gv.players["player"+gv.turnInfo.turn].turnCounter);
    gv.turnInfo.turn = gv.turnInfo.turn === 1 ? gv.turnInfo.turn + 1 : gv.turnInfo.turn -1;
    // if(gv.turnInfo.turn === 1){
    //   $turnIndicator.html("Player 1's Turn");
    // } else if (gv.turnInfo.turn === 2) {
    //   $turnIndicator.html("Player 2's Turn");
    // }
    console.log(gv.turnInfo.turn);
    gv.players["player"+gv.turnInfo.turn].powerDiv.parent().parent().parent().css('opacity', '1');
    closeWindow();
  }

  function checkAI() {
    if (gv.turnInfo.turn === 2) {
      runAI();
    }
  }

  function runAI(){
    // get random country.
  }

  getArray(() => {
    $('#map').on('click', '.conquer', function() {
      let countryCode = $(this).data('country');
      $('#quizPopup').show();
      infoWindow.close();
      quizQuestion(countryCode);
    });
  });


  $('#quizPopup').on("click", '.stopBtn', processTurn);

  function closeWindow () {
    $('#quizPopup').hide();
    gameOverChecker();
  }

  function getArray(callback) {
    console.log("getArray started");
    // create array of objects of all countries with properties name, capital, alpha2Code and latLng.
    $.get("https://restcountries.eu/rest/v1/all")
    .done(function(data) {

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
          bordersCount: country.borders.length,
          currencies: country.currencies[0],
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
    currentSubRegion = countryData[index].subRegion;
    currentCurrency = countryData[index].currencies;
    currentBorder = countryData[index].borders;
    currentBorderCount = countryData[index].borders.length;



    currentCountryPower = $('html').find('.cPower').html();
    // console.log('find: ' + currentCountryPower[0], currentCountryPower);
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
      console.log(country);
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

    console.log('current border count ' + currentBorderCount);
    console.log('border 0 length ' + selectedCountries[0].borders.length);
    console.log('border 1 length ' + selectedCountries[1].borders.length);
    console.log('border 2 length ' + selectedCountries[2].borders.length);
    console.log('border 3 length ' + selectedCountries[3].borders.length);

    //First Question
    ask1stQuestion(selectedCountries[0].capital, selectedCountries[1].capital, selectedCountries[2].capital, selectedCountries[3].capital);

    function ask1stQuestion(option1, option2, option3, option4) {

      $("#quizPopup").html(`
        <p>What is the capital of ${countries[countryCode].name}? </p>
        <div class="qHolder">
          <label>${option1}</label>
          <input type="radio" name="answer" value="${option1}">
        </div>
        <div class="qHolder">
          <label>${option2}</label>
          <input type="radio" name="answer" value="${option2}">
        </div>
        <div class="qHolder">
          <label>${option3}</label>
          <input type="radio" name="answer" value="${option3}">
        </div>
        <div class="qHolder">
          <label>${option4}</label>
          <input type="radio" name="answer" value="${option4}">
        </div>
        <button class="stopBtn">Retreat</button>

        `);


      //Check for correct answer and return true or false.
      $('input:radio[name="answer"]').change(
        function() {
          if ($(this).val() == currentCapital) {
            answerToQuestion = true;

            gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Yeh You Gave the Right Answer');
            // $main.html(`Oh Yes.`);
            // Should update players amount of power upon answering question correctly
            gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
            gv.players['player' + gv.turnInfo.turn].powerDiv.html ('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
            changeIcon(gv.turnInfo.currentIcon);
            //function to check if game has ended(out of turns)
            conquerCountry();
          } else {
            answerToQuestion = false;
            gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Oh No You Gave the Wrong Answer');
            // $main.html(`Oh No.`);
            // should update number of turns left after question is answered
            processTurn(gv.turnInfo.turn);
            //function to check if game has ended(out of turns)
            gameOverChecker();
          }
          if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
            $('#quizPopup').hide();
          } else {


            selectedCountries = shuffle(selectCountries(countryCode));
            ask2ndQuestion(selectedCountries[0].population.toLocaleString(), selectedCountries[1].population.toLocaleString(), selectedCountries[2].population.toLocaleString(), selectedCountries[3].population.toLocaleString());
          }
        });
    }

    //Second Question
    function ask2ndQuestion(option1, option2, option3, option4) {
      $("#quizPopup").html(`
        <p>What is the population of ${countries[countryCode].name}? </p>
        </div>
        <div class="qHolder"><label>${option1}</label>
        <input type="radio" name="answer" value="${option1}">
        </div>
        <div class="qHolder"><label>${option2}</label>
        <input type="radio" name="answer" value="${option2}">
        </div>
        <div class="qHolder"><label>${option3}</label>
        <input type="radio" name="answer" value="${option3}">
        </div>
        <div class="qHolder"><label>${option4}</label>
        <input type="radio" name="answer" value="${option4}">

        </div>
        <button class="stopBtn">Retreat</button>
      `);

        //Check for correct answer and return true or false.
        $('input:radio[name="answer"]').change(
          function() {
            if ($(this).val() == currentPopulation.toLocaleString()) {
              answerToQuestion = true;
              gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Yeh You Gave the Right Answer');

              // Should update players amount of power upon answering question correctly
              gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
              gv.players['player' + gv.turnInfo.turn].powerDiv.html ('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
            } else {
              answerToQuestion = false;
              gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Oh No You Gave the Wrong Answer');
              // should update number of turns left after question is answered
              processTurn();
              //function to check if game has ended(out of turns)
              gameOverChecker();
            }
            if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
                $('#quizPopup').hide();
            } else {
            selectedCountries = shuffle(selectCountries(countryCode));
            ask3rdQuestion(selectedCountries[0].area.toLocaleString(), selectedCountries[1].area.toLocaleString(), selectedCountries[2].area.toLocaleString(), selectedCountries[3].area.toLocaleString());
            }
          });
      }
      //Third Question
      function ask3rdQuestion(option1, option2, option3, option4) {
        $("#quizPopup").html(`
          <p>What is the area of ${countries[countryCode].name}? </p>

          <div class="qHolder">
            <label>${option1} sqm</label>
            <input type="radio" name="answer" value="${option1}">
          </div>
          <div class="qHolder">
            <label>${option2} sqm</label>
            <input type="radio" name="answer" value="${option2}">
          </div>
          <div class="qHolder">
            <label>${option3} sqm</label>
            <input type="radio" name="answer" value="${option3}">
          </div>
          <div class="qHolder">
            <label>${option4} sqm</label>
            <input type="radio" name="answer" value="${option4}">
          </div>
          <button class="stopBtn">Retreat</button>
          `);


          //Check for correct answer and return true or false.
          $('input:radio[name="answer"]').change(
            function() {
              if ($(this).val() == currentArea.toLocaleString()) {
                answerToQuestion = true;
                gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Yeh You Gave the Right Answer');
                console.log(`Answer: ${answerToQuestion}`);
                console.log('correct selected: ' + currentArea);

                // Should update players amount of power upon answering question correctly
                gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
                gv.players['player' + gv.turnInfo.turn].powerDiv.html ('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
                // should update number of turns left after question is answered
                // gv.players.player1.turnCounter--;
              } else {
                answerToQuestion = false;
                gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Oh No You Gave the Wrong Answer');
                console.log(`Answer: ${answerToQuestion}`);
                console.log('correct not selected: ' + currentArea);
                // should update number of turns left after question is answered
                //function to check if game has ended(out of turns)
                processTurn();
                gameOverChecker();
              }
              if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
                  $('#quizPopup').hide();
              } else {

              selectedCountries = shuffle(selectCountries(countryCode));
              ask4thQuestion(selectedCountries[0].subRegion, selectedCountries[1].subRegion, selectedCountries[2].subRegion, selectedCountries[3].subRegion);
              }
            });
        }
        //Forth Question
        function ask4thQuestion(option1, option2, option3, option4) {
          $("#quizPopup").html(`
            <p>In what subregion is ${countries[countryCode].name} located? </p>

            <div class="qHolder">
              <label>${option1}</label>
              <input type="radio" name="answer" value="${option1}">
            </div>
            <div class="qHolder">
              <label>${option2}</label>
              <input type="radio" name="answer" value="${option2}">
            </div>
            <div class="qHolder">
              <label>${option3}</label>
              <input type="radio" name="answer" value="${option3}">
            </div>
            <div class="qHolder">
              <label>${option4}</label>
              <input type="radio" name="answer" value="${option4}">
            </div>
            <button class="stopBtn">Retreat</button>
            `);


            //Check for correct answer and return true or false.
            $('input:radio[name="answer"]').change(
              function() {
                if ($(this).val() == currentSubRegion) {
                  answerToQuestion = true;
                  gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Yeh You Gave the Right Answer');
                  console.log(`Answer: ${answerToQuestion}`);
                  console.log('correct selected: ' + currentSubRegion);

                  // Should update players amount of power upon answering question correctly
                  gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
                  gv.players['player' + gv.turnInfo.turn].powerDiv.html ('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
                  // should update number of turns left after question is answered
                } else {
                  answerToQuestion = false;
                  gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Oh No You Gave the Wrong Answer');
                  console.log(`Answer: ${answerToQuestion}`);
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
          let ask5thQuestion = function(option1, option2, option3, option4) {
            $("#quizPopup").html(`
              <p>Which currency is used in ${countries[countryCode].name}? </p>

              <div class="qHolder">
                <label>${option1}</label>
                <input type="radio" name="answer" value="${option1}">
              </div>
              <div class="qHolder">
                <label>${option2}</label>
                <input type="radio" name="answer" value="${option2}">
              </div>
              <div class="qHolder">
                <label>${option3}</label>
                <input type="radio" name="answer" value="${option3}">
              </div>
              <div class="qHolder">
                <label>${option4}</label>
                <input type="radio" name="answer" value="${option4}">
              </div>
              <button class="stopBtn">Retreat</button>
              `
            );
              //Check for correct answer and return true or false.
              $('input:radio[name="answer"]').change(
                function() {
                  if ($(this).val() == currentCurrency) {
                    answerToQuestion = true;
                    gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Yeh You Gave the Right Answer');
                    console.log('currency is ' + currentCurrency);

                    // Should update players amount of power upon answering question correctly
                    gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
                    gv.players['player' + gv.turnInfo.turn].powerDiv.html ('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
                    // should update number of turns left after question is answered
                  } else {
                    answerToQuestion = false;
                    gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Oh No You Gave the Wrong Answer');
                    console.log('currency is not ' + currentCurrency);
                    processTurn();
                    gameOverChecker();
                    // should update number of turns left after question is answered
                  }
                  if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
                      $('#quizPopup').hide();
                  } else {

                    selectedCountries = shuffle(selectCountries(countryCode));
                    ask6thQuestion(selectedCountries[0].borders.length, selectedCountries[1].borders.length, selectedCountries[2].borders.length, selectedCountries[3].borders.length);

                   }
                });
            };


            //Sixth Question
            let ask6thQuestion = function(option1, option2, option3, option4) {
              $("#quizPopup").html(`
                <h3>Question 6</h3>
                <p>How many countries border ${countries[countryCode].name}? </p>

                <div class="qHolder">
                  <label>${option1}</label>
                  <input type="radio" name="answer" value="${option1}">
                </div>
                <div class="qHolder">
                  <label>${option2}</label>
                  <input type="radio" name="answer" value="${option2}">
                </div>
                <div class="qHolder">
                  <label>${option3}</label>
                  <input type="radio" name="answer" value="${option3}">
                </div>
                <div class="qHolder">
                  <label>${option4}</label>
                  <input type="radio" name="answer" value="${option4}">
                </div>

                <button class="stopBtn">Retreat</button>
                `);


                //Check for correct answer and return true or false.
                $('input:radio[name="answer"]').change(
                  function() {
                    if ($(this).val() == currentBorderCount) {
                      answerToQuestion = true;
                      gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Yeh You Gave the Right Answer');
                      console.log(`Answer: ${answerToQuestion}`);
                      console.log('correct border selected: ' + currentBorderCount);

                      // Should update players amount of power upon answering question correctly
                      gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
                      gv.players['player' + gv.turnInfo.turn].powerDiv.html ('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
                      processTurn();
                      gameOverChecker();
                      closeWindow();
                    } else {
                      answerToQuestion = false;
                      gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Oh No You Gave the Wrong Answer');
                      console.log(`Answer: ${answerToQuestion}`);
                      console.log('correct border not selected: ' + currentBorderCount);
                      processTurn();
                      gameOverChecker();
                      closeWindow();
                    }
                    if (gv.players['player' + gv.turnInfo.turn].turnCounter === 0) {
                        $('#quizPopup').hide();
                    } else {

                    // selectedCountries = shuffle(selectCountries(countryCode));
                    // ask7thQuestion(selectedCountries[0].borders[0], selectedCountries[1].borders[0], selectedCountries[2].borders[0], selectedCountries[3].borders[0]);
                    }
                });
            };

}
});
