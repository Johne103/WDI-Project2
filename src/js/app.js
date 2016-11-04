const gv = {
  main: {
  },
  turnInfo: {
    turn: 1, // 1 = player 1, 2 = player 2
    currentIcon: {}
  },
  players: {
    player1: {
      avatar: "",
      name: ""
    },
    player2: {
      avatar: "",
      name: ""
    }
  },
  heroes: {
    "wolverine": "rgba(55,174,182,1)", //lightblue
    "deadpool": "rgba(55,174,182,1)", //lightblue
    "emma frost": "rgba(55,174,182,1)", //lightblue
    "thor": "rgba(40,107,152,1)", //medblue
    "ultron": "rgba(40,107,152,1)", //medblue
    "hulk": "rgba(64,38,85,1)", //purple
    "magneto": "rgba(64,38,85,1)", //purple
    "iron man": "rgba(64,38,85,1)", //purple
    "apocalypse": "rgba(193,97,21,1)", //orange
    "rogue": "rgba(193,97,21,1)", //orange
    "groot": "rgba(193,97,21,1)", //orange
    "venom": "rgba(191,157,24,1)", //yellow
    "elektra": "rgba(191,157,24,1)", //yellow
    "spider-man": "rgba(191,157,24,1)",
    "loki": "rgba(139,139,139,1)", //grey
    "doctor octopus": "rgba(194,94,19,1)", //orange
    "star-lord": "rgba(140,37,22,1)",
    "doctor doom": "rgba(40,107,152,1)",
    "thanos": "rgba(75,130,75,1)", // green
    "winter soldier": "rgba(75,130,75,1)", // green
    "jean grey": "rgba(0,0,0,1)", //black
    "punisher": "rgba(140,37,22,1)", //red
    "medusa": "rgba(140,37,22,1)", //red
    "sif": "rgba(139,139,139,1)" //grey
  }
};


/*
  Example players object
  players: {
    player1: {
      turnLimit: 20;
      power: 20;
      avatar: ;
    }
    player2: {
      turnLimit: 20;
      power: 20;
      avatar: ;
    }
  }
}
*/

let map;
let fnc_removeListener;
let currentCountryListener;
let infoWindow = null;

let markers = [];
let markersAlt = [];
let rulesShowing = false;



function clearMarkers() {
  markers.forEach((marker) => {
    marker[0].setMap(null);
  });

  markers = [];
  markersAlt = [];
}

function startGame() {
  if (event) event.preventDefault();

  gv.players.player1.$answerGiven.html('');
  gv.players.player2.$answerGiven.html('');
  gv.players.player1.powerDiv.html('');
  gv.players.player2.powerDiv.html('');
  gv.main.turnDisplay.html('');
  gv.players.player1.turnDisplayDiv.html('');
  gv.players.player2.turnDisplayDiv.html('');
  $('#showPlayerTurn').append().html('');
  gv.players.player1.power = 0;
  gv.players.player2.power = 0;
  gv.players.player1.turnCounter = 3;
  gv.players.player2.turnCounter = 3;

  $('.edit').hide();
  $('.delete').hide();

  $(this).parent().remove();
  // $('#showPlayerTurn').show();

  let currentWindow = null;
  $('#gameLogo').hide();
  clearMarkers();
  gv.main.mainP2.parent().css("opacity", "0.8");
  for (let countryCode in countries){

    let country = countries[countryCode];
    let latLng = { lat: country.latlng[0], lng: country.latlng[1] };
    let marker = new google.maps.Marker({
      map: map,
      position: latLng,
      icon:"images/grayMarker.png"
    });

    marker.metadata = {type: "country", id: country.name};

    markers.push([
      marker,
      country.name,
      country.power
    ]);

    let countryDetails = `
      <div id='content' >
        <h1>`+ country.name + `</h1>
        <div id='countryInfo'>
            <ul>
              <li>Power to be gained per question</li>
              <li class="countryPower">`+ country.power +`</li>
              <button class="conquer" data-country="${countryCode}">Conquer?</button>
            </ul>
        </div>
      </div>
      `;

    let eventlistener = marker.addListener('click', function() {

      infoWindow = new google.maps.InfoWindow({
        content: countryDetails,
        position: new google.maps.LatLng(latLng.lat, latLng.lng)
      });

      $('.cPower').html(`${country.power}`);
      gv.turnInfo.currentIcon = this; // set global to variable.
      gv.main.selectedCountry = this.metadata.id;

      if (currentWindow !== null) {
        currentWindow.close();
      }
      infoWindow.open(map, marker);
      currentWindow = infoWindow;

    });

  }
  markersAlt = markers.slice(0);
}

function changeIcon(ci) {
  ci.setIcon({
      url: gv.players['player' + gv.turnInfo.turn].avatar, // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(40, 40) // anchor
  });
}

// Document on load

$(() => {

  gv.main.mainP1 = $('#hud main');
  gv.main.mainP2 = $('#hud2 main');


  gv.main.mainP1.on('submit', 'form', handleForm);
  gv.main.mainP1.on('click', '.delete', deleteUser);
  gv.main.mainP1.on('click', '.edit', getUser);

  $('html').on('click', '.startGame', startGame);

  let $registerButton = $('.register');
  $registerButton.on('click', showRegisterForm);

  let $login = $('.login');
  $login.on('click', function(){
    showLoginForm({message: ""});
  });

  $('.logout').hide();
  // $('.logout').on('click', logout);
  $('html').on('click', '.logout', logout);


  gv.main.mainP1.on('click', '.avatar', function() {
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    let avatarID = $(this).data('id');
    let input = gv.main.mainP1.find('#characterId');
    input.val(avatarID);
  });

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if(isLoggedIn()) {
    // showProfileForm();
    console.log("logged in!");
  } else {
    showLoginForm({message: ""});
  }

  function getAvatars(characterId, type) {
    const characters = ['hulk', 'wolverine', 'deadpool', 'Elektra', 'spider-man', 'gambit', 'iron man', 'rogue', 'Jean Grey', 'medusa', 'emma frost', 'thor', 'captain america', 'groot', 'punisher'];

    let $avatars = $('<div class="avatarSelection"><h4>Choose your avatar</h4></div>');
    let $hiddenField = $(`<input type="hidden" name="characterId" id="characterId" value="" />`);

    for(let i = 0; i<characters.length; i++){
      $.ajax({
        url: "/api/profile/"+ characters[i],
        method: "GET"
      })
      .done(function(profile){

        let obj = profile.data[0];

        let selected = characterId === obj.id ? "selected" : "";
        if (selected === "selected") {
          // alert('yo dis is sick!');
          $hiddenField.val(obj.id);
        }
        $avatars.append(`
          <div class="avatar ${selected}" data-id="${obj.id}">
            <img src="${obj.thumbnail.path + '.' + obj.thumbnail.extension}" alt="profile image">
              <div class="overlay">
                <h4>${obj.name}</h4>
              </div>
          </div>
        `);
      })
      .fail(function(jqXHR){
        console.log(jqXHR.status);
        gv.main.mainP1.html(`You are a failure.`);
      });
    }
    $avatars.append($hiddenField);
    return $avatars;
  }

  function handleForm() {
    if(event) event.preventDefault();
    let token = localStorage.getItem('token');
    let $form = $(this);

    let url = $form.attr('action');
    let method = $form.attr('method');
    let data = $form.serialize();

    $.ajax({
      url,
      method,
      data,
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done((data) => {
      if(data.token) localStorage.setItem('token', data.token);
      showPlayerProfiles(data.user.characterId, data.user.username, data.user._id);
      $registerButton.hide();
      $login.hide();
      $('.logout').show();
    })
    .fail(function(data){
        if(url === "/api/user/register"){
          showRegisterForm(data);
        } else {
          showLoginForm(data);
        }
      }
    );
  }

  function showPlayerProfiles(id, user, userID){
    $.ajax({
      url: "/api/profile/show/"+ id,
      method: 'GET'
    })
    .done((profile) => {
      let obj = profile.data[0];
      gv.main.mainP1.parent().css({
        'width': '15%',
        'background-color': gv.heroes[obj.name.toLowerCase()]
        });
      gv.players.player1.avatar = obj.thumbnail.path + '.' + obj.thumbnail.extension;
      gv.players.player1.handle = user;
      gv.main.mainP1.html(`
        <div class="profileHolder">
          <div class="profileImage">
            <img src="${gv.players.player1.avatar}" >
          </div>
          <h3>${user}</h3>
          <p>${obj.description}</p>
        </div>
        `);

        gv.main.mainP1.append(`
          <a class="nav-link edit" data-id="${userID}">Edit</a>
          <a class="nav-link delete" data-id="${userID}">Delete</a>
        `);

        const characters = ['apocalypse', 'Doctor Doom', 'doctor octopus', 'loki', 'magneto', 'Winter Soldier', 'thanos', 'ultron'];
        let rndNum = Math.floor(Math.random() * characters.length);
        let rndCharacter = characters[rndNum];
        console.log(rndNum, rndCharacter);
        // Player 2
        $.ajax({
          url: "/api/profile/"+ rndCharacter,
          method: 'GET'
        }).done((profile) => {
          let obj = profile.data[0];

          gv.players.player2.handle = obj.name;
          gv.players.player2.avatar = obj.thumbnail.path + '.' + obj.thumbnail.extension;
          gv.main.mainP2.parent().css({
            "opacity": "0.7",
            'background-color': gv.heroes[obj.name.toLowerCase()]
            });
          gv.main.mainP2.html(`
            <div class="profileHolder">
              <div class="profileImage">
                <img src="${gv.players.player2.avatar}" >
              </div>
              <h3>${obj.name}</h3>
              <p>${obj.description}</p>
            </div>
            `);
            $('html').append(`
              <div class="startGameHolder"><p><span>${gv.players.player2.handle}</span> has found a way out from <em>"eternal"</em> banishment in the prisons of Asgard, intent on destroying earth and enslaving all it's people! Our future now rests on our last hope.. You... <span>${gv.players.player1.handle}</span>. Will you stand up and fight against the forces of evil?</p>
              <p>What is your response, hero?</p> <a href="#" class="startGame">I WANT WAR</a> <a href="#" class="logout"> I'm washing my hair</a> </div>
            `);
        }).fail(showLoginForm);
    })
    .fail(showLoginForm);
    console.log(gv.players.player2.handle);
  }

  function showLoginForm(data) {
    if(event) event.preventDefault();
    console.log(data.responseText);
    // console.log(JSON.parse(data.responseText));
    let retMsg = !!data.responseText ? "Invalid credentials" : "";
    gv.main.mainP1.html(`
      <form method="post" action="/api/user/login">
        <div class="form-group">
          <input class="form-control" name="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="password" placeholder="Password">
        </div>
        <span class="error">${retMsg}</span>
        <button class="btn btn-primary">Login</button>
      </form>
    `);
  }

  function showRegisterForm(data) {
    let $avatars = getAvatars(0, 'register');
    let retMsg = !!data.responseText ? "You have not filled out all the fields, please try again! Remember to choose your avatar" : "";
    if(event) event.preventDefault();
    gv.main.mainP1.html(`
      <form method="post" action="/api/user/register">
        <span class="error">${retMsg}</span>
        <div class="form-group">
          <input class="form-control" name="username" placeholder="Username">
        </div>
        <div class="form-group">
          <input class="form-control" name="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="password" placeholder="Password">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">
        </div>
        <div class="avatarHolder"></div>
        <button class="btn btn-primary">Register</button>
      </form>
    `);
    // gv.main.mainP1.on(eventName, '.avatarHolder', function() {});
    gv.main.mainP1.find('.avatarHolder').append($avatars);
  }

  function getUser() {
    let id = $(this).data('id');
    let token = localStorage.getItem('token');

    $('html').find('.startGameHolder').remove();

    $.ajax({
      url: `/api/user/${id}`,
      method: "GET",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done(showEditForm)
    .fail(showLoginForm);
  }

  function showEditForm(user) {
    let $avatars = getAvatars(user.characterId, 'edit');
    if(event) event.preventDefault();
    gv.main.mainP1.html(`
      <form method="put" action="/api/user/${user._id}">
        <div class="form-group">
          <input class="form-control" name="username" placeholder="Username" value="${user.username}">
        </div>
        <div class="form-group">
          <input class="form-control" name="email" placeholder="Email" value="${user.email}">
        </div>
        <div class="avatarHolder"></div>
        <button class="btn btn-primary">Edit</button>

      </form>
    `);
    gv.main.mainP1.parent().css({
      "width": "40%"
    });
    gv.main.mainP1.find('.avatarHolder').append($avatars);
  }

// DELETE
  function deleteUser() {
    let id = $(this).data('id');
    let token = localStorage.getItem('token');

    $('html').find('.startGameHolder').remove();

    $.ajax({
      url: `/api/user/${id}`,
      method: "DELETE",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done(logout)
    .fail(showLoginForm);
  }


// LOGOUT
  function logout() {
    if(event) event.preventDefault();
    $('html').find('.startGameHolder').remove();
    localStorage.removeItem('token');
    showLoginForm({message: ""});
    clearMarkers();
    $('#showPlayerTurn').hide();
    $('.turnDisplay').hide();
    $('.playerPower').hide();
    $('.answerGiven').hide();
    $('#gameOverDiv').hide();
    $('#quizPopup').hide();
    $('#gameLogo').show();
    $registerButton.show();
    $login.show();
    $('.logout').hide();
    gv.main.mainP1.parent().css({
      'width': '45%',
      'background-color': "#0d0c47"
    });
  }

  let $mapDiv = $('#map');

   map = new  google.maps.Map($mapDiv[0], {

    center: { lat:0, lng: 0},
    zoom: 2,
    styles:[{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}]  });

  map.setOptions({ maxZoom: 7});


  $('#rulesLink').on("click", showRules);
  gv.main.mainP1.on("click", '.exitRules', () => {
    $('.rulesContent').hide();
    $(".rules").show();
  });

  function showRules () {

      gv.main.mainP1.append(`
      <div class="rulesContent">
      <button class="exitRules" >x</button>
      <p>
      <strong class="rulesT">Object:</strong>
      <br>Score the most points to win the game. <br>
      <strong class="rulesT">Setup:</strong>
      <br>Choose a player from the list. You have 20 turns. Countries have different values based on power structures.
      <br>
      <strong class="rulesT">Playing the game:</strong>
      <br>
      Click on the marker to choose the next country you want to conquer and complete the multiple choice quiz.
      Players take turns and accumulate points throughout the game based on answering the quiz correctly.</p></div>
      `);
      $(".rules").hide();
  }

});
