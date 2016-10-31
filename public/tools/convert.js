'use strict';

var fs = require('fs');

var countries = require('./countries.json');

var outputFilename = 'output.json';

var outputCountries = {};
var cca3tocca2 = {};

for (var i = 0; i < countries.length; i++) {
	var country = countries[i];

	// We want countries keyed by short name
	outputCountries[country.cca2] = {
		// The friendly name
		name: country.name.common,
		// Representative Lat/Lng
		latlng: country.latlng
	};
	cca3tocca2[country.cca3] = country.cca2;
}

// Now we have all the countries,
// convert the borders to use the 2-letter alpha code,
// and add them to the object.
for (var i = 0; i < countries.length; i++) {
	var country = countries[i];
	var borders = country.borders;
	var cca2borders = [];
	for (var j = 0; j < borders.length; j++) {
		cca2borders.push(cca3tocca2[borders[j]]);
	}
	outputCountries[country.cca2].borders = cca2borders;
}

fs.writeFile(outputFilename, JSON.stringify(outputCountries, null, 2), function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("JSON saved to " + outputFilename);
	}
});