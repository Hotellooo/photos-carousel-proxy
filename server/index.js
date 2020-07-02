const express = require('express');
const app = express();

const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const calendar = 'http://localhost:3001';
const carousel = 'http://localhost:3002';
const about = 'http://localhost:3003';
const reviews = 'http://localhost:3004';

app.use( express.static( path.join(__dirname, '/../public') ) );

// app.get('/', (req, res) => {
//   console.log('get');
//   res.send('hi');
//   // res.sendFile( path.join(__dirname, '/../public') );
// });

// CALENDAR
app.all('/api/calendar/db/*', (req, res) => {
  console.log('redirecting to calendar');
  apiProxy.web(req, res, { target: calendar, changeOrigin: true });
});
app.all('/api/calendar/update/', (req, res) => {
  console.log('redirecting to calendar');
  apiProxy.web(req, res, { target: calendar, changeOrigin: true });
});

// PHOTO CAROUSEL
// app.all('/carousel/*', (req, res) => {
//   console.log('redirecting to carousel');
//   apiProxy.web(req, res, { target: carousel, changeOrigin: true });
// });
// app.all('/api/:hotelID/photos', (req, res) => {
//   console.log('redirecting to carousel');
//   apiProxy.web(req, res, { target: carousel, changeOrigin: true });
// });
app.all('/api/:hotelId/photos', (req, res) => {
  console.log('redirecting to photos-carousel server');
  apiProxy.web(req, res, {target: carousel, changeOrigin: true});
});

// ABOUT
app.all('/api/photos/*', (req, res) => {
  console.log('redirecting to about');
  apiProxy.web(req, res, { target: about, changeOrigin: true });
});

// REVIEWS
app.all('/reviews/*', (req, res) => {
  console.log('redirecting to reviews');
  apiProxy.web(req, res, { target: reviews, changeOrigin: true });
});

app.listen(3000, () => console.log(`listening on port 3000`));
