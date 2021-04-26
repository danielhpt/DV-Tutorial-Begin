const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    csv = require('csvtojson');

var indexRouter = require('./routes/index'),
    app = express();

const api = {

  init: async function () {

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);

    /**
     * Route that returns a random number between 0 and 500.000
     */
    app.use('/data/getrandom', async function(req, res, next) {

      res.setHeader('Content-Type', 'application/json');
      res.end(
          JSON.stringify({
            label: Math.random().toString(36).substring(7),
            value: Math.floor(Math.random() * 500000)
          }));

    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

  },
  /**
   * Função para ler um ficheiro csv
   * @param csvFilePath
   * @return {Promise<unknown>}
   */
  getJsonFromCsv: async function (csvFilePath) {

    return new Promise((resolve, reject) => {

      csv().fromFile(csvFilePath).then((data, err) => {

        if(err)
          reject(err);

        //console.log(e);
        resolve(data);
      });

    });
  }

};

api.init();

module.exports = app;
