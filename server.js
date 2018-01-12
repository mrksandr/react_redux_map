var express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path');

var mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

var app = (module.exports = express());

app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ADDRESS API
app.route('/api/address').get(function(req, res) {
  res.json({ asd: 5 });
});

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(
      middleware.fileSystem.readFileSync(
        path.join(__dirname, 'public/index.html'),
      ),
    );
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/public'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

// Starting express server
http.createServer(app).listen(app.get('port'), () => {
  console.log('------------------------------------');
  console.log('server started - ', app.get('port'));
  console.log('------------------------------------');
});
