const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
// require('./seeders/seed');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false
});

require('./routes/api')(app);
require('./routes/html')(app);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
