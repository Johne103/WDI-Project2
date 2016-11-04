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
  let numberOfQuestions = 0;
  let numberOfQuestionOptions = 0; //Number of options to select for each question.
  let units = "";
  let theQuestion = '';
  gv.players.player1.powerDiv = $('#hud .playerPower');
  gv.players.player2.powerDiv = $('#hud2 .playerPower');
  gv.players.player1.$answerGiven = $('#hud .answerGiven');
  gv.players.player2.$answerGiven = $('#hud2 .answerGiven');
  let $turnIndicator = $('#showPlayerTurn');
  gv.main.turnDisplay = $('.turnDisplay');
  gv.players.player1.turnDisplayDiv = $('#hud .turnDisplay');
  gv.players.player2.turnDisplayDiv = $('#hud2 .turnDisplay');
  let $gameOverScreen = $('#gameOverDiv');

  // functions to check if the turns have ended and to display gameOver screen when out of turns

  $gameOverScreen.hide();
  $turnIndicator.hide();

  function conquerCountry(marker) {
    google.maps.event.clearListeners(gv.turnInfo.currentIcon);
    console.log('NO CLECK NO CRY');
  }



  function makeResetWork() {
    $('#restart').click( function() {
      $gameOverScreen.hide();
      $turnIndicator.html('');
      // $turnIndicator.show();
      startGame();
    });
  }

  function endGame() {
    $('.edit').hide();
    $('.delete').hide();

    let winner = gv.players.player1.power > gv.players.player2.power ? '<span class="handle">' + gv.players.player1.handle +'</span>' + " scores " + '<span class="handle">' + gv.players.player1.power +'</span>' + " points and saves the day! hooray!": '<span class="handle">' + gv.players.player2.handle + '</span> scores <span class="handle">' +  gv.players.player2.power + ' </span> points and takes over the world! muahahah' ;
    let draw = gv.players.player1.power === gv.players.player2.power;
    let winStr = draw ? "It's a tie!" : `${winner}`;
    clearMarkers();
    $turnIndicator.hide();
    $gameOverScreen.show();
    $gameOverScreen.html(`
      <h2 class="GO">Game Over</h2>
      <p class="GOwin">${winStr}</p>
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

  function rndNumber(max){
    let rndNumber = Math.floor(Math.random()*max);
    return rndNumber;
  }

  function processTurn() {
    gv.players["player"+gv.turnInfo.turn].powerDiv.parent().parent().parent().css('opacity', '0.8');
    gv.players["player"+gv.turnInfo.turn].turnCounter--;
    gv.players["player"+gv.turnInfo.turn].turnDisplayDiv.html ('Turns left: ' + gv.players["player"+gv.turnInfo.turn].turnCounter);
    gv.turnInfo.turn = gv.turnInfo.turn === 1 ? gv.turnInfo.turn + 1 : gv.turnInfo.turn -1;
    // if(gv.turnInfo.turn === 1){
    //   $turnIndicator.html("Player 1's Turn");
    // } else if (gv.turnInfo.turn === 2) {
    //   $turnIndicator.html("Player 2's Turn");
    // }
    gv.players["player"+gv.turnInfo.turn].powerDiv.parent().parent().parent().css('opacity', '1');

    for(let i = 0; i<markersAlt.length; i++){
      if(gv.main.selectedCountry === markersAlt[i][1]){
      markersAlt.splice(i,1);
      }
    }

    closeWindow();
    checkAI();
  }

  function checkAI() {
    if (gv.turnInfo.turn === 2) {
      runAI();
    }
  }

  function runAI(){
    let rndNum = rndNumber(markersAlt.length);
    let aiCountry = markersAlt[rndNum];

    let aiScore = aiCountry[2] * rndNumber(6);
    gv.players.player2.power += aiScore;
    gv.players.player2.powerDiv.html("Power: " + gv.players.player2.power);
    $turnIndicator.show().html(aiCountry[1] + ` has fallen to ${gv.players.player2.handle}! <br> Fight back hero!`);
    google.maps.event.clearListeners(aiCountry[0]);
    console.log(aiCountry, aiScore);
    changeIcon(aiCountry[0]);
    markersAlt.splice(rndNum,1);
    processTurn();
  }

  getArray(() => {
    $('#map').on('click', '.conquer', function() {
      let countryCode = $(this).data('country');
      console.log('--on map conquer click:');
      console.log('  countryCode:', countryCode);
      console.log('  selectedCountries:', selectedCountries);
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

    console.log('current capital is ' + currentCapital);

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
      while(selectedCountries.indexOf(country) !== -1 || currentArea === null ) {
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


    const questions = [
      {
        //First question
        theQuestion: 'What is the capital of ' ,
        option1: selectedCountries[0].capital,
        option2: selectedCountries[1].capital,
        option3: selectedCountries[2].capital,
        option4: selectedCountries[3].capital,
        currentQuestion: currentCapital,
        countryCode: countryCode,
        units: ''
      },
      {
        //Second question
        theQuestion: 'What is the population of ' ,
        option1: selectedCountries[1].population.toLocaleString(),
        option2: selectedCountries[0].population.toLocaleString(),
        option3: selectedCountries[3].population.toLocaleString(),
        option4: selectedCountries[2].population.toLocaleString(),
        currentQuestion: currentPopulation.toLocaleString(),
        countryCode: countryCode,
        units: ''

      },
      {
        //Third question
        theQuestion: 'What is the area of ' ,
        option1: selectedCountries[2].area.toLocaleString(),
        option2: selectedCountries[1].area.toLocaleString(),
        option3: selectedCountries[0].area.toLocaleString(),
        option4: selectedCountries[3].area.toLocaleString(),
        currentQuestion: currentArea.toLocaleString(),
        countryCode: countryCode,
        units: 'sqm'
      },
      {
        //Fourth question
        theQuestion: 'In which sub regaion is ' ,
        option1: selectedCountries[3].subRegion,
        option2: selectedCountries[0].subRegion,
        option3: selectedCountries[2].subRegion,
        option4: selectedCountries[1].subRegion,
        currentQuestion: currentSubRegion,
        countryCode: countryCode,
        units: ''
      },
      {
        //Fifth question
        theQuestion: 'What is the currency of ' ,
        option1: selectedCountries[0].currencies,
        option2: selectedCountries[1].currencies,
        option3: selectedCountries[3].currencies,
        option4: selectedCountries[2].currencies,
        currentQuestion: currentCurrency,
        countryCode: countryCode,
        units: ''
      },
      {
        //Sixth question
        theQuestion: 'How may countries have a border with ' ,
        option1: selectedCountries[2].borders.length,
        option2: selectedCountries[1].borders.length,
        option3: selectedCountries[3].borders.length,
        option4: selectedCountries[0].borders.length,
        currentQuestion: currentBorderCount,
        countryCode: countryCode,
        units: ''
      }
    ];

    numberOfQuestions = questions.length;

    askQuestions(questions);
  }

  function askQuestions(questionDefs) {


    let questionDefHead = questionDefs.splice(0, 1);
    let questionDef = questionDefHead[0];

    console.log('What is in questionDef ' + questionDef);
    console.log('What is in theQuestion ' + theQuestion);


    $("#quizPopup").html(`
      <p>${questionDef.theQuestion} ${countries[questionDef.countryCode].name}? </p>
      <div class="qHolder">
        <label>${questionDef.option1}${questionDef.units}</label>
        <input type="radio" name="answer" value="${questionDef.option1}">
      </div>
      <div class="qHolder">
        <label>${questionDef.option2}${questionDef.units}</label>
        <input type="radio" name="answer" value="${questionDef.option2}">
      </div>
      <div class="qHolder">
        <label>${questionDef.option3}${questionDef.units}</label>
        <input type="radio" name="answer" value="${questionDef.option3}">
      </div>
      <div class="qHolder">
        <label>${questionDef.option4}${questionDef.units}</label>
        <input type="radio" name="answer" value="${questionDef.option4}">
      </div>
      <button class="stopBtn">Retreat</button>
      `);

    //Check for correct answer and return true or false.
    $('input:radio[name="answer"]').change(
      function() {
        if ($(this).val() == questionDef.currentQuestion) {
          answerToQuestion = true;
          gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Yeh You Gave the Right Answer');
          // $main.html(`Oh Yes.`);
          // Should update players amount of power upon answering question correctly
          gv.players['player' + gv.turnInfo.turn].power += currentCountryPower;
          gv.players['player' + gv.turnInfo.turn].powerDiv.html ('Power: ' + gv.players['player' + gv.turnInfo.turn].power);
          changeIcon(gv.turnInfo.currentIcon);
          //function to check if game has ended(out of turns)
          conquerCountry();
          $('.turnDisplay').show();
          $('.playerPower').show();
          $('.answerGiven').show();
        } else {
          answerToQuestion = false;
          gv.players['player' + gv.turnInfo.turn].$answerGiven.html ('Oh No You Gave the Wrong Answer');
          // $main.html(`Oh No.`);
          // should update number of turns left after question is answered
          processTurn(gv.turnInfo.turn);
          //function to check if game has ended(out of turns)
          gameOverChecker();
          $('.turnDisplay').show();
          $('.playerPower').show();
          $('.answerGiven').show();
        }
        if (numberOfQuestions === 1 ){
          processTurn(gv.turnInfo.turn);
        }
        if (numberOfQuestions > 1) {
            askQuestions(questionDefs);
            numberOfQuestions --;


        } else {
          $('#quizPopup').hide();
        }
      });
    }
});
