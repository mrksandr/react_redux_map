const express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  { ObjectID } = require('mongodb'),
  mongoose = require('mongoose');

mongoose.Promise = global.Promise;

process.env.MONGODB_URI =
  'mongodb://localhost:27017/firstbridge' || process.env.MONGODB_URI;

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

const { Schema } = mongoose;

const addressSchema = new Schema({
  id: String,
  address: String,
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Address = mongoose.model('Address', addressSchema);

const address1 = new Address({
  address: 'Киев, Украина, 02000',
  id: 'ChIJBUVa4U7P1EAR_kYBF9IxSXY',
  location: { lat: '50.4501', lng: '30.5234' },
});
//address1.save();
//console.log(address1);

const app = (module.exports = express());

app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ADDRESS API
app
  .route('/api/address')
  .get((req, res) => {
    Address.find().then(
      addresses => {
        res.send({ addresses });
      },
      e => {
        res.status(400).send(e);
      },
    );
  })
  .post((req, res) => {
    // res.send(req.body);
    const address = new Address(req.body);

    address.save().then(
      address => {
        res.send(address);
      },
      e => {
        res.status(400).send(e);
      },
    );
  });

app.route('/api/address/:id').delete((req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Address.findByIdAndRemove(id)
    .then(address => {
      if (!address) {
        return res.status(404).send();
      }

      res.send({ address });
    })
    .catch(e => {
      res.status(400).send();
    });
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
