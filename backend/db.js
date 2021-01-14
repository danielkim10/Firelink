const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TournamentManager', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
  if (!err)
    console.log('MongoDB connection success');
  else
    console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2));
});
mongoose.set('debug', true);

module.exports = mongoose;
