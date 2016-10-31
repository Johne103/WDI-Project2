const express         = require ('express');
const morgan          = require ('morgan');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const routes          = require('./config/routes');
const profileRoutes   = require('./config/profileRoutes');
const app             = express();
const port            = process.env.PORT || 8000;

let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/WDI-Project2';

mongoose.connect(mongoUri);

app.use(express.static(`${__dirname}/public`));
app.get(`/profile`, (req,res) => express.static(`${__dirname}/profile`));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/games', routes);
app.use('/api/profile', profileRoutes);
app.use('/api', routes);

app.listen(port,() => console.log(`running on port: ${port}`));
