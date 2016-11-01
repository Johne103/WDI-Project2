$(() =>{

  let $main = $('main');
  let $avatars = getAvatars();


  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $main.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteUser);
  $main.on('click', 'button.edit', getAvatars);
  $('.logout').on('click', logout);

  $main.on('click', '.avatar', function() {
    console.log(this);
    let avatarID = $(this).data('id');
    let input = $main.find('#characterId');
    input.val(avatarID);
  });

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if(isLoggedIn()) {
    // showProfileForm();
    console.log("logged in!");
  } else {
    showLoginForm();
  }


  // SHOW PROFILE FORM
  function showProfileForm(profiles) {
    profiles.data.forEach((profile) => {

    });
    console.log($avatars[0]);
    return $avatars;
  }

  function getAvatars() {
    const characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'cyclops', 'Iron Man', 'Star-Lord (Peter Quill)', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];
    let $avatars = $('<div class="avatarSelection"></div>');

    for(let i = 0; i<characters.length; i++){
      $.ajax({
        url: "/api/profile/"+ characters[i],
        method: "GET"
      })
      .done(function(profile){
        let obj = profile.data[0]
        $avatars.append(`
          <div class="col-md-2 avatar" data-id="${obj.id}">
            <img class="card-img-top" src="${obj.thumbnail.path + '.' + obj.thumbnail.extension}" width="100" alt="profile image">
            <h4 class="card-title">${obj.name}</h4>
          </div>
        `);
      })
      .fail(function(jqXHR){
        console.log(jqXHR.status);
        $main.html(`You are a failure.`);
      });
    }
    return $avatars;
  }

  function showRegisterForm() {
    if(event) event.preventDefault();
    $main.html(`
      <h2>Register</h2>
      <form method="post" action="/api/user/register">
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
        <input type="hidden" name="characterId" id="characterId" value="" />
        <button class="btn btn-primary">Register</button>
      </form>
    `);
    // $main.on(eventName, '.avatarHolder', function() {});
    $main.find('.avatarHolder').append($avatars);
  }















  function showLoginForm() {
    if(event) event.preventDefault();
    $main.html(`
      <h2>Login</h2>
      <form method="post" action="/api/user/login">
        <div class="form-group">
          <input class="form-control" name="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="password" placeholder="Password">
        </div>
        <button class="btn btn-primary">Register</button>
      </form>
    `);
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
    }).done((data) => {
      if(data.token) localStorage.setItem('token', data.token);
      //showProfileForm();
      $main.html('');
    }).fail(showLoginForm);
  }



// DELETE
  function deleteUser() {
    let id = $(this).data('id');
    let token = localStorage.getItem('token');

    $.ajax({
      url: `/api/users/${id}`,
      method: "DELETE",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    })
    .done(getAvatarss)
    .fail(showLoginForm);
  }


// LOGOUT
  function logout() {
    if(event) event.preventDefault();
    localStorage.removeItem('token');
    showLoginForm();
  }

  let $mapDiv = $('#map');

  let map = new  google.maps.Map($mapDiv[0], {

    center: { lat:0, lng: 0},
    zoom: 2
  });

  map.setOptions({ maxZoom: 5});

  let currentWindow = null;

  for (let countryCode in countries){
    var country = countries[countryCode];

    let latLng = { lat: country.latlng[0], lng: country.latlng[1] };

    let marker = new google.maps.Marker({
      map: map,
      position: latLng
    });

    let countryDetails = `
      <div id='content'>
        <h1>`+ country.name + `</h1>
        <div id='countryInfo'>
            <ul>
              <li>Power: `+ country.power +`</li>
              <li>Number of questions: `+ country.questions.length +`</li>
              <button>Conquer</button>
            </ul>
        </div>
      </div>
      `;

    let infoWindow = new google.maps.InfoWindow({
      content: countryDetails,
      position: latLng
    });


    marker.addListener('click', function() {
      if (currentWindow !== null) {
        currentWindow.close();
      }
      infoWindow.open(map, marker);
      currentWindow = infoWindow;
    });

  }


});
