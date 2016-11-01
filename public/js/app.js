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
    var characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'deadpool', 'Iron Man', 'Star-Lord (Peter Quill)', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];

    var $avatars = $('<div class="avatarSelection"><h3>Choose your avatar</h3></div>');

    for (var i = 0; i < characters.length; i++) {
      $.ajax({
        url: "/api/profile/" + characters[i],
        method: "GET"
      }).done(function (profile) {
        var obj = profile.data[0];
        $avatars.append('\n          <div class="avatar" data-id="' + obj.id + '">\n            <img src="' + (obj.thumbnail.path + '.' + obj.thumbnail.extension) + '" alt="profile image">\n              <div class="overlay">\n                <h4>' + obj.name + '</h4>\n              </div>\n          </div>\n        ');
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
      console.log(data.user);
      showPlayerProfiles(data.user.characterId, data.user.username);
    }).fail(showLoginForm);
  }

  function showPlayerProfiles(id, user) {
    $.ajax({
      url: "/api/profile/show/" + id,
      method: 'GET'
    }).done(function (profile) {
      var obj = profile.data[0];
      $main.parent().css('width', '25%');
      $main.html('\n        <div class="profileHolder">\n          <div class="profileImage">\n            <img src="' + (obj.thumbnail.path + '.' + obj.thumbnail.extension) + '" >\n          </div>\n          <h3>' + user + '</h3>\n          <p>' + obj.description + '</p>\n        </div>\n        ');
      // showPlayers(data);
    }).fail(showLoginForm);
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
    zoom: 2
  });

  map.setOptions({ maxZoom: 5 });

  var currentWindow = null;

  var _loop = function _loop(countryCode) {
    country = countries[countryCode];


    var latLng = { lat: country.latlng[0], lng: country.latlng[1] };

    var marker = new google.maps.Marker({
      map: map,
      position: latLng
    });

    var countryDetails = '\n      <div id=\'content\'>\n        <h1>' + country.name + '</h1>\n        <div id=\'countryInfo\'>\n            <ul>\n              <li>Power: ' + country.power + '</li>\n              <li>Number of questions</li>\n              <button>Conquer</button>\n            </ul>\n        </div>\n      </div>\n      ';

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