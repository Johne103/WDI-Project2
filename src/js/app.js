let map;
let currentIcon;
let player1_avatar;
let fnc_removeListener;
let infoWindow;
let currentWindow = null;

function changeIcon(ci) {
  console.log(ci);
  ci.setIcon({
      url: player1_avatar, // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  });
}


$(() =>{

  let $main = $('main');



  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $main.on('submit', 'form', handleForm);
  $main.on('click', 'button.delete', deleteUser);
  $main.on('click', 'button.edit', getAvatars);
  $('.logout').on('click', logout);



  $main.on('click', '.avatar', function() {
    console.log(this);
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
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

  function displayAvatar(profile){
    let obj = profile.data[0];
    $avatars.append(`
      <div class="avatar" data-id="${obj.id}">
        <img src="${obj.thumbnail.path + '.' + obj.thumbnail.extension}" alt="profile image">
          <div class="overlay">
            <h4>${obj.name}</h4>
          </div>
      </div>
    `);
  }

  function handleErrors(jqXHR){
    console.log(jqXHR.status);
    $main.html(`You are a failure.`);
  }

  function getAvatars() {
    // const characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'deadpool', 'Iron Man', 'Star-Lord (Peter Quill)', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];
    const characters = ['hulk', 'wolverine', 'deadpool', 'Apocalypse'];
    let $avatars = $('<div class="avatarSelection"><h3>Choose your avatar</h3></div>');

    for(let i = 0; i<characters.length; i++){
      $.ajax({
        url: "/api/profile/"+ characters[i],
        method: "GET"
      })
      .done(displayAvatar)
      .fail(handleErrors);
    }
    return $avatars;
  }

  function showRegisterForm() {
    let $avatars = getAvatars();
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
      showPlayerProfiles(data.user.characterId, data.user.username);
      startGame();
    })
    .fail(showLoginForm);
  }

  function showPlayerProfiles(id, user){
    $.ajax({
      url: "/api/profile/show/"+ id,
      method: 'GET'
    }).done((profile) => {
      let obj = profile.data[0];
      $main.parent().css('width', '25%');
      player1_avatar = obj.thumbnail.path + '.' + obj.thumbnail.extension;
      $main.html(`
        <div class="profileHolder">
          <div class="profileImage">
            <img src="${player1_avatar}" >
          </div>
          <h3>${user}</h3>
          <p>${obj.description}</p>
        </div>
        `);
      // showPlayers(data);
    }).fail(showLoginForm);
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
    .done(getAvatars)
    .fail(showLoginForm);
  }


// LOGOUT
  function logout() {
    if(event) event.preventDefault();
    localStorage.removeItem('token');
    showLoginForm();
  }

  let $mapDiv = $('#map');

   map = new  google.maps.Map($mapDiv[0], {

    center: { lat:0, lng: 0},
    zoom: 2,
    
    styles:[{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}]
  });

  map.setOptions({ maxZoom: 7});

  function startGame() {
    for (let countryCode in countries){

      var country = countries[countryCode];
      let latLng = { lat: country.latlng[0], lng: country.latlng[1] };
      // let icon = {
      //     url: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf.jpg", // url
      //     scaledSize: new google.maps.Size(40, 40), // scaled size
      //     origin: new google.maps.Point(0,0), // origin
      //     anchor: new google.maps.Point(0, 0) // anchor
      // };
      let marker = new google.maps.Marker({
        map: map,
        position: latLng,
        icon: "/images/grayMarker.png"

      });

      marker.metadata = {type: "country", id: country.name};

      let countryDetails = `
        <div id='content'>
          <h1>`+ country.name + `</h1>
          <div id='countryInfo'>
              <ul>
                <li>Power</li>
                <li class="countryPower">`+ country.power +`</li>
                <li>Number of questions</li>
                <li>`+ country.questions.length +`</li>
                <button class="conquer" data-country="${countryCode}">Conquer</button>
              </ul>
          </div>
        </div>
        `;

      infoWindow = new google.maps.InfoWindow({
        content: countryDetails,
        position: latLng
      });

      marker.addListener('click', function() {

        currentIcon = this; // set global to variable.

        if (currentWindow !== null) {
          currentWindow.close();
        }
        infoWindow.open(map, marker);
        currentWindow = infoWindow;
        // fnc_removeListener = clearClick(this, marker);
      });

    }
  }

  // function clearClick(ci, marker) {
  //   marker.removeListener();
  // }
  $('#rulesLink').on("click", showRules);

  function showRules () {
    console.log("SHOW RULES...");
    $main.html(`
      <div class="rulesContent"><p>

  <strong>Object:</strong>
  <br>score the most points to win the game. <br>

  <strong>Setup:</strong>
  <br>
  choose a player from the list . choose a country as your headquarters. you have 20 turns and 10 points to start. countries have different values based on power structures.
<br>
  <strong>Playing the game:</strong>
<br>
  click on the marker to choose the next country you want to conquer and complete the multiple choice quiz.
  players take turns and accumulate points throughout the game based on answering the quiz correctly.

  after comparing the scores between players, a winner is annouced.</p></div>
    `);
  }
});
