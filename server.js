/* Node modules */
  const express = require('express');
  const bodyParser = require('body-parser');
  const compress = require('compression');


/* Config */
  const config = require('./config/config');

/*  Mongoose Schemas */
  const video = require('./models/video');

/* Express Routes */
  const routes = require('./routes/routes');

/* Init */
  const app = express();

  const port = process.env.PORT || 3000;
  /* Serving Static Files */
    app.use(express.static('public'));
  /* BodyParser */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));
  /* GZIP Compression */
    app.use(compress());
  /* Routes init */
    app.use('/getVideos', routes);
    app.use('/getuserdata', routes);
    app.use('/', routes)
    app.use('/pictures', routes)
    app.use('/video', routes);
    app.use('/login', routes);
    app.use('/signup', routes);
    app.use('/subs', routes);
    app.use('/subz', routes)
  /* Server set up */
    app.listen(port, () => {
      console.log('Server running on port ' + port);
    })
