"use strict";

var gv = {
  main: {},
  turnInfo: {
    currentIcon: {}
  },
  players: {
    player1: {
      avatar: ""
    },
    player2: {
      avatar: ""
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
var infoWindow = void 0;
var currentWindow = null;
var currentCountryListener = void 0;

function changeIcon(ci) {
  console.log(ci);
  ci.setIcon({
    url: gv.players.player1.avatar, // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
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

  function displayAvatar(profile) {
    var obj = profile.data[0];
    $avatars.append("\n      <div class=\"avatar\" data-id=\"" + obj.id + "\">\n        <img src=\"" + (obj.thumbnail.path + '.' + obj.thumbnail.extension) + "\" alt=\"profile image\">\n          <div class=\"overlay\">\n            <h4>" + obj.name + "</h4>\n          </div>\n      </div>\n    ");
  }

  function handleErrors(jqXHR) {
    console.log(jqXHR.status);
    $main.html("You are a failure.");
  }

  function getAvatars() {
    // const characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'deadpool', 'Iron Man', 'Star-Lord (Peter Quill)', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];
    var characters = ['hulk', 'wolverine', 'deadpool', 'Apocalypse'];
    var $avatars = $('<div class="avatarSelection"><h3>Choose your avatar</h3></div>');

    for (var i = 0; i < characters.length; i++) {
      $.ajax({
        url: "/api/profile/" + characters[i],
        method: "GET"
      }).done(displayAvatar).fail(handleErrors);
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

    styles: [{ "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "hue": "#2c2e33" }, { "saturation": 7 }, { "lightness": 19 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": -2 }, { "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -90 }, { "lightness": -8 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": 10 }, { "lightness": 69 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -78 }, { "lightness": 67 }, { "visibility": "simplified" }] }]
  });

  map.setOptions({ maxZoom: 7 });

  function startGame() {
    var _loop = function _loop(countryCode) {

      var country = countries[countryCode];
      var latLng = { lat: country.latlng[0], lng: country.latlng[1] };
      // let icon = {
      //     url: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf.jpg", // url
      //     scaledSize: new google.maps.Size(40, 40), // scaled size
      //     origin: new google.maps.Point(0,0), // origin
      //     anchor: new google.maps.Point(0, 0) // anchor
      // };
      var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        icon: "/images/grayMarker.png"

      });

      marker.metadata = { type: "country", id: country.name };

      var countryDetails = "\n        <div id='content'>\n          <h1>" + country.name + "</h1>\n          <div id='countryInfo'>\n              <ul>\n                <li>Power</li>\n                <li class=\"countryPower\">" + country.power + "</li>\n                <li>Number of questions</li>\n                <li>" + country.questions.length + ("</li>\n                <button class=\"conquer\" data-country=\"" + countryCode + "\">Conquer</button>\n              </ul>\n          </div>\n        </div>\n        ");

      infoWindow = new google.maps.InfoWindow({
        content: countryDetails,
        position: latLng
      });

      var eventlistener = marker.addListener('click', function () {

        gv.turnInfo.currentIcon = this; // set global to variable.


        if (currentWindow !== null) {
          currentWindow.close();
        }
        infoWindow.open(map, marker);
        currentWindow = infoWindow;
        // fnc_removeListener = clearClick(this, marker);
      });
    };

    for (var countryCode in countries) {
      _loop(countryCode);
    }
  }

  // function clearClick(ci, marker) {
  //   marker.removeListener();
  // }
  $('#rulesLink').on("click", showRules);

  function showRules() {
    console.log("SHOW RULES...");
    $main.html("\n      <div class=\"rulesContent\"><p>\n\n  <strong>Object:</strong>\n  <br>score the most points to win the game. <br>\n\n  <strong>Setup:</strong>\n  <br>\n  choose a player from the list . choose a country as your headquarters. you have 20 turns and 10 points to start. countries have different values based on power structures.\n<br>\n  <strong>Playing the game:</strong>\n<br>\n  click on the marker to choose the next country you want to conquer and complete the multiple choice quiz.\n  players take turns and accumulate points throughout the game based on answering the quiz correctly.\n\n  after comparing the scores between players, a winner is annouced.</p></div>\n    ");
  }
});