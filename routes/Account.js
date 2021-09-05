const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
  res.json({
      messeage: "Account"
  })
})

module.exports = router;