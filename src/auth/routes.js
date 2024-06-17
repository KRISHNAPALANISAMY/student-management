const express = require('express');
const router = express.Router();
const { login } = require('./controller');

router.post('/login', login);
router.get('/interface', (req, res) => {
  res.sendFile(path.join(__dirname, '../../crud.html'));
});

module.exports = router;
