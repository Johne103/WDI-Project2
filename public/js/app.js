'use strict';

$(function () {

  var $main = $('main');
  var $avatars = getAvatars();

  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $main.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteUser);
  $main.on('click', 'button.edit', getAvatars);
  $('.logout').on('click', logout);

  $main.on('click', '.avatar', function () {
    console.log(this);
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

  // SHOW PROFILE FORM
  function showProfileForm(profiles) {
    profiles.data.forEach(function (profile) {});
    console.log($avatars[0]);
    return $avatars;
  }

  function getAvatars() {
    var characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'cyclops', 'Iron Man', 'Star-Lord (Peter Quill)', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];
    var $avatars = $('<div class="avatarSelection"></div>');

    for (var i = 0; i < characters.length; i++) {
      $.ajax({
        url: "/api/profile/" + characters[i],
        method: "GET"
      }).done(function (profile) {
        var obj = profile.data[0];
        $avatars.append('\n          <div class="col-md-2 avatar" data-id="' + obj.id + '">\n            <img class="card-img-top" src="' + (obj.thumbnail.path + '.' + obj.thumbnail.extension) + '" width="100" alt="profile image">\n            <h4 class="card-title">' + obj.name + '</h4>\n          </div>\n        ');
      }).fail(function (jqXHR) {
        console.log(jqXHR.status);
        $main.html('You are a failure.');
      });
    }
    return $avatars;
  }

  function showRegisterForm() {
    if (event) event.preventDefault();
    $main.html('\n      <h2>Register</h2>\n      <form method="post" action="/api/user/register">\n        <div class="form-group">\n          <input class="form-control" name="username" placeholder="Username">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">\n        </div>\n        <div class="avatarHolder"></div>\n        <input type="hidden" name="characterId" id="characterId" value="" />\n        <button class="btn btn-primary">Register</button>\n      </form>\n    ');
    // $main.on(eventName, '.avatarHolder', function() {});
    $main.find('.avatarHolder').append($avatars);
  }

  function showLoginForm() {
    if (event) event.preventDefault();
    $main.html('\n      <h2>Login</h2>\n      <form method="post" action="/api/user/login">\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <button class="btn btn-primary">Register</button>\n      </form>\n    ');
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
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (data) {
      if (data.token) localStorage.setItem('token', data.token);
      //showProfileForm();
      $main.html('');
    }).fail(showLoginForm);
  }

  // DELETE
  function deleteUser() {
    var id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
      url: '/api/users/' + id,
      method: "DELETE",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(getAvatarss).fail(showLoginForm);
  }

  // LOGOUT
  function logout() {
    if (event) event.preventDefault();
    localStorage.removeItem('token');
    showLoginForm();
  }

  var $mapDiv = $('#map');

  var map = new google.maps.Map($mapDiv[0], {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
  });

  var currentWindow = null;

  var _loop = function _loop(countryCode) {
    country = countries[countryCode];


    var latLng = { lat: country.latlng[0], lng: country.latlng[1] };

    var marker = new google.maps.Marker({
      map: map,
      position: latLng,
      icon: '/images/grayMarker.png'
    });

    var countryDetails = '\n      <div id=\'content\'>\n        <h1>' + country.name + '</h1>\n        <div id=\'countryInfo\'>\n            <ul>\n\n              <li>Power: ' + country.power + '</li>\n              <li>Number of questions: ' + country.questions.length + ('</li>\n              <button class="conquer" data-country="' + countryCode + '">Conquer</button>\n            </ul>\n        </div>\n      </div>\n      ');

    var infoWindow = new google.maps.InfoWindow({
      content: countryDetails,
      position: latLng
    });

    marker.addListener('click', function () {
      if (currentWindow !== null) {
        currentWindow.close();
      }
      infoWindow.open(map, marker);
      currentWindow = infoWindow;
    });
  };

  for (var countryCode in countries) {
    var country;

    _loop(countryCode);
  }
});