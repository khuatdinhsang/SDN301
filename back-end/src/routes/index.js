const AccountRouter = require('./AccountRouter.js');
const UserRouter = require('./UserRouter.js');
const routes = (app) => {
    app.use('/api/account', AccountRouter)
    app.use('/api/user', UserRouter)
}
module.exports = routes
