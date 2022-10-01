require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes/index');
const errorServer = require('./errors/serverError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: false,
});
app.use(cors({
  origin: [
    'https://localhost:3000',
    'http://localhost:3000',
    'https://mesto-frontend.nomore.nomoredomains.icu',
    'http://mesto-frontend.nomore.nomoredomains.icu',
  ],
  credentials: true,
}));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorServer);

app.listen(PORT, () => {
});
