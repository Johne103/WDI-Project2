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

  // function getUsers() {
  //   if(event) event.preventDefault();
  //
  //   let token = localStorage.getItem('token');
  //   $.ajax({
  //     url: '/api/users',
  //     method: "GET",
  //     beforeSend: function(jqXHR) {
  //       if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
  //     }
  //   })
  //   .done(showUsers)
  //   .fail(showLoginForm);
  // }

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
    center: { lat: 0, lng: 0 },
    zoom: 2
  });

  map.setOptions({ maxZoom: 5 });

  var _loop = function _loop(countryCode) {
    country = countries[countryCode];
    marker = new google.maps.Marker({
      map: map,
      position: { lat: country.latlng[0], lng: country.latlng[1] }
    });


    var countryContent = '\n      <div id=\'content\'>\n        <h1></h1>\n        <div id=\'countryInfo\'>\n            <ul>\n              <li>Power<li>\n              <li>Number of questions<li>\n              <button>Conquer</button>\n              <button>Back to Map</button>\n            </ul>\n        </div>\n      </div>\n      ';

    var infoWindow = new google.maps.InfoWindow({
      content: countryContent
    });

    marker.addListener('click', function () {
      console.log("CLECK!");
      infoWindow.open(map, marker);
    });
  };

  for (var countryCode in countries) {
    var country;
    var marker;

    _loop(countryCode);
  }

  //
  // let geocoder = new google.maps.Geocoder();
  //
  // function getCountry(country) {
  //   console.log("getCountry");
  //     geocoder.geocode( { 'address': country }, function(results, status) {
  //       console.log(results, status);
  //         if (status == google.maps.GeocoderStatus.OK) {
  //            map.setCenter(results[0].geometry.location);
  //            var marker = new google.maps.Marker({
  //                map: map,
  //                position: results[0].geometry.location
  //            });
  //         } else {
  //           alert("Geocode was not successful for the following reason: " + status);
  //         }
  //     });
  // }
  //
  // getCountry('USA');
  // getCountry('Brazil');
  // getCountry('Denmark');


  // Flow:
  // Add eventlistener to map object (http://www.geocodezip.com/v3_example_click2add_infowindow.html)
  // On click, geocode lat lng using google geocoder api
  // Parse response to extract country shortname
  // Lookup countries object (`require`d) for country info... i.e. countries['AT'] for Austria
  // Create marker at countries['AT'].laglng (i.e. the Representative point for that country)
  // You can modify the convert.js script to incoprorate questions and answers for each country,
  // if you can find a source for them.

  // navigator.geolocation.getCurrentPosition((position) => {
  //   let latLng = {
  //     lat: position.coords.latitude,
  //     lng: position.coords.longitude
  //   };
  //
  // map.panTo(latLng);
  // map.setZoom(20);
  //
  // let marker = new google.maps.Marker({
  //   position:latLng,
  //   animation:google.maps.Animation.DROP,
  //   draggable:true,
  //   map
  // });
  // });
});