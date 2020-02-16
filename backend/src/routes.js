const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')

const SessionController = require('./controller/SessionController');
const SpotController = require('./controller/SpotController');
const DashboardController = require('./controller/DashboardController');
const BookingController = require('./controller/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;