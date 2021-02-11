const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const searchRouter = require('./search.js');
const accountRouter = require('./account');
const tradeRouter = require('./trade');

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use('/search', searchRouter);

router.use('/create-account', accountRouter);

router.use('/trade', tradeRouter);

module.exports = router;
