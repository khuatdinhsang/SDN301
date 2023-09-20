const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const adminMiddleware = (req, res, next) => {
    const Authorization = req.header('Authorization');
    const token = Authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication'
            })
        }
        console.log("14", user)
        if (user?.roleId === 1) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Access denied'
            })
        }
    })
}
const userMiddleware = (req, res, next) => {
    const Authorization = req.header('Authorization')
    const token = Authorization.replace('Bearer ', '')
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        if (user?.id === userId) {
            req.userId = userId
            next()
        } else {
            return res.status(404).json({
                message: 'Access denied',
                status: 'ERROR'
            })
        }
    })
}
const userMiddlewareByBody = (req, res, next) => {
    const Authorization = req.header('Authorization')
    const token = Authorization.replace('Bearer ', '')
    const userId = req.body.accountId
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        if (user?.id === userId) {
            req.userId = userId
            next()
        } else {
            return res.status(404).json({
                message: 'Access denied',
                status: 'ERROR'
            })
        }
    })
}

// admin or user
const authUserMiddleware = (req, res, next) => {
    const Authorization = req.header('Authorization')
    const token = Authorization.replace('Bearer ', '')
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        if (user?.id === userId || user?.roleId === 1) {
            next()
        } else {
            return res.status(404).json({
                message: 'Access denied',
                status: 'ERROR'
            })
        }
    })
}
const authUserMiddlewareByBody = (req, res, next) => {
    const Authorization = req.header('Authorization')
    const token = Authorization.replace('Bearer ', '')
    const userId = req.body.accountId
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        if (user?.id === userId || user?.roleId === 1) {
            next()
        } else {
            return res.status(404).json({
                message: 'Access denied',
                status: 'ERROR'
            })
        }
    })
}

module.exports = {
    adminMiddleware, userMiddleware, authUserMiddleware,
    userMiddlewareByBody, authUserMiddlewareByBody
}