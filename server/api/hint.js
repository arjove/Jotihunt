const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  models.Hint.findAll({
    include: [models.HintType, models.User, models.Subarea],
  }).then((hints) => {
    res.send(hints);
  });
});

router.get('/:type', (req, res) => {
  models.Hint.findAll({
    include: [{
      model: models.HintType,
      where: {
        name: req.params.type,
      },
    }, models.User, models.Subarea],
  }).then((hints) => {
    res.send(hints);
  });
});

router.get('/delete/:hintId', (req, res) => {
  models.Hint.destroy({
    where: {
      id: req.params.hintId
    }
  }).then(() => {
    res.send({message: 'success'});
  })
});

router.post('/', (req, res) =>
  res.send(200)
);

module.exports = router;
