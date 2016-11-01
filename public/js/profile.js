'use strict';

$(function () {
  var $main = $('main');

  $('#showAllProfiles').on('click', getUser);

  function showProfileForm(profiles) {
    console.log(profiles);

    var $form = $('article');
    profiles.data.forEach(function (profile) {
      $form.append('\n        <div class="col-md-4" data-id="' + profile.id + '">\n          <img class="card-img-top" src="' + (profile.thumbnail.path + '.' + profile.thumbnail.extension) + '" width="100" alt="profile image">\n          <h4 class="card-title">' + profile.name + '</h4>\n        </div>\n      ');
    });

    $main.html($form);
  }

  function getUser() {
    var characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'cyclops', 'Iron Man', 'Star-Lord (Peter Quill)', 'Blacklash', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];
    for (var i = 0; i < characters.length; i++) {
      // console.log(`Character: ${characters[i]}`);
      $.ajax({
        url: "/api/profile/" + characters[i],
        method: "GET"
      }).done(showProfileForm).fail(function (jqXHR) {
        console.log(jqXHR.status);
        $main.html('You are a failure.');
      });
    }
  }
});