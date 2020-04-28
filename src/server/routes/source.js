const express = require('express');
const fileHelper = require('../helpers/file');

const router = express.Router();

// GET /source
router.get('/', async (req, res) => {
  // TODO: Help function을 이용하여, source.txt의 내용을 반환 수 있도록 구현하세요.
  let text = await fileHelper.readSourceListFile();
  res.status(200).send(text);
});

// POST /source
router.post('/', async (req, res) => {
  // TODO: Help function을 이용하여, source.txt의 내용으로 저장할 수 있도록 구현하세요.
  let body = await fileHelper.writeSourceListFile(req.body);
  res.status(201).send(body);
});

module.exports = router;
