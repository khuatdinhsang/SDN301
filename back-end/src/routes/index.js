const AccountRouter = require('./AccountRouter.js');
const UserRouter = require('./UserRouter.js');
const CategoryRouter = require('./CategoryRouter.js');
const SubCategoryRouter = require('./SubCategoryRouter.js');
/**
 * @openapi
 * /test-swagger:
 *   get:
 *     tag:
 *       - TestSwagger
 *       description: TestSwagger
 *       responses:
 *         200:
 *           description: Swagger is running 
 */

const routes = (app) => {
    app.get('/test-swagger', (req, res) => res.sendStatus(200))
    app.use('/api/account', AccountRouter)
    app.use('/api/user', UserRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/subCategory', SubCategoryRouter)
}
module.exports = routes
