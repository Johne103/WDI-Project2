'use strict';

$(function () {

  var $main = $('main');

  $('#showAllProfiles').on('click', getUser);

  function showProfiles(profiles) {
    console.log(profiles);

    var $row = $('<div class="row"></div>');
    profiles.data.forEach(function (profile) {
      $row.append('\n        <div class="col-md-4">\n          <div class="card">\n            <img class="card-img-top" src="' + (profile.thumbnail.path + '.' + profile.thumbnail.extension) + '" width="100" alt="Card image cap">\n            <div class="card-block">\n              <h4 class="card-title">' + profile.name + '</h4>\n            </div>\n          </div>\n          <button class="btn btn-danger delete" data-id="' + profile._id + '">Delete</button>\n          <button class="btn btn-primary edit" data-id="' + profile._id + '">Edit</button>\n        </div>\n      ');
    });

    $main.html($row);
  }

  function getUser() {
    $.ajax({
      url: '/api/profile',
      method: "GET"
    }).done(showProfiles).fail(function (jqXHR) {
      console.log(jqXHR.status);
      $main.html('You are a failure.');
    });
  }
});