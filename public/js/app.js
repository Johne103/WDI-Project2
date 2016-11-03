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
  },
  heroes: {
    "wolverine": "rgba(55,174,182,1)",
    "deadpool": "rgba(55,174,182,1)",
    "hulk": "rgba(64,38,85,1)",
    "magneto": "rgba(64,38,85,1)",
    "apocalypse": "rgba(193,97,21,1)",
    "venom": "rgba(191,157,24,1)",
    "elektra": "rgba(191,157,24,1)",
    "spider-man": "rgba(191,157,24,1)",
    "loki": "rgba(139,139,139,1)",
    "doctor octopus": "rgba(194,94,19,1)",
    "star-lord": "rgba(140,37,22,1)",
    "doctor doom": "rgba(40,107,152,1)"
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
var $main = null;
var $main2 = null;

var markers = [];
var rulesShowing = false;

function clearMarkers() {
  markers.forEach(function (marker) {
    marker.setMap(null);
  });

  markers = [];
}

function startGame() {
  if (event) event.preventDefault();
  $(this).remove();
  $('#showPlayerTurn').show();
  var currentWindow = null;
  $('#gameLogo').hide();
  clearMarkers();
  $main2.parent().css("opacity", "0.7");

  var _loop = function _loop(countryCode) {

    var country = countries[countryCode];
    var latLng = { lat: country.latlng[0], lng: country.latlng[1] };
    var marker = new google.maps.Marker({
      map: map,
      position: latLng,
      icon: "images/grayMarker.png"

    });

    marker.metadata = { type: "country", id: country.name };

    markers.push(marker);

    var countryDetails = "\n      <div id='content' >\n        <h1>" + country.name + "</h1>\n        <div id='countryInfo'>\n            <ul>\n              <li>Power to be gained per question</li>\n              <li class=\"countryPower\">" + country.power + ("</li>\n              <button class=\"conquer\" data-country=\"" + countryCode + "\">Conquer?</button>\n            </ul>\n        </div>\n      </div>\n      ");

    var eventlistener = marker.addListener('click', function () {

      infoWindow = new google.maps.InfoWindow({
        content: countryDetails,
        position: new google.maps.LatLng(latLng.lat, latLng.lng)
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

  $main = $('#hud main');
  $main2 = $('#hud2 main');

  $main.on('submit', 'form', handleForm);
  $main.on('click', '.delete', deleteUser);
  $main.on('click', '.edit', getAvatars);

  $('html').on('click', '.startGame', startGame);

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
    var characters = ['hulk', 'wolverine', 'deadpool', 'Elektra', 'spider-man', 'gambit', 'iron man', 'rogue', 'Jean Grey', 'medusa', 'emma frost', 'sif', 'thor', 'captain america', 'groot', 'punisher'];
    var $avatars = $('<div class="avatarSelection"><h4>Choose your avatar</h4></div>');

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
    $main.html("\n      <form method=\"post\" action=\"/api/user/register\">\n        <div class=\"form-group\">\n          <input class=\"form-control\" name=\"username\" placeholder=\"Username\">\n        </div>\n        <div class=\"form-group\">\n          <input class=\"form-control\" name=\"email\" placeholder=\"Email\">\n        </div>\n        <div class=\"form-group\">\n          <input class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\">\n        </div>\n        <div class=\"form-group\">\n          <input class=\"form-control\" type=\"password\" name=\"passwordConfirmation\" placeholder=\"Password Confirmation\">\n        </div>\n        <div class=\"avatarHolder\"></div>\n        <input type=\"hidden\" name=\"characterId\" id=\"characterId\" value=\"\" />\n        <button class=\"btn btn-primary\">Register</button>\n      </form>\n    ");
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
      showPlayerProfiles(data.user.characterId, data.user.username, data.user._id);
      $registerButton.hide();
      $login.hide();
      $logoutbutton.show();
    }).fail(showLoginForm);
  }

  function showPlayerProfiles(id, user, userID) {
    $.ajax({
      url: "/api/profile/show/" + id,
      method: 'GET'
    }).done(function (profile) {
      var obj = profile.data[0];
      $main.parent().css({
        'width': '15%',
        'background-color': gv.heroes[obj.name.toLowerCase()]
      });
      gv.players.player1.avatar = obj.thumbnail.path + '.' + obj.thumbnail.extension;
      $main.html("\n        <div class=\"profileHolder\">\n          <div class=\"profileImage\">\n            <img src=\"" + gv.players.player1.avatar + "\" >\n          </div>\n          <h3>" + user + "</h3>\n          <p>" + obj.description + "</p>\n        </div>\n        ");
      $main.append("\n          <a class=\"nav-link edit\">Edit</a>\n          <a class=\"nav-link delete\" data-id=\"" + userID + "\">Delete</a>\n        ");
      $('html').append("\n          <a class=\"startGame\" href=\"#\">I WANT WAR</a>\n        ");
    }).fail(showLoginForm);

    var characters = ['apocalypse', 'Doctor Doom', 'doctor octopus', 'loki', 'magneto', 'Winter Soldier', 'thanos', 'ultron'];
    var rndNum = Math.floor(Math.random() * characters.length);
    var rndCharacter = characters[rndNum];
    console.log(rndNum, rndCharacter);
    // Player 2
    $.ajax({
      url: "/api/profile/" + rndCharacter,
      method: 'GET'
    }).done(function (profile) {
      var obj = profile.data[0];
      console.log(obj);
      gv.players.player2.avatar = obj.thumbnail.path + '.' + obj.thumbnail.extension;
      $main2.parent().css({
        'background-color': gv.heroes[obj.name.toLowerCase()]
      });
      $main2.html("\n        <div class=\"profileHolder\">\n          <div class=\"profileImage\">\n            <img src=\"" + gv.players.player2.avatar + "\" >\n          </div>\n          <h3>" + obj.name + "</h3>\n          <p>" + obj.description + "</p>\n        </div>\n        ");
    }).fail(showLoginForm);
  }

  function showLoginForm() {
    if (event) event.preventDefault();
    $main.html("\n      <form method=\"post\" action=\"/api/user/login\">\n        <div class=\"form-group\">\n          <input class=\"form-control\" name=\"email\" placeholder=\"Email\">\n        </div>\n        <div class=\"form-group\">\n          <input class=\"form-control\" type=\"password\" name=\"password\" placeholder=\"Password\">\n        </div>\n        <button class=\"btn btn-primary\">Login</button>\n      </form>\n    ");
  }

  // DELETE
  function deleteUser() {
    var id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
      url: "/api/user/" + id,
      method: "DELETE",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', "Bearer " + token);
      }
    }).done(logout).fail(showLoginForm);
  }

  // LOGOUT
  function logout() {
    if (event) event.preventDefault();
    localStorage.removeItem('token');
    showLoginForm();
    clearMarkers();
    $('#gameLogo').show();
    $registerButton.show();
    $login.show();
    $logoutbutton.hide();
  }

  var $mapDiv = $('#map');

  map = new google.maps.Map($mapDiv[0], {

    center: { lat: 0, lng: 0 },
    zoom: 2,
    styles: [{ "stylers": [{ "saturation": -100 }, { "gamma": 1 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.place_of_worship", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.place_of_worship", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "water", "stylers": [{ "visibility": "on" }, { "saturation": 50 }, { "gamma": 0 }, { "hue": "#50a5d1" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "color": "#333333" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "weight": 0.5 }, { "color": "#333333" }] }, { "featureType": "transit.station", "elementType": "labels.icon", "stylers": [{ "gamma": 1 }, { "saturation": 50 }] }] });

  map.setOptions({ maxZoom: 7 });

  $('#rulesLink').on("click", showRules);
  $main.on("click", '.exitRules', function () {
    $('.rulesContent').hide();
    $(".rules").show();
  });

  function showRules() {
    $main.html("\n      <div class=\"rulesContent\">\n      <button class=\"exitRules\" >x</button>\n      <p>\n      <strong class=\"rulesT\">Object:</strong>\n      <br>Score the most points to win the game. <br>\n      <strong class=\"rulesT\">Setup:</strong>\n      <br>Choose a player from the list and a country as your headquarters. You have 20 turns and 10 points to start. Countries have different values based on power structures.\n      <br>\n      <strong class=\"rulesT\">Playing the game:</strong>\n      <br>\n      Click on the marker to choose the next country you want to conquer and complete the multiple choice quiz.\n      Players take turns and accumulate points throughout the game based on answering the quiz correctly.\n      After comparing the scores, a winner is annouced.</p></div>\n      ");
    $(".rules").hide();
  }
});