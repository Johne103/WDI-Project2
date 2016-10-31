$(() => {
  let countryData = [];
  let selectedCountries = [];

  $.get("https://restcountries.eu/rest/v1/all")
    .done(function(data) {
      countryData = data.map((country) => {
        return {
          name: country.name,
          capital: country.capital,
          id: country.alpha2Code,
          location: {
            lat: country.latlng[0],
            lng: country.latlng[1]
          }
        };
      });

      console.log(selectCountries("GB"));
    });

  function findCountryByAlpha2Code(alpha2Code) {
    let index = countryData.findIndex((country) => {
      return country.id === alpha2Code;
    });

    return countryData[index];
  }

  function findRandomCountry() {
    let randomIndex = Math.floor(Math.random() * countryData.length);
    return countryData[randomIndex];
  }

  function selectCountries(alpha2Code) {
    selectedCountries.push(findCountryByAlpha2Code(alpha2Code));
    for(let i = 0;i<3;i++) {
      let country = findRandomCountry();
      while(selectedCountries.indexOf(country) !== -1) {
        country = findRandomCountry();
      }
      selectedCountries.push(country);
    }
    return selectedCountries;
  }
});


// const getQuestions = () => {
//   $.ajax({
//     method: 'GET',
//     url: "http://localhost:8000/cars"
//   })
//   .done((data) => {
//     console.log(data);
//     $.each(data, (index, car) => {
//       addCar(car);
//     });
//   });
// };
