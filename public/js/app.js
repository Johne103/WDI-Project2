'use strict';

$(function () {

  var $main = $('main');

  //
  // let $userProfile = $('.userProfile');

  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $main.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteUser);
  $main.on('click', 'button.edit', getUser);
  // $('.usersIndex').on('click', getUsers);
  $('.logout').on('click', logout);

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if (isLoggedIn()) {
    showProfile();
    console.log("logged in!");
  } else {
    showLoginForm();
  }

  function showRegisterForm() {
    if (event) event.preventDefault();
    $main.html('\n      <h2>Register</h2>\n      <form method="post" action="/api/user/register">\n        <div class="form-group">\n          <input class="form-control" name="username" placeholder="Username">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">\n        </div>\n        <button class="btn btn-primary">Register</button>\n      </form>\n    ');
  }

  function showLoginForm() {
    if (event) event.preventDefault();
    $main.html('\n      <h2>Login</h2>\n      <form method="post" action="/api/user/login">\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <button class="btn btn-primary">Register</button>\n      </form>\n    ');
  }

  function showEditForm(user) {
    if (event) event.preventDefault();
    $main.html('\n      <h2>Edit User</h2>\n      <form method="put" action="/api/user/' + user._id + '">\n        <div class="form-group">\n          <input class="form-control" name="username" placeholder="Username" value="' + user.username + '">\n        </div>\n        <button class="btn btn-primary">Update</button>\n      </form>\n    ');
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
      // getUsers();
      showProfile();
    }).fail(showLoginForm);
  }

  function showProfile(user) {
    if (event) event.preventDefault();
    $main.html('\n      <div class="userProfile">\n        <img src=\'#\'>\n        <form method="#" action"#>\n          <button class="startGame">Play</button>\n        </form>\n      </div>\n      ');
  }

  function showUsers(users) {
    var $row = $('<div class="row"></div>');
    users.forEach(function (user) {
      $row.append('\n        <div class="col-md-4">\n          <div class="card">\n            <img class="card-img-top" src="http://fillmurray.com/300/300" alt="Card image cap">\n            <div class="card-block">\n              <h4 class="card-title">' + user.username + '</h4>\n            </div>\n          </div>\n          <button class="btn btn-danger delete" data-id="' + user._id + '">Delete</button>\n          <button class="btn btn-primary edit" data-id="' + user._id + '">Edit</button>\n        </div>\n      ');
    });

    $main.html($row);
  }

  function deleteUser() {
    var id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
      url: '/api/users/' + id,
      method: "DELETE",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(getUsers).fail(showLoginForm);
  }

  function getUser() {
    var id = $(this).data('id');
    var token = localStorage.getItem('token');

    $.ajax({
      url: '/api/users/' + id,
      method: "GET",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(showEditForm).fail(showLoginForm);
  }

  function logout() {
    if (event) event.preventDefault();
    localStorage.removeItem('token');
    showLoginForm();
  }

  var $mapDiv = $('#map');

  var map = new google.maps.Map($mapDiv[0], {
<<<<<<< HEAD
    center: { lat: 51, lng: -0.1 },
    zoom: 14,
    scrollwheel: false
=======
    center: { lat: 0, lng: 0 },
    zoom: 2
>>>>>>> development
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

    var countryDetails = '\n      <div id=\'content\'>\n        <h1>' + country.name + '</h1>\n        <div id=\'countryInfo\'>\n            <ul>\n              <li>Power</li>\n              <li>Number of questions</li>\n              <button>Conquer</button>\n            </ul>\n        </div>\n      </div>\n      ';

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

  // addInfoWindowForCountry = function() {
  //   let countryContent = `
  //     <div id='content'>
  //       <h1></h1>
  //       <div id='countryInfo'>
  //           <ul>
  //             <li>Power<li>
  //             <li>Number of questions<li>
  //             <button>Conquer</button>
  //             <button>Back to Map</button>
  //           </ul>
  //       </div>
  //     </div>
  //     `;
  //
  //   let infoWindow = new google.maps.InfoWindow({
  //     content: countryContent,
  //     position: { lat: country.latlng[0], lng: country.latlng[1] }
  //   });
  //
  //   marker.addListener('click', function() {
  //     console.log("CLECK!");
  //     infoWindow.open(map, marker);
  //   });
  // };
});