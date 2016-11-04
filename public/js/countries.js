"use strict";

var countries = {
  "AW": {
    "name": "Aruba",
    "latlng": [12.5, -69.96666666],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": []
  },
  "AF": {
    "name": "Afghanistan",
    "latlng": [33, 65],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["IR", "PK", "TM", "UZ", "TJ", "CN"]
  },
  "AO": {
    "name": "Angola",
    "latlng": [-12.5, 18.5],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["CG", "CD", "ZM", "NA"]
  },
  "AI": {
    "name": "Anguilla",
    "latlng": [18.25, -63.16666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "AX": {
    "name": "Åland Islands",
    "latlng": [60.116667, 19.9],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "AL": {
    "name": "Albania",
    "latlng": [41, 20],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["ME", "GR", "MK", "XK"]
  },
  "AD": {
    "name": "Andorra",
    "latlng": [42.5, 1.5],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["FR", "ES"]
  },
  "AE": {
    "name": "United Arab Emirates",
    "latlng": [24, 54],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["OM", "SA"]
  },
  "AR": {
    "name": "Argentina",
    "latlng": [-34, -64],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["BO", "BR", "CL", "PY", "UY"]
  },
  "AM": {
    "name": "Armenia",
    "latlng": [40, 45],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["AZ", "GE", "IR", "TR"]
  },
  "AS": {
    "name": "American Samoa",
    "latlng": [-14.33333333, -170],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "AQ": {
    "name": "Antarctica",
    "latlng": [-90, 0],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "TF": {
    "name": "French Southern and Antarctic Lands",
    "latlng": [-49.25, 69.167],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "AG": {
    "name": "Antigua and Barbuda",
    "latlng": [17.05, -61.8],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "AU": {
    "name": "Australia",
    "latlng": [-27, 133],
    "questions": ["What is the capital city?"],
    "power": 40,
    "borders": []
  },
  "AT": {
    "name": "Austria",
    "latlng": [47.33333333, 13.33333333],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CZ", "DE", "HU", "IT", "LI", "SK", "SI", "CH"]
  },
  "AZ": {
    "name": "Azerbaijan",
    "latlng": [40.5, 47.5],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AM", "GE", "IR", "RU", "TR"]
  },
  "BI": {
    "name": "Burundi",
    "latlng": [-3.5, 30],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CD", "RW", "TZ"]
  },
  "BE": {
    "name": "Belgium",
    "latlng": [50.83333333, 4],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["FR", "DE", "LU", "NL"]
  },
  "BJ": {
    "name": "Benin",
    "latlng": [9.5, 2.25],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BF", "NE", "NG", "TG"]
  },
  "BF": {
    "name": "Burkina Faso",
    "latlng": [13, -2],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BJ", "CI", "GH", "ML", "NE", "TG"]
  },
  "BD": {
    "name": "Bangladesh",
    "latlng": [24, 90],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["MM", "IN"]
  },
  "BG": {
    "name": "Bulgaria",
    "latlng": [43, 25],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["GR", "MK", "RO", "RS", "TR"]
  },
  "BH": {
    "name": "Bahrain",
    "latlng": [26, 50.55],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "BS": {
    "name": "Bahamas",
    "latlng": [24.25, -76],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "BA": {
    "name": "Bosnia and Herzegovina",
    "latlng": [44, 18],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["HR", "ME", "RS"]
  },
  "BL": {
    "name": "Saint Barthélemy",
    "latlng": [18.5, -63.41666666],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "BY": {
    "name": "Belarus",
    "latlng": [53, 28],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["LV", "LT", "PL", "RU", "UA"]
  },
  "BZ": {
    "name": "Belize",
    "latlng": [17.25, -88.75],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["GT", "MX"]
  },
  "BM": {
    "name": "Bermuda",
    "latlng": [32.33333333, -64.75],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "BO": {
    "name": "Bolivia",
    "latlng": [-17, -65],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AR", "BR", "CL", "PY", "PE"]
  },
  "BR": {
    "name": "Brazil",
    "latlng": [-10, -55],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AR", "BO", "CO", "GF", "GY", "PY", "PE", "SR", "UY", "VE"]
  },
  "BB": {
    "name": "Barbados",
    "latlng": [13.16666666, -59.53333333],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "BN": {
    "name": "Brunei",
    "latlng": [4.5, 114.66666666],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["MY"]
  },
  "BT": {
    "name": "Bhutan",
    "latlng": [27.5, 90.5],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["CN", "IN"]
  },
  "BV": {
    "name": "Bouvet Island",
    "latlng": [-54.43333333, 3.4],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "BW": {
    "name": "Botswana",
    "latlng": [-22, 24],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["NA", "ZA", "ZM", "ZW"]
  },
  "CF": {
    "name": "Central African Republic",
    "latlng": [7, 21],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["CM", "TD", "CD", "CG", "SS", "SD"]
  },
  "CA": {
    "name": "Canada",
    "latlng": [60, -95],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["US"]
  },
  "CC": {
    "name": "Cocos (Keeling) Islands",
    "latlng": [-12.5, 96.83333333],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "CH": {
    "name": "Switzerland",
    "latlng": [47, 8],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AT", "FR", "IT", "LI", "DE"]
  },
  "CL": {
    "name": "Chile",
    "latlng": [-30, -71],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AR", "BO", "PE"]
  },
  "CN": {
    "name": "China",
    "latlng": [35, 105],
    "questions": ["What is the capital city?"],
    "power": 50,
    "borders": ["AF", "BT", "MM", "HK", "IN", "KZ", "KP", "KG", "LA", "MO", "MN", "PK", "RU", "TJ", "VN"]
  },
  "CI": {
    "name": "Ivory Coast",
    "latlng": [8, -5],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["BF", "GH", "GN", "LR", "ML"]
  },
  "CM": {
    "name": "Cameroon",
    "latlng": [6, 12],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["CF", "TD", "CG", "GQ", "GA", "NG"]
  },
  "CD": {
    "name": "DR Congo",
    "latlng": [0, 25],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AO", "BI", "CF", "CG", "RW", "SS", "TZ", "UG", "ZM"]
  },
  "CG": {
    "name": "Republic of the Congo",
    "latlng": [-1, 15],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AO", "CM", "CF", "CD", "GA"]
  },
  "CK": {
    "name": "Cook Islands",
    "latlng": [-21.23333333, -159.76666666],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "CO": {
    "name": "Colombia",
    "latlng": [4, -72],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["BR", "EC", "PA", "PE", "VE"]
  },
  "KM": {
    "name": "Comoros",
    "latlng": [-12.16666666, 44.25],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "CV": {
    "name": "Cape Verde",
    "latlng": [16, -24],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "CR": {
    "name": "Costa Rica",
    "latlng": [10, -84],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["NI", "PA"]
  },
  "CU": {
    "name": "Cuba",
    "latlng": [21.5, -80],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": []
  },
  "CW": {
    "name": "Curaçao",
    "latlng": [12.116667, -68.933333],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "CX": {
    "name": "Christmas Island",
    "latlng": [-10.5, 105.66666666],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "KY": {
    "name": "Cayman Islands",
    "latlng": [19.5, -80.5],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "CY": {
    "name": "Cyprus",
    "latlng": [35, 33],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["GB"]
  },
  "CZ": {
    "name": "Czech Republic",
    "latlng": [49.75, 15.5],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AT", "DE", "PL", "SK"]
  },
  "DE": {
    "name": "Germany",
    "latlng": [51, 9],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AT", "BE", "CZ", "DK", "FR", "LU", "NL", "PL", "CH"]
  },
  "DJ": {
    "name": "Djibouti",
    "latlng": [11.5, 43],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["ER", "ET", "SO"]
  },
  "DM": {
    "name": "Dominica",
    "latlng": [15.41666666, -61.33333333],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "DK": {
    "name": "Denmark",
    "latlng": [56, 10],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["DE"]
  },
  "DO": {
    "name": "Dominican Republic",
    "latlng": [19, -70.66666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["HT"]
  },
  "DZ": {
    "name": "Algeria",
    "latlng": [28, 3],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["TN", "LY", "NE", "EH", "MR", "ML", "MA"]
  },
  "EC": {
    "name": "Ecuador",
    "latlng": [-2, -77.5],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CO", "PE"]
  },
  "EG": {
    "name": "Egypt",
    "latlng": [27, 30],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["IL", "LY", "SD"]
  },
  "ER": {
    "name": "Eritrea",
    "latlng": [15, 39],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["DJ", "ET", "SD"]
  },
  "EH": {
    "name": "Western Sahara",
    "latlng": [24.5, -13],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["DZ", "MR", "MA"]
  },
  "ES": {
    "name": "Spain",
    "latlng": [40, -4],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["AD", "FR", "GI", "PT", "MA"]
  },
  "EE": {
    "name": "Estonia",
    "latlng": [59, 26],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["LV", "RU"]
  },
  "ET": {
    "name": "Ethiopia",
    "latlng": [8, 38],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["DJ", "ER", "KE", "SO", "SS", "SD"]
  },
  "FI": {
    "name": "Finland",
    "latlng": [64, 26],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["NO", "SE", "RU"]
  },
  "FJ": {
    "name": "Fiji",
    "latlng": [-18, 175],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "FK": {
    "name": "Falkland Islands",
    "latlng": [-51.75, -59],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "FR": {
    "name": "France",
    "latlng": [46, 2],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["AD", "BE", "DE", "IT", "LU", "MC", "ES", "CH"]
  },
  "FO": {
    "name": "Faroe Islands",
    "latlng": [62, -7],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "FM": {
    "name": "Micronesia",
    "latlng": [6.91666666, 158.25],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "GA": {
    "name": "Gabon",
    "latlng": [-1, 11.75],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CM", "CG", "GQ"]
  },
  "GB": {
    "name": "United Kingdom",
    "latlng": [54, -2],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["IE"]
  },
  "GE": {
    "name": "Georgia",
    "latlng": [42, 43.5],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["AM", "AZ", "RU", "TR"]
  },
  "GG": {
    "name": "Guernsey",
    "latlng": [49.46666666, -2.58333333],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "GH": {
    "name": "Ghana",
    "latlng": [8, -2],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BF", "CI", "TG"]
  },
  "GI": {
    "name": "Gibraltar",
    "latlng": [36.13333333, -5.35],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["ES"]
  },
  "GN": {
    "name": "Guinea",
    "latlng": [11, -10],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CI", "GW", "LR", "ML", "SN", "SL"]
  },
  "GP": {
    "name": "Guadeloupe",
    "latlng": [16.25, -61.583333],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "GM": {
    "name": "Gambia",
    "latlng": [13.46666666, -16.56666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["SN"]
  },
  "GW": {
    "name": "Guinea-Bissau",
    "latlng": [12, -15],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["GN", "SN"]
  },
  "GQ": {
    "name": "Equatorial Guinea",
    "latlng": [2, 10],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["CM", "GA"]
  },
  "GR": {
    "name": "Greece",
    "latlng": [39, 22],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["AL", "BG", "TR", "MK"]
  },
  "GD": {
    "name": "Grenada",
    "latlng": [12.11666666, -61.66666666],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": []
  },
  "GL": {
    "name": "Greenland",
    "latlng": [72, -40],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": []
  },
  "GT": {
    "name": "Guatemala",
    "latlng": [15.5, -90.25],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["BZ", "SV", "HN", "MX"]
  },
  "GF": {
    "name": "French Guiana",
    "latlng": [4, -53],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["BR", "SR"]
  },
  "GU": {
    "name": "Guam",
    "latlng": [13.46666666, 144.78333333],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": []
  },
  "GY": {
    "name": "Guyana",
    "latlng": [5, -59],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["BR", "SR", "VE"]
  },
  "HK": {
    "name": "Hong Kong",
    "latlng": [22.267, 114.188],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["CN"]
  },
  "HM": {
    "name": "Heard Island and McDonald Islands",
    "latlng": [-53.1, 72.51666666],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": []
  },
  "HN": {
    "name": "Honduras",
    "latlng": [15, -86.5],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["GT", "SV", "NI"]
  },
  "HR": {
    "name": "Croatia",
    "latlng": [45.16666666, 15.5],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["BA", "HU", "ME", "RS", "SI"]
  },
  "HT": {
    "name": "Haiti",
    "latlng": [19, -72.41666666],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["DO"]
  },
  "HU": {
    "name": "Hungary",
    "latlng": [47, 20],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["AT", "HR", "RO", "RS", "SK", "SI", "UA"]
  },
  "ID": {
    "name": "Indonesia",
    "latlng": [-5, 120],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["TL", "MY", "PG"]
  },
  "IM": {
    "name": "Isle of Man",
    "latlng": [54.25, -4.5],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": []
  },
  "IN": {
    "name": "India",
    "latlng": [20, 77],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["AF", "BD", "BT", "MM", "CN", "NP", "PK", "LK"]
  },
  "IO": {
    "name": "British Indian Ocean Territory",
    "latlng": [-6, 71.5],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": []
  },
  "IE": {
    "name": "Ireland",
    "latlng": [53, -8],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["GB"]
  },
  "IR": {
    "name": "Iran",
    "latlng": [32, 53],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["AF", "AM", "AZ", "IQ", "PK", "TR", "TM"]
  },
  "IQ": {
    "name": "Iraq",
    "latlng": [33, 44],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["IR", "JO", "KW", "SA", "SY", "TR"]
  },
  "IS": {
    "name": "Iceland",
    "latlng": [65, -18],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": []
  },
  "IL": {
    "name": "Israel",
    "latlng": [31.47, 35.13],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["EG", "JO", "LB", "SY"]
  },
  "IT": {
    "name": "Italy",
    "latlng": [42.83333333, 12.83333333],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AT", "FR", "SM", "SI", "CH", "VA"]
  },
  "JM": {
    "name": "Jamaica",
    "latlng": [18.25, -77.5],
    "questions": ["What is the capital city?"],
    "power": 40,
    "borders": []
  },
  "JE": {
    "name": "Jersey",
    "latlng": [49.25, -2.16666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "JO": {
    "name": "Jordan",
    "latlng": [31, 36],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["IQ", "IL", "SA", "SY"]
  },
  "JP": {
    "name": "Japan",
    "latlng": [36, 138],
    "questions": ["What is the capital city?"],
    "power": 40,
    "borders": []
  },
  "KZ": {
    "name": "Kazakhstan",
    "latlng": [48, 68],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CN", "KG", "RU", "TM", "UZ"]
  },
  "KE": {
    "name": "Kenya",
    "latlng": [1, 38],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["ET", "SO", "SS", "TZ", "UG"]
  },
  "KG": {
    "name": "Kyrgyzstan",
    "latlng": [41, 75],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CN", "KZ", "TJ", "UZ"]
  },
  "KH": {
    "name": "Cambodia",
    "latlng": [13, 105],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["LA", "TH", "VN"]
  },
  "KI": {
    "name": "Kiribati",
    "latlng": [1.41666666, 173],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "KN": {
    "name": "Saint Kitts and Nevis",
    "latlng": [17.33333333, -62.75],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "KR": {
    "name": "South Korea",
    "latlng": [37, 127.5],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["KP"]
  },
  "XK": {
    "name": "Kosovo",
    "latlng": [42.666667, 21.166667],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["AL", "MK", "ME", "RS"]
  },
  "KW": {
    "name": "Kuwait",
    "latlng": [29.5, 45.75],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["IQ", "SA"]
  },
  "LA": {
    "name": "Laos",
    "latlng": [18, 105],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["MM", "KH", "CN", "TH", "VN"]
  },
  "LB": {
    "name": "Lebanon",
    "latlng": [33.83333333, 35.83333333],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["IL", "SY"]
  },
  "LR": {
    "name": "Liberia",
    "latlng": [6.5, -9.5],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["GN", "CI", "SL"]
  },
  "LY": {
    "name": "Libya",
    "latlng": [25, 17],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["DZ", "TD", "EG", "NE", "SD", "TN"]
  },
  "LC": {
    "name": "Saint Lucia",
    "latlng": [13.88333333, -60.96666666],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": []
  },
  "LI": {
    "name": "Liechtenstein",
    "latlng": [47.26666666, 9.53333333],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["AT", "CH"]
  },
  "LK": {
    "name": "Sri Lanka",
    "latlng": [7, 81],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["IN"]
  },
  "LS": {
    "name": "Lesotho",
    "latlng": [-29.5, 28.5],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["ZA"]
  },
  "LT": {
    "name": "Lithuania",
    "latlng": [56, 24],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["BY", "LV", "PL", "RU"]
  },
  "LU": {
    "name": "Luxembourg",
    "latlng": [49.75, 6.16666666],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["BE", "FR", "DE"]
  },
  "LV": {
    "name": "Latvia",
    "latlng": [57, 25],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["BY", "EE", "LT", "RU"]
  },
  "MO": {
    "name": "Macau",
    "latlng": [22.16666666, 113.55],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["CN"]
  },
  "MF": {
    "name": "Saint Martin",
    "latlng": [18.08333333, -63.95],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["SX"]
  },
  "MA": {
    "name": "Morocco",
    "latlng": [32, -5],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["DZ", "EH", "ES"]
  },
  "MC": {
    "name": "Monaco",
    "latlng": [43.73333333, 7.4],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["FR"]
  },
  "MD": {
    "name": "Moldova",
    "latlng": [47, 29],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["RO", "UA"]
  },
  "MG": {
    "name": "Madagascar",
    "latlng": [-20, 47],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": []
  },
  "MV": {
    "name": "Maldives",
    "latlng": [3.25, 73],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": []
  },
  "MX": {
    "name": "Mexico",
    "latlng": [23, -102],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["BZ", "GT", "US"]
  },
  "MH": {
    "name": "Marshall Islands",
    "latlng": [9, 168],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": []
  },
  "MK": {
    "name": "Macedonia",
    "latlng": [41.83333333, 22],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["AL", "BG", "GR", "XK", "RS"]
  },
  "ML": {
    "name": "Mali",
    "latlng": [17, -4],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["DZ", "BF", "GN", "CI", "MR", "NE", "SN"]
  },
  "MT": {
    "name": "Malta",
    "latlng": [35.83333333, 14.58333333],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": []
  },
  "MM": {
    "name": "Myanmar",
    "latlng": [22, 98],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BD", "CN", "IN", "LA", "TH"]
  },
  "ME": {
    "name": "Montenegro",
    "latlng": [42.5, 19.3],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["AL", "BA", "HR", "XK", "RS"]
  },
  "MN": {
    "name": "Mongolia",
    "latlng": [46, 105],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CN", "RU"]
  },
  "MP": {
    "name": "Northern Mariana Islands",
    "latlng": [15.2, 145.75],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "MZ": {
    "name": "Mozambique",
    "latlng": [-18.25, 35],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["MW", "ZA", "SZ", "TZ", "ZM", "ZW"]
  },
  "MR": {
    "name": "Mauritania",
    "latlng": [20, -12],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["DZ", "ML", "SN", "EH"]
  },
  "MS": {
    "name": "Montserrat",
    "latlng": [16.75, -62.2],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": []
  },
  "MQ": {
    "name": "Martinique",
    "latlng": [14.666667, -61],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": []
  },
  "MU": {
    "name": "Mauritius",
    "latlng": [-20.28333333, 57.55],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": []
  },
  "MW": {
    "name": "Malawi",
    "latlng": [-13.5, 34],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["MZ", "TZ", "ZM"]
  },
  "MY": {
    "name": "Malaysia",
    "latlng": [2.5, 112.5],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["BN", "ID", "TH"]
  },
  "YT": {
    "name": "Mayotte",
    "latlng": [-12.83333333, 45.16666666],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": []
  },
  "NA": {
    "name": "Namibia",
    "latlng": [-22, 17],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["AO", "BW", "ZA", "ZM"]
  },
  "NC": {
    "name": "New Caledonia",
    "latlng": [-21.5, 165.5],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": []
  },
  "NE": {
    "name": "Niger",
    "latlng": [16, 8],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["DZ", "BJ", "BF", "TD", "LY", "ML", "NG"]
  },
  "NF": {
    "name": "Norfolk Island",
    "latlng": [-29.03333333, 167.95],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": []
  },
  "NG": {
    "name": "Nigeria",
    "latlng": [10, 8],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["BJ", "CM", "TD", "NE"]
  },
  "NI": {
    "name": "Nicaragua",
    "latlng": [13, -85],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["CR", "HN"]
  },
  "NU": {
    "name": "Niue",
    "latlng": [-19.03333333, -169.86666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "NL": {
    "name": "Netherlands",
    "latlng": [52.5, 5.75],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BE", "DE"]
  },
  "NO": {
    "name": "Norway",
    "latlng": [62, 10],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["FI", "SE", "RU"]
  },
  "NP": {
    "name": "Nepal",
    "latlng": [28, 84],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CN", "IN"]
  },
  "NR": {
    "name": "Nauru",
    "latlng": [-0.53333333, 166.91666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "NZ": {
    "name": "New Zealand",
    "latlng": [-41, 174],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": []
  },
  "OM": {
    "name": "Oman",
    "latlng": [21, 57],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["SA", "AE", "YE"]
  },
  "PK": {
    "name": "Pakistan",
    "latlng": [30, 70],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["AF", "CN", "IN", "IR"]
  },
  "PA": {
    "name": "Panama",
    "latlng": [9, -80],
    "questions": ["What is the capital city?"],
    "power": 35,
    "borders": ["CO", "CR"]
  },
  "PN": {
    "name": "Pitcairn Islands",
    "latlng": [-25.06666666, -130.1],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "PE": {
    "name": "Peru",
    "latlng": [-10, -76],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BO", "BR", "CL", "CO", "EC"]
  },
  "PH": {
    "name": "Philippines",
    "latlng": [13, 122],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "PW": {
    "name": "Palau",
    "latlng": [7.5, 134.5],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "PG": {
    "name": "Papua New Guinea",
    "latlng": [-6, 147],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["ID"]
  },
  "PL": {
    "name": "Poland",
    "latlng": [52, 20],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["BY", "CZ", "DE", "LT", "RU", "SK", "UA"]
  },
  "PR": {
    "name": "Puerto Rico",
    "latlng": [18.25, -66.5],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": []
  },
  "KP": {
    "name": "North Korea",
    "latlng": [40, 127],
    "questions": ["What is the capital city?"],
    "power": 1,
    "borders": ["CN", "KR", "RU"]
  },
  "PT": {
    "name": "Portugal",
    "latlng": [39.5, -8],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["ES"]
  },
  "PY": {
    "name": "Paraguay",
    "latlng": [-23, -58],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["AR", "BO", "BR"]
  },
  "PS": {
    "name": "Palestine",
    "latlng": [31.9, 35.2],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["IL", "EG", "JO"]
  },
  "PF": {
    "name": "French Polynesia",
    "latlng": [-15, -140],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "QA": {
    "name": "Qatar",
    "latlng": [25.5, 51.25],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["SA"]
  },
  "RE": {
    "name": "Réunion",
    "latlng": [-21.15, 55.5],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "RO": {
    "name": "Romania",
    "latlng": [46, 25],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BG", "HU", "MD", "RS", "UA"]
  },
  "RU": {
    "name": "Russia",
    "latlng": [60, 100],
    "questions": ["What is the capital city?"],
    "power": 50,
    "borders": ["AZ", "BY", "CN", "EE", "FI", "GE", "KZ", "KP", "LV", "LT", "MN", "NO", "PL", "UA"]
  },
  "RW": {
    "name": "Rwanda",
    "latlng": [-2, 30],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BI", "CD", "TZ", "UG"]
  },
  "SA": {
    "name": "Saudi Arabia",
    "latlng": [25, 45],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["IQ", "JO", "KW", "OM", "QA", "AE", "YE"]
  },
  "SD": {
    "name": "Sudan",
    "latlng": [15, 30],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["CF", "TD", "EG", "ER", "ET", "LY", "SS"]
  },
  "SN": {
    "name": "Senegal",
    "latlng": [14, -14],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["GM", "GN", "GW", "ML", "MR"]
  },
  "SG": {
    "name": "Singapore",
    "latlng": [1.36666666, 103.8],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": []
  },
  "GS": {
    "name": "South Georgia",
    "latlng": [-54.5, -37],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "SJ": {
    "name": "Svalbard and Jan Mayen",
    "latlng": [78, 20],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "SB": {
    "name": "Solomon Islands",
    "latlng": [-8, 159],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": []
  },
  "SL": {
    "name": "Sierra Leone",
    "latlng": [8.5, -11.5],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["GN", "LR"]
  },
  "SV": {
    "name": "El Salvador",
    "latlng": [13.83333333, -88.91666666],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["GT", "HN"]
  },
  "SM": {
    "name": "San Marino",
    "latlng": [43.76666666, 12.41666666],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["IT"]
  },
  "SO": {
    "name": "Somalia",
    "latlng": [10, 49],
    "questions": ["What is the capital city?"],
    "power": 5,
    "borders": ["DJ", "ET", "KE"]
  },
  "PM": {
    "name": "Saint Pierre and Miquelon",
    "latlng": [46.83333333, -56.33333333],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": []
  },
  "RS": {
    "name": "Serbia",
    "latlng": [44, 21],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["BA", "BG", "HR", "HU", "XK", "MK", "ME", "RO"]
  },
  "SS": {
    "name": "South Sudan",
    "latlng": [7, 30],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["CF", "CD", "ET", "KE", "SD", "UG"]
  },
  "ST": {
    "name": "São Tomé and Príncipe",
    "latlng": [1, 7],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "SR": {
    "name": "Suriname",
    "latlng": [4, -56],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BR", "GF", "GY"]
  },
  "SK": {
    "name": "Slovakia",
    "latlng": [48.66666666, 19.5],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["AT", "CZ", "HU", "PL", "UA"]
  },
  "SI": {
    "name": "Slovenia",
    "latlng": [46.11666666, 14.81666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["AT", "HR", "IT", "HU"]
  },
  "SE": {
    "name": "Sweden",
    "latlng": [62, 15],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["FI", "NO"]
  },
  "SZ": {
    "name": "Swaziland",
    "latlng": [-26.5, 31.5],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["MZ", "ZA"]
  },
  "SX": {
    "name": "Sint Maarten",
    "latlng": [18.033333, -63.05],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["MF"]
  },
  "SC": {
    "name": "Seychelles",
    "latlng": [-4.58333333, 55.66666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "SY": {
    "name": "Syria",
    "latlng": [35, 38],
    "questions": ["What is the capital city?"],
    "power": 30,
    "borders": ["IQ", "IL", "JO", "LB", "TR"]
  },
  "TC": {
    "name": "Turks and Caicos Islands",
    "latlng": [21.75, -71.58333333],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "TD": {
    "name": "Chad",
    "latlng": [15, 19],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["CM", "CF", "LY", "NE", "NG", "SS"]
  },
  "TG": {
    "name": "Togo",
    "latlng": [8, 1.16666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BJ", "BF", "GH"]
  },
  "TH": {
    "name": "Thailand",
    "latlng": [15, 100],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["MM", "KH", "LA", "MY"]
  },
  "TJ": {
    "name": "Tajikistan",
    "latlng": [39, 71],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["AF", "CN", "KG", "UZ"]
  },
  "TK": {
    "name": "Tokelau",
    "latlng": [-9, -172],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "TM": {
    "name": "Turkmenistan",
    "latlng": [40, 60],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["AF", "IR", "KZ", "UZ"]
  },
  "TL": {
    "name": "Timor-Leste",
    "latlng": [-8.83333333, 125.91666666],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["ID"]
  },
  "TO": {
    "name": "Tonga",
    "latlng": [-20, -175],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "TT": {
    "name": "Trinidad and Tobago",
    "latlng": [11, -61],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "TN": {
    "name": "Tunisia",
    "latlng": [34, 9],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["DZ", "LY"]
  },
  "TR": {
    "name": "Turkey",
    "latlng": [39, 35],
    "questions": ["What is the capital city?"],
    "power": 35,
    "borders": ["AM", "AZ", "BG", "GE", "GR", "IR", "IQ", "SY"]
  },
  "TV": {
    "name": "Tuvalu",
    "latlng": [-8, 178],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "TW": {
    "name": "Taiwan",
    "latlng": [23.5, 121],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "TZ": {
    "name": "Tanzania",
    "latlng": [-6, 35],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BI", "CD", "KE", "MW", "MZ", "RW", "UG", "ZM"]
  },
  "UG": {
    "name": "Uganda",
    "latlng": [1, 32],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["CD", "KE", "RW", "SS", "TZ"]
  },
  "UA": {
    "name": "Ukraine",
    "latlng": [49, 32],
    "questions": ["What is the capital city?"],
    "power": 25,
    "borders": ["BY", "HU", "MD", "PL", "RO", "RU", "SK"]
  },
  "UY": {
    "name": "Uruguay",
    "latlng": [-33, -56],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["AR", "BR"]
  },
  "US": {
    "name": "United States",
    "latlng": [38, -97],
    "questions": ["What is the capital city?"],
    "power": 50,
    "borders": ["CA", "MX"]
  },
  "UZ": {
    "name": "Uzbekistan",
    "latlng": [41, 64],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["AF", "KZ", "KG", "TJ", "TM"]
  },
  "VA": {
    "name": "Vatican City",
    "latlng": [41.9, 12.45],
    "questions": ["What is the capital city?"],
    "power": 35,
    "borders": ["IT"]
  },
  "VC": {
    "name": "Saint Vincent and the Grenadines",
    "latlng": [13.25, -61.2],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "VE": {
    "name": "Venezuela",
    "latlng": [8, -66],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["BR", "CO", "GY"]
  },
  "VG": {
    "name": "British Virgin Islands",
    "latlng": [18.431383, -64.62305],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "VI": {
    "name": "United States Virgin Islands",
    "latlng": [18.35, -64.933333],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "VN": {
    "name": "Vietnam",
    "latlng": [16.16666666, 107.83333333],
    "questions": ["What is the capital city?"],
    "power": 15,
    "borders": ["KH", "CN", "LA"]
  },
  "VU": {
    "name": "Vanuatu",
    "latlng": [-16, 167],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "WF": {
    "name": "Wallis and Futuna",
    "latlng": [-13.3, -176.2],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "WS": {
    "name": "Samoa",
    "latlng": [-13.58333333, -172.33333333],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": []
  },
  "YE": {
    "name": "Yemen",
    "latlng": [15, 48],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["OM", "SA"]
  },
  "ZA": {
    "name": "South Africa",
    "latlng": [-29, 24],
    "questions": ["What is the capital city?"],
    "power": 20,
    "borders": ["BW", "LS", "MZ", "NA", "SZ", "ZW"]
  },
  "ZM": {
    "name": "Zambia",
    "latlng": [-15, 30],
    "questions": ["What is the capital city?"],
    "power": 10,
    "borders": ["AO", "BW", "CD", "MW", "MZ", "NA", "TZ", "ZW"]
  },
  "ZW": {
    "name": "Zimbabwe",
    "latlng": [-20, 30],
    "questions": ["What is the capital city?"],
    "power": 100,
    "borders": ["BW", "MZ", "ZA", "ZM"]
  }
};