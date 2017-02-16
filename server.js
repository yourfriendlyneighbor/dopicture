/* Node modules */
  const express = require('express');
  const bodyParser = require('body-parser');

/* Config */
  const config = require('./config/config');

/*  Mongoose Schemas */
  const video = require('./models/video');

/* Express Routes */
  const routes = require('./routes/routes')

/* Init */
  const app = express();

  const port = process.env.PORT || 3000;

  app.use(express.static('public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended : true }));

/* Routes init */
  app.use('/', routes);
  app.use('/logout', routes);
  app.use('/getVideos', routes);
  app.use('/video', routes);

/* Server set up */
  app.listen(port, () => {
    console.log('Server running on port ' + port);
  })
