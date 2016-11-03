"use strict";

var gv = {
  main: {},
  turnInfo: {
    turn: 1, // 1 = player 1, 2 = player 2
    currentIcon: {}
  },
  players: {
    player1: {
      avatar: ""
    },
    player2: {
      avatar: "http://i.annihil.us/u/prod/marvel/i/mg/3/60/53176bb096d17.jpg"
    }
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

var map = void 0;
var fnc_removeListener = void 0;
var currentCountryListener = void 0;
var infoWindow = null;

function changeIcon(ci) {
  console.log(ci);
  ci.setIcon({
    url: gv.players['player' + gv.turnInfo.turn].avatar, // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  });
}

$(function () {

  var $main = $('main');
  $main.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteUser);
  $main.on('click', 'button.edit', getAvatars);

  var $registerButton = $('.register');
  $registerButton.on('click', showRegisterForm);

  var $login = $('.login');
  $login.on('click', showLoginForm);

  var $logoutbutton = $('.logout');
  $logoutbutton.hide();
  $logoutbutton.on('click', logout);

  $main.on('click', '.avatar', function () {
    console.log(this);
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    var avatarID = $(this).data('id');
    var input = $main.find('#characterId');
    input.val(avatarID);
  });

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if (isLoggedIn()) {
    // showProfileForm();
    console.log("logged in!");
  } else {
    showLoginForm();
  }

  function getAvatars() {
    // const characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'deadpool', 'Iron Man', 'Star-Lord (Peter Quill)', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];
    var characters = ['hulk', 'wolverine', 'deadpool', 'Apocalypse'];
    var $avatars = $('<div class="avatarSelection"><h3>Choose your avatar</h3></div>');

    for (var i = 0; i < characters.length; i++) {
      $.ajax({
        url: "/api/profile/" + characters[i],
        method: "GET"
      }).done(function (profile) {
        var obj = profile.data[0];
        $avatars.append("\n          <div class=\"avatar\" data-id=\"" + obj.id + "\">\n            <img src=\"" + (obj.thumbnail.path + '.' + obj.thumbnail.extension) + "\" alt=\"profile image\">\n              <div class=\"overlay\">\n                <h4>" + obj.name + "</h4>\n              </div>\n          </div>\n        ");
      }).fail(function (jqXHR) {
        console.log(jqXHR.status);
        $main.html("You are a failure.");
      });
    }
    return $avatars;
  }

  function showRegisterForm() {
    var $avatars = getAvatars();
    if (event) event.preventDefault();
    $main.html("\n      <h2>Register</h2>\n      <form method=\"post\" action=\"/api/user/register\">\n        <div class=\"form-group\">\n          <input class=\"form-control\" name=\"username\" placeholder=\"Username\">\n        </div>\n        <div class=\"form-group\">\n          <input class=\"form-control\" name=\"email\" placeholder=\"Email\">\n        </div>\n        <div class=\"form-group\">\n          <input class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\">\n        </div>\n        <div class=\"form-group\">\n          <input class=\"form-control\" type=\"password\" name=\"passwordConfirmation\" placeholder=\"Password Confirmation\">\n        </div>\n        <div class=\"avatarHolder\"></div>\n        <input type=\"hidden\" name=\"characterId\" id=\"characterId\" value=\"\" />\n        <button class=\"btn btn-primary\">Register</button>\n      </form>\n    ");
    // $main.on(eventName, '.avatarHolder', function() {});
    $main.find('.avatarHolder').append($avatars);
  }

  function handleForm() {
    if (event) event.preventDefault();
    var token = localStorage.getItem('token');
    var $form = $(this);

    var url = $form.attr('action');
    var method = $form.attr('method');
    var data = $form.serialize();

    $.ajax({
      url: url,
      method: method,
      data: data,
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', "Bearer " + token);
      }
    }).done(function (data) {
      if (data.token) localStorage.setItem('token', data.token);
      showPlayerProfiles(data.user.characterId, data.user.username);
      startGame();
      $registerButton.hide();
      $login.hide();
      $logoutbutton.show();
    }).fail(showLoginForm);
  }

  function showPlayerProfiles(id, user) {
    $.ajax({
      url: "/api/profile/show/" + id,
      method: 'GET'
    }).done(function (profile) {
      var obj = profile.data[0];
      $main.parent().css('width', '25%');
      gv.players.player1.avatar = obj.thumbnail.path + '.' + obj.thumbnail.extension;
      $main.html("\n        <div class=\"profileHolder\">\n          <div class=\"profileImage\">\n            <img src=\"" + gv.players.player1.avatar + "\" >\n          </div>\n          <h3>" + user + "</h3>\n          <p>" + obj.description + "</p>\n        </div>\n        ");
      // showPlayers(data);
    }).fail(showLoginForm);
  }

  function showLoginForm() {
    if (event) event.preventDefault();
    $main.html("\n      <h2>Login</h2>\n      <form method=\"post\" action=\"/api/user/login\">\n        <div class=\"form-group\">\n          <input class=\"form-control\" name=\"email\" placeholder=\"Email\">\n        </div>\n        <div class=\"form-group\">\n          <input class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\">\n        </div>\n        <button class=\"btn btn-primary\">Register</button>\n      </form>\n    ");
  }

  // function showEditForm(user) {
  //   if(event) event.preventDefault();
  //   $main.html(`
  //     <h2>Edit User</h2>
  //     <form method="put" action="/api/user/${user._id}">
  //       <div class="form-group">
  //         <input class="form-control" name="username" placeholder="Username" value="${user.username}">
  //       </div>
  //       <button class="btn btn-primary">Update</button>
  //     </form>
  //   `);
  // }


  // DELETE
  function deleteUser() {
    var id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
      url: "/api/users/" + id,
      method: "DELETE",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', "Bearer " + token);
      }
    }).done(getAvatars).fail(showLoginForm);
  }

  // LOGOUT
  function logout() {
    if (event) event.preventDefault();
    localStorage.removeItem('token');
    showLoginForm();

    $registerButton.show();
    $login.show();
    $logoutbutton.hide();
  }

  var $mapDiv = $('#map');

  map = new google.maps.Map($mapDiv[0], {

    center: { lat: 0, lng: 0 },
    zoom: 2,
    styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]

  });

  map.setOptions({ maxZoom: 7 });

  function startGame() {
    var currentWindow = null;

    var _loop = function _loop(countryCode) {

      var country = countries[countryCode];
      var latLng = { lat: country.latlng[0], lng: country.latlng[1] };
      var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        icon: "images/grayMarker.png"

      });

      marker.metadata = { type: "country", id: country.name };

      var countryDetails = "\n        <div id='content'>\n          <h1>" + country.name + "</h1>\n          <div id='countryInfo'>\n              <ul>\n                <li>Power to be gained per question</li>\n                <li class=\"countryPower\">" + country.power + ("</li>\n                <button class=\"conquer\" data-country=\"" + countryCode + "\">Conquer?</button>\n              </ul>\n          </div>\n        </div>\n        ");

      var eventlistener = marker.addListener('click', function () {

        infoWindow = new google.maps.InfoWindow({
          content: countryDetails,
          position: latLng
        });
        $('.cPower').html("" + country.power);
        gv.turnInfo.currentIcon = this; // set global to variable.


        if (currentWindow !== null) {
          currentWindow.close();
        }
        infoWindow.open(map, marker);
        currentWindow = infoWindow;
      });
    };

    for (var countryCode in countries) {
      _loop(countryCode);
    }
  }
  $('#rulesLink').on("click", showRules);

  function showRules() {
    console.log("SHOW RULES...");
    $main.html("\n      <div class=\"rulesContent\"><p>\n\n  <strong>Object:</strong>\n  <br>score the most points to win the game. <br>\n\n  <strong>Setup:</strong>\n  <br>\n  choose a player from the list . choose a country as your headquarters. you have 20 turns and 10 points to start. countries have different values based on power structures.\n<br>\n  <strong>Playing the game:</strong>\n<br>\n  click on the marker to choose the next country you want to conquer and complete the multiple choice quiz.\n  players take turns and accumulate points throughout the game based on answering the quiz correctly.\n\n  after comparing the scores between players, a winner is annouced.</p></div>\n    ");
  }
});