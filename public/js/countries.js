"use strict";

var countries = {
  "AW": {
    "name": "Aruba",
    "latlng": [12.5, -69.96666666],
    "power": 10,
    "borders": []
  },
  "AF": {
    "name": "Afghanistan",
    "latlng": [33, 65],
    "power": 10,
    "borders": ["IR", "PK", "TM", "UZ", "TJ", "CN"]
  },
  "AO": {
    "name": "Angola",
    "latlng": [-12.5, 18.5],
    "power": 10,
    "borders": ["CG", "CD", "ZM", "NA"]
  },
  "AI": {
    "name": "Anguilla",
    "latlng": [18.25, -63.16666666],
    "power": 10,
    "borders": []
  },
  "AX": {
    "name": "Åland Islands",
    "latlng": [60.116667, 19.9],
    "power": 10,
    "borders": []
  },
  "AL": {
    "name": "Albania",
    "latlng": [41, 20],
    "power": 10,
    "borders": ["ME", "GR", "MK", "XK"]
  },
  "AD": {
    "name": "Andorra",
    "latlng": [42.5, 1.5],
    "power": 10,
    "borders": ["FR", "ES"]
  },
  "AE": {
    "name": "United Arab Emirates",
    "latlng": [24, 54],
    "power": 10,
    "borders": ["OM", "SA"]
  },
  "AR": {
    "name": "Argentina",
    "latlng": [-34, -64],
    "power": 10,
    "borders": ["BO", "BR", "CL", "PY", "UY"]
  },
  "AM": {
    "name": "Armenia",
    "latlng": [40, 45],
    "power": 10,
    "borders": ["AZ", "GE", "IR", "TR"]
  },
  "AS": {
    "name": "American Samoa",
    "latlng": [-14.33333333, -170],
    "power": 10,
    "borders": []
  },
  "AQ": {
    "name": "Antarctica",
    "latlng": [-90, 0],
    "power": 10,
    "borders": []
  },
  "TF": {
    "name": "French Southern and Antarctic Lands",
    "latlng": [-49.25, 69.167],
    "power": 10,
    "borders": []
  },
  "AG": {
    "name": "Antigua and Barbuda",
    "latlng": [17.05, -61.8],
    "power": 10,
    "borders": []
  },
  "AU": {
    "name": "Australia",
    "latlng": [-27, 133],
    "power": 30,
    "borders": []
  },
  "AT": {
    "name": "Austria",
    "latlng": [47.33333333, 13.33333333],
    "power": 10,
    "borders": ["CZ", "DE", "HU", "IT", "LI", "SK", "SI", "CH"]
  },
  "AZ": {
    "name": "Azerbaijan",
    "latlng": [40.5, 47.5],
    "power": 10,
    "borders": ["AM", "GE", "IR", "RU", "TR"]
  },
  "BI": {
    "name": "Burundi",
    "latlng": [-3.5, 30],
    "power": 10,
    "borders": ["CD", "RW", "TZ"]
  },
  "BE": {
    "name": "Belgium",
    "latlng": [50.83333333, 4],
    "power": 20,
    "borders": ["FR", "DE", "LU", "NL"]
  },
  "BJ": {
    "name": "Benin",
    "latlng": [9.5, 2.25],
    "power": 10,
    "borders": ["BF", "NE", "NG", "TG"]
  },
  "BF": {
    "name": "Burkina Faso",
    "latlng": [13, -2],
    "power": 10,
    "borders": ["BJ", "CI", "GH", "ML", "NE", "TG"]
  },
  "BD": {
    "name": "Bangladesh",
    "latlng": [24, 90],
    "power": 10,
    "borders": ["MM", "IN"]
  },
  "BG": {
    "name": "Bulgaria",
    "latlng": [43, 25],
    "power": 10,
    "borders": ["GR", "MK", "RO", "RS", "TR"]
  },
  "BH": {
    "name": "Bahrain",
    "latlng": [26, 50.55],
    "power": 10,
    "borders": []
  },
  "BS": {
    "name": "Bahamas",
    "latlng": [24.25, -76],
    "power": 10,
    "borders": []
  },
  "BA": {
    "name": "Bosnia and Herzegovina",
    "latlng": [44, 18],
    "power": 10,
    "borders": ["HR", "ME", "RS"]
  },
  "BL": {
    "name": "Saint Barthélemy",
    "latlng": [18.5, -63.41666666],
    "power": 10,
    "borders": []
  },
  "BY": {
    "name": "Belarus",
    "latlng": [53, 28],
    "power": 10,
    "borders": ["LV", "LT", "PL", "RU", "UA"]
  },
  "BZ": {
    "name": "Belize",
    "latlng": [17.25, -88.75],
    "power": 10,
    "borders": ["GT", "MX"]
  },
  "BM": {
    "name": "Bermuda",
    "latlng": [32.33333333, -64.75],
    "power": 10,
    "borders": []
  },
  "BO": {
    "name": "Bolivia",
    "latlng": [-17, -65],
    "power": 10,
    "borders": ["AR", "BR", "CL", "PY", "PE"]
  },
  "BR": {
    "name": "Brazil",
    "latlng": [-10, -55],
    "power": 10,
    "borders": ["AR", "BO", "CO", "GF", "GY", "PY", "PE", "SR", "UY", "VE"]
  },
  "BB": {
    "name": "Barbados",
    "latlng": [13.16666666, -59.53333333],
    "power": 10,
    "borders": []
  },
  "BN": {
    "name": "Brunei",
    "latlng": [4.5, 114.66666666],
    "power": 10,
    "borders": ["MY"]
  },
  "BT": {
    "name": "Bhutan",
    "latlng": [27.5, 90.5],
    "power": 10,
    "borders": ["CN", "IN"]
  },
  "BV": {
    "name": "Bouvet Island",
    "latlng": [-54.43333333, 3.4],
    "power": 10,
    "borders": []
  },
  "BW": {
    "name": "Botswana",
    "latlng": [-22, 24],
    "power": 10,
    "borders": ["NA", "ZA", "ZM", "ZW"]
  },
  "CF": {
    "name": "Central African Republic",
    "latlng": [7, 21],
    "power": 10,
    "borders": ["CM", "TD", "CD", "CG", "SS", "SD"]
  },
  "CA": {
    "name": "Canada",
    "latlng": [60, -95],
    "power": 30,
    "borders": ["US"]
  },
  "CC": {
    "name": "Cocos (Keeling) Islands",
    "latlng": [-12.5, 96.83333333],
    "power": 10,
    "borders": []
  },
  "CH": {
    "name": "Switzerland",
    "latlng": [47, 8],
    "power": 10,
    "borders": ["AT", "FR", "IT", "LI", "DE"]
  },
  "CL": {
    "name": "Chile",
    "latlng": [-30, -71],
    "power": 10,
    "borders": ["AR", "BO", "PE"]
  },
  "CN": {
    "name": "China",
    "latlng": [35, 105],
    "power": 50,
    "borders": ["AF", "BT", "MM", "HK", "IN", "KZ", "KP", "KG", "LA", "MO", "MN", "PK", "RU", "TJ", "VN"]
  },
  "CI": {
    "name": "Ivory Coast",
    "latlng": [8, -5],
    "power": 10,
    "borders": ["BF", "GH", "GN", "LR", "ML"]
  },
  "CM": {
    "name": "Cameroon",
    "latlng": [6, 12],
    "power": 10,
    "borders": ["CF", "TD", "CG", "GQ", "GA", "NG"]
  },
  "CD": {
    "name": "DR Congo",
    "latlng": [0, 25],
    "power": 10,
    "borders": ["AO", "BI", "CF", "CG", "RW", "SS", "TZ", "UG", "ZM"]
  },
  "CG": {
    "name": "Republic of the Congo",
    "latlng": [-1, 15],
    "power": 10,
    "borders": ["AO", "CM", "CF", "CD", "GA"]
  },
  "CK": {
    "name": "Cook Islands",
    "latlng": [-21.23333333, -159.76666666],
    "power": 10,
    "borders": []
  },
  "CO": {
    "name": "Colombia",
    "latlng": [4, -72],
    "power": 15,
    "borders": ["BR", "EC", "PA", "PE", "VE"]
  },
  "KM": {
    "name": "Comoros",
    "latlng": [-12.16666666, 44.25],
    "power": 10,
    "borders": []
  },
  "CV": {
    "name": "Cape Verde",
    "latlng": [16, -24],
    "power": 10,
    "borders": []
  },
  "CR": {
    "name": "Costa Rica",
    "latlng": [10, -84],
    "power": 10,
    "borders": ["NI", "PA"]
  },
  "CU": {
    "name": "Cuba",
    "latlng": [21.5, -80],
    "power": 25,
    "borders": []
  },
  "CW": {
    "name": "Curaçao",
    "latlng": [12.116667, -68.933333],
    "power": 10,
    "borders": []
  },
  "CX": {
    "name": "Christmas Island",
    "latlng": [-10.5, 105.66666666],
    "power": 10,
    "borders": []
  },
  "KY": {
    "name": "Cayman Islands",
    "latlng": [19.5, -80.5],
    "power": 10,
    "borders": []
  },
  "CY": {
    "name": "Cyprus",
    "latlng": [35, 33],
    "power": 10,
    "borders": ["GB"]
  },
  "CZ": {
    "name": "Czech Republic",
    "latlng": [49.75, 15.5],
    "power": 10,
    "borders": ["AT", "DE", "PL", "SK"]
  },
  "DE": {
    "name": "Germany",
    "latlng": [51, 9],
    "power": 40,
    "borders": ["AT", "BE", "CZ", "DK", "FR", "LU", "NL", "PL", "CH"]
  },
  "DJ": {
    "name": "Djibouti",
    "latlng": [11.5, 43],
    "power": 10,
    "borders": ["ER", "ET", "SO"]
  },
  "DM": {
    "name": "Dominica",
    "latlng": [15.41666666, -61.33333333],
    "power": 10,
    "borders": []
  },
  "DK": {
    "name": "Denmark",
    "latlng": [56, 10],
    "power": 10,
    "borders": ["DE"]
  },
  "DO": {
    "name": "Dominican Republic",
    "latlng": [19, -70.66666666],
    "power": 10,
    "borders": ["HT"]
  },
  "DZ": {
    "name": "Algeria",
    "latlng": [28, 3],
    "power": 10,
    "borders": ["TN", "LY", "NE", "EH", "MR", "ML", "MA"]
  },
  "EC": {
    "name": "Ecuador",
    "latlng": [-2, -77.5],
    "power": 10,
    "borders": ["CO", "PE"]
  },
  "EG": {
    "name": "Egypt",
    "latlng": [27, 30],
    "power": 10,
    "borders": ["IL", "LY", "SD"]
  },
  "ER": {
    "name": "Eritrea",
    "latlng": [15, 39],
    "power": 10,
    "borders": ["DJ", "ET", "SD"]
  },
  "EH": {
    "name": "Western Sahara",
    "latlng": [24.5, -13],
    "power": 10,
    "borders": ["DZ", "MR", "MA"]
  },
  "ES": {
    "name": "Spain",
    "latlng": [40, -4],
    "power": 25,
    "borders": ["AD", "FR", "GI", "PT", "MA"]
  },
  "EE": {
    "name": "Estonia",
    "latlng": [59, 26],
    "power": 10,
    "borders": ["LV", "RU"]
  },
  "ET": {
    "name": "Ethiopia",
    "latlng": [8, 38],
    "power": 10,
    "borders": ["DJ", "ER", "KE", "SO", "SS", "SD"]
  },
  "FI": {
    "name": "Finland",
    "latlng": [64, 26],
    "power": 10,
    "borders": ["NO", "SE", "RU"]
  },
  "FJ": {
    "name": "Fiji",
    "latlng": [-18, 175],
    "power": 10,
    "borders": []
  },
  "FK": {
    "name": "Falkland Islands",
    "latlng": [-51.75, -59],
    "power": 10,
    "borders": []
  },
  "FR": {
    "name": "France",
    "latlng": [46, 2],
    "power": 30,
    "borders": ["AD", "BE", "DE", "IT", "LU", "MC", "ES", "CH"]
  },
  "FO": {
    "name": "Faroe Islands",
    "latlng": [62, -7],
    "power": 10,
    "borders": []
  },
  "FM": {
    "name": "Micronesia",
    "latlng": [6.91666666, 158.25],
    "power": 10,
    "borders": []
  },
  "GA": {
    "name": "Gabon",
    "latlng": [-1, 11.75],
    "power": 10,
    "borders": ["CM", "CG", "GQ"]
  },
  "GB": {
    "name": "United Kingdom",
    "latlng": [54, -2],
    "power": 30,
    "borders": ["IE"]
  },
  "GE": {
    "name": "Georgia",
    "latlng": [42, 43.5],
    "power": 10,
    "borders": ["AM", "AZ", "RU", "TR"]
  },
  "GG": {
    "name": "Guernsey",
    "latlng": [49.46666666, -2.58333333],
    "power": 10,
    "borders": []
  },
  "GH": {
    "name": "Ghana",
    "latlng": [8, -2],
    "power": 10,
    "borders": ["BF", "CI", "TG"]
  },
  "GI": {
    "name": "Gibraltar",
    "latlng": [36.13333333, -5.35],
    "power": 10,
    "borders": ["ES"]
  },
  "GN": {
    "name": "Guinea",
    "latlng": [11, -10],
    "power": 10,
    "borders": ["CI", "GW", "LR", "ML", "SN", "SL"]
  },
  "GP": {
    "name": "Guadeloupe",
    "latlng": [16.25, -61.583333],
    "power": 10,
    "borders": []
  },
  "GM": {
    "name": "Gambia",
    "latlng": [13.46666666, -16.56666666],
    "power": 10,
    "borders": ["SN"]
  },
  "GW": {
    "name": "Guinea-Bissau",
    "latlng": [12, -15],
    "power": 10,
    "borders": ["GN", "SN"]
  },
  "GQ": {
    "name": "Equatorial Guinea",
    "latlng": [2, 10],
    "power": 10,
    "borders": ["CM", "GA"]
  },
  "GR": {
    "name": "Greece",
    "latlng": [39, 22],
    "power": 10,
    "borders": ["AL", "BG", "TR", "MK"]
  },
  "GD": {
    "name": "Grenada",
    "latlng": [12.11666666, -61.66666666],
    "power": 10,
    "borders": []
  },
  "GL": {
    "name": "Greenland",
    "latlng": [72, -40],
    "power": 10,
    "borders": []
  },
  "GT": {
    "name": "Guatemala",
    "latlng": [15.5, -90.25],
    "power": 10,
    "borders": ["BZ", "SV", "HN", "MX"]
  },
  "GF": {
    "name": "French Guiana",
    "latlng": [4, -53],
    "power": 10,
    "borders": ["BR", "SR"]
  },
  "GU": {
    "name": "Guam",
    "latlng": [13.46666666, 144.78333333],
    "power": 10,
    "borders": []
  },
  "GY": {
    "name": "Guyana",
    "latlng": [5, -59],
    "power": 10,
    "borders": ["BR", "SR", "VE"]
  },
  "HK": {
    "name": "Hong Kong",
    "latlng": [22.267, 114.188],
    "power": 20,
    "borders": ["CN"]
  },
  "HM": {
    "name": "Heard Island and McDonald Islands",
    "latlng": [-53.1, 72.51666666],
    "power": 10,
    "borders": []
  },
  "HN": {
    "name": "Honduras",
    "latlng": [15, -86.5],
    "power": 10,
    "borders": ["GT", "SV", "NI"]
  },
  "HR": {
    "name": "Croatia",
    "latlng": [45.16666666, 15.5],
    "power": 10,
    "borders": ["BA", "HU", "ME", "RS", "SI"]
  },
  "HT": {
    "name": "Haiti",
    "latlng": [19, -72.41666666],
    "power": 10,
    "borders": ["DO"]
  },
  "HU": {
    "name": "Hungary",
    "latlng": [47, 20],
    "power": 10,
    "borders": ["AT", "HR", "RO", "RS", "SK", "SI", "UA"]
  },
  "ID": {
    "name": "Indonesia",
    "latlng": [-5, 120],
    "power": 10,
    "borders": ["TL", "MY", "PG"]
  },
  "IM": {
    "name": "Isle of Man",
    "latlng": [54.25, -4.5],
    "power": 10,
    "borders": []
  },
  "IN": {
    "name": "India",
    "latlng": [20, 77],
    "power": 10,
    "borders": ["AF", "BD", "BT", "MM", "CN", "NP", "PK", "LK"]
  },
  "IO": {
    "name": "British Indian Ocean Territory",
    "latlng": [-6, 71.5],
    "power": 10,
    "borders": []
  },
  "IE": {
    "name": "Ireland",
    "latlng": [53, -8],
    "power": 10,
    "borders": ["GB"]
  },
  "IR": {
    "name": "Iran",
    "latlng": [32, 53],
    "power": 30,
    "borders": ["AF", "AM", "AZ", "IQ", "PK", "TR", "TM"]
  },
  "IQ": {
    "name": "Iraq",
    "latlng": [33, 44],
    "power": 30,
    "borders": ["IR", "JO", "KW", "SA", "SY", "TR"]
  },
  "IS": {
    "name": "Iceland",
    "latlng": [65, -18],
    "power": 10,
    "borders": []
  },
  "IL": {
    "name": "Israel",
    "latlng": [31.47, 35.13],
    "power": 10,
    "borders": ["EG", "JO", "LB", "SY"]
  },
  "IT": {
    "name": "Italy",
    "latlng": [42.83333333, 12.83333333],
    "power": 20,
    "borders": ["AT", "FR", "SM", "SI", "CH", "VA"]
  },
  "JM": {
    "name": "Jamaica",
    "latlng": [18.25, -77.5],
    "power": 40,
    "borders": []
  },
  "JE": {
    "name": "Jersey",
    "latlng": [49.25, -2.16666666],
    "power": 10,
    "borders": []
  },
  "JO": {
    "name": "Jordan",
    "latlng": [31, 36],
    "power": 10,
    "borders": ["IQ", "IL", "SA", "SY"]
  },
  "JP": {
    "name": "Japan",
    "latlng": [36, 138],
    "power": 40,
    "borders": []
  },
  "KZ": {
    "name": "Kazakhstan",
    "latlng": [48, 68],
    "power": 10,
    "borders": ["CN", "KG", "RU", "TM", "UZ"]
  },
  "KE": {
    "name": "Kenya",
    "latlng": [1, 38],
    "power": 10,
    "borders": ["ET", "SO", "SS", "TZ", "UG"]
  },
  "KG": {
    "name": "Kyrgyzstan",
    "latlng": [41, 75],
    "power": 10,
    "borders": ["CN", "KZ", "TJ", "UZ"]
  },
  "KH": {
    "name": "Cambodia",
    "latlng": [13, 105],
    "power": 10,
    "borders": ["LA", "TH", "VN"]
  },
  "KI": {
    "name": "Kiribati",
    "latlng": [1.41666666, 173],
    "power": 10,
    "borders": []
  },
  "KN": {
    "name": "Saint Kitts and Nevis",
    "latlng": [17.33333333, -62.75],
    "power": 10,
    "borders": []
  },
  "KR": {
    "name": "South Korea",
    "latlng": [37, 127.5],
    "power": 30,
    "borders": ["KP"]
  },
  "XK": {
    "name": "Kosovo",
    "latlng": [42.666667, 21.166667],
    "power": 10,
    "borders": ["AL", "MK", "ME", "RS"]
  },
  "KW": {
    "name": "Kuwait",
    "latlng": [29.5, 45.75],
    "power": 10,
    "borders": ["IQ", "SA"]
  },
  "LA": {
    "name": "Laos",
    "latlng": [18, 105],
    "power": 10,
    "borders": ["MM", "KH", "CN", "TH", "VN"]
  },
  "LB": {
    "name": "Lebanon",
    "latlng": [33.83333333, 35.83333333],
    "power": 10,
    "borders": ["IL", "SY"]
  },
  "LR": {
    "name": "Liberia",
    "latlng": [6.5, -9.5],
    "power": 10,
    "borders": ["GN", "CI", "SL"]
  },
  "LY": {
    "name": "Libya",
    "latlng": [25, 17],
    "power": 10,
    "borders": ["DZ", "TD", "EG", "NE", "SD", "TN"]
  },
  "LC": {
    "name": "Saint Lucia",
    "latlng": [13.88333333, -60.96666666],
    "power": 10,
    "borders": []
  },
  "LI": {
    "name": "Liechtenstein",
    "latlng": [47.26666666, 9.53333333],
    "power": 10,
    "borders": ["AT", "CH"]
  },
  "LK": {
    "name": "Sri Lanka",
    "latlng": [7, 81],
    "power": 10,
    "borders": ["IN"]
  },
  "LS": {
    "name": "Lesotho",
    "latlng": [-29.5, 28.5],
    "power": 10,
    "borders": ["ZA"]
  },
  "LT": {
    "name": "Lithuania",
    "latlng": [56, 24],
    "power": 10,
    "borders": ["BY", "LV", "PL", "RU"]
  },
  "LU": {
    "name": "Luxembourg",
    "latlng": [49.75, 6.16666666],
    "power": 10,
    "borders": ["BE", "FR", "DE"]
  },
  "LV": {
    "name": "Latvia",
    "latlng": [57, 25],
    "power": 10,
    "borders": ["BY", "EE", "LT", "RU"]
  },
  "MO": {
    "name": "Macau",
    "latlng": [22.16666666, 113.55],
    "power": 10,
    "borders": ["CN"]
  },
  "MF": {
    "name": "Saint Martin",
    "latlng": [18.08333333, -63.95],
    "power": 10,
    "borders": ["SX"]
  },
  "MA": {
    "name": "Morocco",
    "latlng": [32, -5],
    "power": 10,
    "borders": ["DZ", "EH", "ES"]
  },
  "MC": {
    "name": "Monaco",
    "latlng": [43.73333333, 7.4],
    "power": 10,
    "borders": ["FR"]
  },
  "MD": {
    "name": "Moldova",
    "latlng": [47, 29],
    "power": 10,
    "borders": ["RO", "UA"]
  },
  "MG": {
    "name": "Madagascar",
    "latlng": [-20, 47],
    "power": 10,
    "borders": []
  },
  "MV": {
    "name": "Maldives",
    "latlng": [3.25, 73],
    "power": 10,
    "borders": []
  },
  "MX": {
    "name": "Mexico",
    "latlng": [23, -102],
    "power": 20,
    "borders": ["BZ", "GT", "US"]
  },
  "MH": {
    "name": "Marshall Islands",
    "latlng": [9, 168],
    "power": 10,
    "borders": []
  },
  "MK": {
    "name": "Macedonia",
    "latlng": [41.83333333, 22],
    "power": 10,
    "borders": ["AL", "BG", "GR", "XK", "RS"]
  },
  "ML": {
    "name": "Mali",
    "latlng": [17, -4],
    "power": 10,
    "borders": ["DZ", "BF", "GN", "CI", "MR", "NE", "SN"]
  },
  "MT": {
    "name": "Malta",
    "latlng": [35.83333333, 14.58333333],
    "power": 10,
    "borders": []
  },
  "MM": {
    "name": "Myanmar",
    "latlng": [22, 98],
    "power": 10,
    "borders": ["BD", "CN", "IN", "LA", "TH"]
  },
  "ME": {
    "name": "Montenegro",
    "latlng": [42.5, 19.3],
    "power": 10,
    "borders": ["AL", "BA", "HR", "XK", "RS"]
  },
  "MN": {
    "name": "Mongolia",
    "latlng": [46, 105],
    "power": 10,
    "borders": ["CN", "RU"]
  },
  "MP": {
    "name": "Northern Mariana Islands",
    "latlng": [15.2, 145.75],
    "power": 10,
    "borders": []
  },
  "MZ": {
    "name": "Mozambique",
    "latlng": [-18.25, 35],
    "power": 10,
    "borders": ["MW", "ZA", "SZ", "TZ", "ZM", "ZW"]
  },
  "MR": {
    "name": "Mauritania",
    "latlng": [20, -12],
    "power": 10,
    "borders": ["DZ", "ML", "SN", "EH"]
  },
  "MS": {
    "name": "Montserrat",
    "latlng": [16.75, -62.2],
    "power": 10,
    "borders": []
  },
  "MQ": {
    "name": "Martinique",
    "latlng": [14.666667, -61],
    "power": 10,
    "borders": []
  },
  "MU": {
    "name": "Mauritius",
    "latlng": [-20.28333333, 57.55],
    "power": 10,
    "borders": []
  },
  "MW": {
    "name": "Malawi",
    "latlng": [-13.5, 34],
    "power": 10,
    "borders": ["MZ", "TZ", "ZM"]
  },
  "MY": {
    "name": "Malaysia",
    "latlng": [2.5, 112.5],
    "power": 10,
    "borders": ["BN", "ID", "TH"]
  },
  "YT": {
    "name": "Mayotte",
    "latlng": [-12.83333333, 45.16666666],
    "power": 10,
    "borders": []
  },
  "NA": {
    "name": "Namibia",
    "latlng": [-22, 17],
    "power": 10,
    "borders": ["AO", "BW", "ZA", "ZM"]
  },
  "NC": {
    "name": "New Caledonia",
    "latlng": [-21.5, 165.5],
    "power": 10,
    "borders": []
  },
  "NE": {
    "name": "Niger",
    "latlng": [16, 8],
    "power": 10,
    "borders": ["DZ", "BJ", "BF", "TD", "LY", "ML", "NG"]
  },
  "NF": {
    "name": "Norfolk Island",
    "latlng": [-29.03333333, 167.95],
    "power": 10,
    "borders": []
  },
  "NG": {
    "name": "Nigeria",
    "latlng": [10, 8],
    "power": 10,
    "borders": ["BJ", "CM", "TD", "NE"]
  },
  "NI": {
    "name": "Nicaragua",
    "latlng": [13, -85],
    "power": 10,
    "borders": ["CR", "HN"]
  },
  "NU": {
    "name": "Niue",
    "latlng": [-19.03333333, -169.86666666],
    "power": 10,
    "borders": []
  },
  "NL": {
    "name": "Netherlands",
    "latlng": [52.5, 5.75],
    "power": 10,
    "borders": ["BE", "DE"]
  },
  "NO": {
    "name": "Norway",
    "latlng": [62, 10],
    "power": 10,
    "borders": ["FI", "SE", "RU"]
  },
  "NP": {
    "name": "Nepal",
    "latlng": [28, 84],
    "power": 10,
    "borders": ["CN", "IN"]
  },
  "NR": {
    "name": "Nauru",
    "latlng": [-0.53333333, 166.91666666],
    "power": 10,
    "borders": []
  },
  "NZ": {
    "name": "New Zealand",
    "latlng": [-41, 174],
    "power": 10,
    "borders": []
  },
  "OM": {
    "name": "Oman",
    "latlng": [21, 57],
    "power": 10,
    "borders": ["SA", "AE", "YE"]
  },
  "PK": {
    "name": "Pakistan",
    "latlng": [30, 70],
    "power": 10,
    "borders": ["AF", "CN", "IN", "IR"]
  },
  "PA": {
    "name": "Panama",
    "latlng": [9, -80],
    "power": 10,
    "borders": ["CO", "CR"]
  },
  "PN": {
    "name": "Pitcairn Islands",
    "latlng": [-25.06666666, -130.1],
    "power": 10,
    "borders": []
  },
  "PE": {
    "name": "Peru",
    "latlng": [-10, -76],
    "power": 10,
    "borders": ["BO", "BR", "CL", "CO", "EC"]
  },
  "PH": {
    "name": "Philippines",
    "latlng": [13, 122],
    "power": 10,
    "borders": []
  },
  "PW": {
    "name": "Palau",
    "latlng": [7.5, 134.5],
    "power": 10,
    "borders": []
  },
  "PG": {
    "name": "Papua New Guinea",
    "latlng": [-6, 147],
    "power": 10,
    "borders": ["ID"]
  },
  "PL": {
    "name": "Poland",
    "latlng": [52, 20],
    "power": 10,
    "borders": ["BY", "CZ", "DE", "LT", "RU", "SK", "UA"]
  },
  "PR": {
    "name": "Puerto Rico",
    "latlng": [18.25, -66.5],
    "power": 10,
    "borders": []
  },
  "KP": {
    "name": "North Korea",
    "latlng": [40, 127],
    "power": 20,
    "borders": ["CN", "KR", "RU"]
  },
  "PT": {
    "name": "Portugal",
    "latlng": [39.5, -8],
    "power": 10,
    "borders": ["ES"]
  },
  "PY": {
    "name": "Paraguay",
    "latlng": [-23, -58],
    "power": 10,
    "borders": ["AR", "BO", "BR"]
  },
  "PS": {
    "name": "Palestine",
    "latlng": [31.9, 35.2],
    "power": 10,
    "borders": ["IL", "EG", "JO"]
  },
  "PF": {
    "name": "French Polynesia",
    "latlng": [-15, -140],
    "power": 10,
    "borders": []
  },
  "QA": {
    "name": "Qatar",
    "latlng": [25.5, 51.25],
    "power": 10,
    "borders": ["SA"]
  },
  "RE": {
    "name": "Réunion",
    "latlng": [-21.15, 55.5],
    "power": 10,
    "borders": []
  },
  "RO": {
    "name": "Romania",
    "latlng": [46, 25],
    "power": 10,
    "borders": ["BG", "HU", "MD", "RS", "UA"]
  },
  "RU": {
    "name": "Russia",
    "latlng": [60, 100],
    "power": 50,
    "borders": ["AZ", "BY", "CN", "EE", "FI", "GE", "KZ", "KP", "LV", "LT", "MN", "NO", "PL", "UA"]
  },
  "RW": {
    "name": "Rwanda",
    "latlng": [-2, 30],
    "power": 10,
    "borders": ["BI", "CD", "TZ", "UG"]
  },
  "SA": {
    "name": "Saudi Arabia",
    "latlng": [25, 45],
    "power": 10,
    "borders": ["IQ", "JO", "KW", "OM", "QA", "AE", "YE"]
  },
  "SD": {
    "name": "Sudan",
    "latlng": [15, 30],
    "power": 10,
    "borders": ["CF", "TD", "EG", "ER", "ET", "LY", "SS"]
  },
  "SN": {
    "name": "Senegal",
    "latlng": [14, -14],
    "power": 10,
    "borders": ["GM", "GN", "GW", "ML", "MR"]
  },
  "SG": {
    "name": "Singapore",
    "latlng": [1.36666666, 103.8],
    "power": 10,
    "borders": []
  },
  "GS": {
    "name": "South Georgia",
    "latlng": [-54.5, -37],
    "power": 10,
    "borders": []
  },
  "SJ": {
    "name": "Svalbard and Jan Mayen",
    "latlng": [78, 20],
    "power": 10,
    "borders": []
  },
  "SB": {
    "name": "Solomon Islands",
    "latlng": [-8, 159],
    "power": 10,
    "borders": []
  },
  "SL": {
    "name": "Sierra Leone",
    "latlng": [8.5, -11.5],
    "power": 10,
    "borders": ["GN", "LR"]
  },
  "SV": {
    "name": "El Salvador",
    "latlng": [13.83333333, -88.91666666],
    "power": 10,
    "borders": ["GT", "HN"]
  },
  "SM": {
    "name": "San Marino",
    "latlng": [43.76666666, 12.41666666],
    "power": 10,
    "borders": ["IT"]
  },
  "SO": {
    "name": "Somalia",
    "latlng": [10, 49],
    "power": 5,
    "borders": ["DJ", "ET", "KE"]
  },
  "PM": {
    "name": "Saint Pierre and Miquelon",
    "latlng": [46.83333333, -56.33333333],
    "power": 10,
    "borders": []
  },
  "RS": {
    "name": "Serbia",
    "latlng": [44, 21],
    "power": 10,
    "borders": ["BA", "BG", "HR", "HU", "XK", "MK", "ME", "RO"]
  },
  "SS": {
    "name": "South Sudan",
    "latlng": [7, 30],
    "power": 10,
    "borders": ["CF", "CD", "ET", "KE", "SD", "UG"]
  },
  "ST": {
    "name": "São Tomé and Príncipe",
    "latlng": [1, 7],
    "power": 10,
    "borders": []
  },
  "SR": {
    "name": "Suriname",
    "latlng": [4, -56],
    "power": 10,
    "borders": ["BR", "GF", "GY"]
  },
  "SK": {
    "name": "Slovakia",
    "latlng": [48.66666666, 19.5],
    "power": 10,
    "borders": ["AT", "CZ", "HU", "PL", "UA"]
  },
  "SI": {
    "name": "Slovenia",
    "latlng": [46.11666666, 14.81666666],
    "power": 10,
    "borders": ["AT", "HR", "IT", "HU"]
  },
  "SE": {
    "name": "Sweden",
    "latlng": [62, 15],
    "power": 20,
    "borders": ["FI", "NO"]
  },
  "SZ": {
    "name": "Swaziland",
    "latlng": [-26.5, 31.5],
    "power": 10,
    "borders": ["MZ", "ZA"]
  },
  "SX": {
    "name": "Sint Maarten",
    "latlng": [18.033333, -63.05],
    "power": 10,
    "borders": ["MF"]
  },
  "SC": {
    "name": "Seychelles",
    "latlng": [-4.58333333, 55.66666666],
    "power": 10,
    "borders": []
  },
  "SY": {
    "name": "Syria",
    "latlng": [35, 38],
    "power": 30,
    "borders": ["IQ", "IL", "JO", "LB", "TR"]
  },
  "TC": {
    "name": "Turks and Caicos Islands",
    "latlng": [21.75, -71.58333333],
    "power": 10,
    "borders": []
  },
  "TD": {
    "name": "Chad",
    "latlng": [15, 19],
    "power": 10,
    "borders": ["CM", "CF", "LY", "NE", "NG", "SS"]
  },
  "TG": {
    "name": "Togo",
    "latlng": [8, 1.16666666],
    "power": 10,
    "borders": ["BJ", "BF", "GH"]
  },
  "TH": {
    "name": "Thailand",
    "latlng": [15, 100],
    "power": 10,
    "borders": ["MM", "KH", "LA", "MY"]
  },
  "TJ": {
    "name": "Tajikistan",
    "latlng": [39, 71],
    "power": 10,
    "borders": ["AF", "CN", "KG", "UZ"]
  },
  "TK": {
    "name": "Tokelau",
    "latlng": [-9, -172],
    "power": 10,
    "borders": []
  },
  "TM": {
    "name": "Turkmenistan",
    "latlng": [40, 60],
    "power": 10,
    "borders": ["AF", "IR", "KZ", "UZ"]
  },
  "TL": {
    "name": "Timor-Leste",
    "latlng": [-8.83333333, 125.91666666],
    "power": 10,
    "borders": ["ID"]
  },
  "TO": {
    "name": "Tonga",
    "latlng": [-20, -175],
    "power": 10,
    "borders": []
  },
  "TT": {
    "name": "Trinidad and Tobago",
    "latlng": [11, -61],
    "power": 10,
    "borders": []
  },
  "TN": {
    "name": "Tunisia",
    "latlng": [34, 9],
    "power": 10,
    "borders": ["DZ", "LY"]
  },
  "TR": {
    "name": "Turkey",
    "latlng": [39, 35],
    "power": 35,
    "borders": ["AM", "AZ", "BG", "GE", "GR", "IR", "IQ", "SY"]
  },
  "TV": {
    "name": "Tuvalu",
    "latlng": [-8, 178],
    "power": 10,
    "borders": []
  },
  "TW": {
    "name": "Taiwan",
    "latlng": [23.5, 121],
    "power": 10,
    "borders": []
  },
  "TZ": {
    "name": "Tanzania",
    "latlng": [-6, 35],
    "power": 10,
    "borders": ["BI", "CD", "KE", "MW", "MZ", "RW", "UG", "ZM"]
  },
  "UG": {
    "name": "Uganda",
    "latlng": [1, 32],
    "power": 10,
    "borders": ["CD", "KE", "RW", "SS", "TZ"]
  },
  "UA": {
    "name": "Ukraine",
    "latlng": [49, 32],
    "power": 10,
    "borders": ["BY", "HU", "MD", "PL", "RO", "RU", "SK"]
  },
  "UY": {
    "name": "Uruguay",
    "latlng": [-33, -56],
    "power": 10,
    "borders": ["AR", "BR"]
  },
  "US": {
    "name": "United States",
    "latlng": [38, -97],
    "power": 50,
    "borders": ["CA", "MX"]
  },
  "UZ": {
    "name": "Uzbekistan",
    "latlng": [41, 64],
    "power": 10,
    "borders": ["AF", "KZ", "KG", "TJ", "TM"]
  },
  "VA": {
    "name": "Vatican City",
    "latlng": [41.9, 12.45],
    "power": 10,
    "borders": ["IT"]
  },
  "VC": {
    "name": "Saint Vincent and the Grenadines",
    "latlng": [13.25, -61.2],
    "power": 10,
    "borders": []
  },
  "VE": {
    "name": "Venezuela",
    "latlng": [8, -66],
    "power": 10,
    "borders": ["BR", "CO", "GY"]
  },
  "VG": {
    "name": "British Virgin Islands",
    "latlng": [18.431383, -64.62305],
    "power": 10,
    "borders": []
  },
  "VI": {
    "name": "United States Virgin Islands",
    "latlng": [18.35, -64.933333],
    "power": 10,
    "borders": []
  },
  "VN": {
    "name": "Vietnam",
    "latlng": [16.16666666, 107.83333333],
    "power": 10,
    "borders": ["KH", "CN", "LA"]
  },
  "VU": {
    "name": "Vanuatu",
    "latlng": [-16, 167],
    "power": 10,
    "borders": []
  },
  "WF": {
    "name": "Wallis and Futuna",
    "latlng": [-13.3, -176.2],
    "power": 10,
    "borders": []
  },
  "WS": {
    "name": "Samoa",
    "latlng": [-13.58333333, -172.33333333],
    "power": 10,
    "borders": []
  },
  "YE": {
    "name": "Yemen",
    "latlng": [15, 48],
    "power": 10,
    "borders": ["OM", "SA"]
  },
  "ZA": {
    "name": "South Africa",
    "latlng": [-29, 24],
    "power": 10,
    "borders": ["BW", "LS", "MZ", "NA", "SZ", "ZW"]
  },
  "ZM": {
    "name": "Zambia",
    "latlng": [-15, 30],
    "power": 10,
    "borders": ["AO", "BW", "CD", "MW", "MZ", "NA", "TZ", "ZW"]
  },
  "ZW": {
    "name": "Zimbabwe",
    "latlng": [-20, 30],
    "power": 10,
    "borders": ["BW", "MZ", "ZA", "ZM"]
  }
};