require('newrelic');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3030;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use('/hostels/:hostel_id', express.static(path.join(__dirname, '../public')));
app.get('/loaderio-409b4cba3c607e7d081c531c6ce14701/', (req, res) => {
  res.send('loaderio-409b4cba3c607e7d081c531c6ce14701');
});
// API reroutes



// Image carousel service
app.use('/api/hostels/:hostel_id/images', createProxyMiddleware({ target: 'http://3.22.143.147', changeOrigin: true }));
// availability service
app.use('/api/hostels/:hostelId/rooms', createProxyMiddleware({ target: 'http://54.219.128.189', changeOrigin: true }));
// description map rules service
app.use('/api/house/:id/hostel', createProxyMiddleware({ target: 'http://18.216.130.250', changeOrigin: true }));
app.use('/api/house/:id/description', createProxyMiddleware({ target: 'http://18.216.130.250', changeOrigin: true }));
app.use('/api/house/:id/rules', createProxyMiddleware({ target: 'http://18.216.130.250', changeOrigin: true }));
app.use('/api/house/:id/address', createProxyMiddleware({ target: 'http://18.216.130.250', changeOrigin: true }));
// reviews service
app.use('/api/reviews', createProxyMiddleware({ target: 'http://3.23.12.160:3001', changeOrigin: true }));


app.listen(PORT, () => console.log('Proxy Server listening on port ', PORT));