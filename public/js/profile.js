'use strict';

$(function () {
  var $main = $('main');

  $('#showAllProfiles').on('click', getUser);

  function showProfileForm(profiles) {
    console.log(profiles);

    var $form = $('<div class="heroSelect"></div>');
    profiles.data.forEach(function (profile) {
      $form.append('\n        <div class="col-md-4" data-id="' + profile.id + '">\n          <img class="card-img-top" src="' + (profile.thumbnail.path + '.' + profile.thumbnail.extension) + '" width="100" alt="profile image">\n          <h4 class="card-title">' + profile.name + '</h4>\n        </div>\n      ');
    });

    $main.html($form);
  }

  function getUser() {
    $.ajax({
      url: '/api/profile',
      method: "GET"
    }).done(showProfileForm).fail(function (jqXHR) {
      console.log(jqXHR.status);
      $main.html('You are a failure.');
    });
  }
});