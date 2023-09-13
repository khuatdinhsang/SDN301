const AccountRouter = require('./AccountRouter.js');
const routes = (app) => {
    app.use('/api/account', AccountRouter)
}
module.exports = routes
