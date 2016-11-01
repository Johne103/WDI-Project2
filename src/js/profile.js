$(() =>{
  let $main = $('main');

  $('#showAllProfiles').on('click', getUser);

  function showProfileForm(profiles) {
    console.log(profiles);

    let $form = $('article');
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
    const characters = ['spider-man', 'hulk', 'wolverine', 'gambit', 'cyclops', 'Iron Man', 'Star-Lord (Peter Quill)', 'Blacklash', 'Black Widow%2FNatasha Romanoff (MAA)', 'Ultron', 'Venom (Flash Thompson)', 'loki', 'Apocalypse'];
    for(let i = 0; i<characters.length; i++){
      // console.log(`Character: ${characters[i]}`);
      $.ajax({
        url: "/api/profile/"+ characters[i],
        method: "GET"
      })
      .done(showProfileForm)
      .fail(function(jqXHR){
        console.log(jqXHR.status);
        $main.html(`You are a failure.`);
      });
    }
  }
});
