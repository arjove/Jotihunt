const express = require('express');
const models = require('../models');
const router = express.Router();
const checkJwt = require('./../checkJwt');

const {
  REFRESH_CARS,
  REFRESH_HINTS,
  REFRESH_STATUS,
  REFRESH_ARTICLES,
  REFRESH_GROUPS,
} = require('../socket_actions');

router.get('/', checkJwt, (req, res) => {
  models.Car.findAll({}).then((cars) => {
    res.send(cars);
  });
});

router.get('/refresh', (req, res) => {
  req.io.sockets.emit(REFRESH_HINTS);
  req.io.sockets.emit(REFRESH_STATUS);
  req.io.sockets.emit(REFRESH_CARS);
  req.io.sockets.emit(REFRESH_GROUPS);
  req.io.sockets.emit(REFRESH_ARTICLES);

  res.sendStatus(200);
});


router.post('/', (req, res) => {
  models.Car.findOne({
    where: {
      name: req.body.name,
    },
  }).then((result) => {
    const speed = req.body.speed ? req.body.speed * 3.6 : 0;
    models.CarHistory.create({
      name: req.body.name,
      speed,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    // TODO: Make update to Socket to do a live website update

    if (result) { // update
      return result.update({
        speed,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });
    }
    return models.Car.create({
      name: req.body.name,
      speed,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
  }).then(() => {
    req.io.sockets.emit(REFRESH_CARS);
  });
  res.sendStatus(200);
});


router.post('/weblocation', checkJwt, (req, res) => {
  const firebase = firebase.auth().currentUser;
  models.Car.findOne({
    where: {
      name: firebase.name,
    },
  }).then((result) => {
    const speed = req.body.speed ? req.body.speed * 3.6 : 0;
    models.CarHistory.create({
      name: firebase.name,
      speed,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });

    if (result) { // update
      return result.update({
        speed,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });
    }
    return models.Car.create({
      name: firebase.name,
      speed,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
  }).then(() => {
    req.io.sockets.emit(REFRESH_CARS);
  });
});

module.exports = router;
