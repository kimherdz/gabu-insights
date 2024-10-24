var express = require('express');
var router = express.Router();

// Ruta GET para devolver datos
router.get('/data', function (req, res, next) {
  res.json({ message: 'Hola desde tu API en AWS!' });
});

module.exports = router;