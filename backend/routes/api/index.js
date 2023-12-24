// backend/routes/api/index.js
const router = require('express').Router();
const expensesRouter = require('./expensesREST.js');
const usersRouter = require('./usersREST.js');

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

router.use('/expenses', expensesRouter)
router.use('/users', usersRouter)


module.exports = router;