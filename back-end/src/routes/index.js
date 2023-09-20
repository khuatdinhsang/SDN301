const AccountRouter = require('./AccountRouter.js');
const UserRouter = require('./UserRouter.js');
const CategoryRouter = require('./CategoryRouter.js');
const SubCategoryRouter = require('./SubCategoryRouter.js');
const ProductRouter = require('./ProductRouter.js');
const FeedbackRouter = require('./FeedbackRouter.js');
const routes = (app) => {
    /**
     * @openapi
     * /test-swagger:
     *   get:
     *     tag: 
     *       description: TestSwagger
     *       responses:
     *         200:
     *           description: Swagger is running 
     */
    app.get('/test-swagger', (req, res) => res.sendStatus(200))
    app.use('/api/account', AccountRouter)
    app.use('/api/user', UserRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/subCategory', SubCategoryRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/feedback', FeedbackRouter)
}
module.exports = routes
