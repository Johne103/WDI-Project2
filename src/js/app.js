let map;
let currentIcon;
let player1_avatar;
let fnc_removeListener;

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

  function getAvatars() {
    // const characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'deadpool', 'Iron Man', 'Star-Lord (Peter Quill)', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];
    const characters = ['hulk', 'wolverine', 'deadpool', 'Apocalypse'];
    let $avatars = $('<div class="avatarSelection"><h3>Choose your avatar</h3></div>');

    for(let i = 0; i<characters.length; i++){
      $.ajax({
        url: "/api/profile/"+ characters[i],
        method: "GET"
      })
      .done(function(profile){
        let obj = profile.data[0]
        $avatars.append(`
          <div class="avatar" data-id="${obj.id}">
            <img src="${obj.thumbnail.path + '.' + obj.thumbnail.extension}" alt="profile image">
              <div class="overlay">
                <h4>${obj.name}</h4>
              </div>
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
    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

  });

  map.setOptions({ maxZoom: 7});

  function startGame() {
    let currentWindow = null;
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
        // icon: url("../images/grayMarker.png")

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

      let infoWindow = new google.maps.InfoWindow({
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

});


$('#rulesLink').on("click", showRules);

function showRules () {
  $('.rules').show();
  $main.html(`
    <p> conquiztador:

object: score the most points to win the game.

setup:
choose a player from the list . choose a country as you headquarters. you have 20 turns and 10 points to start. countries have different values based on power structures.

playing the game:

click on the marker to choose the next country you want to conquer and complete the multiple choice quiz.
players take turns and accumulate points throughout the game based on answering the quiz correctly.

after comparing the scores between players, a winner is annouced.</p>
  `);
}
