'use strict';

$(function () {

  var $main = $('main');
  var $avatars = getAvatars();

  // let $userProfile = $('.userProfile');

  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $main.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteUser);
  $main.on('click', 'button.edit', getAvatars);
  // $('.usersIndex').on('click', getAvatarss);
  $('.logout').on('click', logout);

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
    var characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'cyclops', 'Iron Man', 'Star-Lord (Peter Quill)', 'Blacklash', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];
    var $avatars = $('<div class="avatarSelection"></div>');

    for (var i = 0; i < characters.length; i++) {
      $.ajax({
        url: "/api/profile/" + characters[i],
        method: "GET"
      }).done(function (profile) {
        var obj = profile.data[0];
        $avatars.append('\n          <div class="col-md-4" data-id="' + obj.id + '">\n            <img class="card-img-top" src="' + (obj.thumbnail.path + '.' + obj.thumbnail.extension) + '" width="100" alt="profile image">\n            <h4 class="card-title">' + obj.name + '</h4>\n          </div>\n        ');
      }).fail(function (jqXHR) {
        console.log(jqXHR.status);
        $main.html('You are a failure.');
      });
    }
    return $avatars;
  }

  function showRegisterForm() {
    if (event) event.preventDefault();
    $main.html('\n      <h2>Register</h2>\n      <form method="post" action="/api/user/register">\n        <div class="form-group">\n          <input class="form-control" name="username" placeholder="Username">\n        </div>\n        <div class="form-group">\n          <input class="form-control" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">\n        </div>\n        <div class="avatarHolder"></div>\n        <input type="hidden" name="avatar" id="avatar" value="" />\n        <button class="btn btn-primary">Register</button>\n      </form>\n    ');
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
      // getAvatarss();
      showProfileForm();
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
    center: { lat: 51, lng: -0.1 },
    zoom: 14
  });

  for (var countryCode in countries) {
    var country = countries[countryCode];

    var marker = new google.maps.Marker({
      map: map,
      position: { lat: country.latlng[0], lng: country.latlng[1] }
    });
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