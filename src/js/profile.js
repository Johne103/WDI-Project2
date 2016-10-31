$(() =>{

  let $main = $('main');

  $('#showAllProfiles').on('click', getUser);

  function showProfiles(profiles) {
    console.log(profiles);

    let $row = $('<div class="row"></div>');
    profiles.data.forEach((profile) => {
      $row.append(`
        <div class="col-md-4">
          <div class="card">
            <img class="card-img-top" src="${profile.thumbnail.path + '.' + profile.thumbnail.extension}" width="100" alt="Card image cap">
            <div class="card-block">
              <h4 class="card-title">${profile.name}</h4>
            </div>
          </div>
          <button class="btn btn-danger delete" data-id="${profile._id}">Delete</button>
          <button class="btn btn-primary edit" data-id="${profile._id}">Edit</button>
        </div>
      `);
    });

    $main.html($row);
  }

  function getUser() {
    $.ajax({
      url: '/api/profile',
      method: "GET"
    })
    .done(showProfiles)
    .fail(function(jqXHR){
      console.log(jqXHR.status);
      $main.html(`You are a failure.`);
    });
  }
});
