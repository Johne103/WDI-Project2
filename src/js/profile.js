$(() =>{
  let $main = $('main');

  $('#showAllProfiles').on('click', getUser);

  function showProfileForm(profiles) {
    console.log(profiles);

    let $form = $('<div class="heroSelect"></div>');
    profiles.data.forEach((profile) => {
      $form.append(`
        <div class="col-md-4" data-id="${profile.id}">
          <img class="card-img-top" src="${profile.thumbnail.path + '.' + profile.thumbnail.extension}" width="100" alt="profile image">
          <h4 class="card-title">${profile.name}</h4>
        </div>
      `);
    });

    $main.html($form);
  }

  function getUser() {
    $.ajax({
      url: '/api/profile',
      method: "GET"
    })
    .done(showProfileForm)
    .fail(function(jqXHR){
      console.log(jqXHR.status);
      $main.html(`You are a failure.`);
    });
  }
});
