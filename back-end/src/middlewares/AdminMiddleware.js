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
    })
    if (user?.role?.roleId === 1) {
        next()
    } else {
        return res.status(404).json({
            status: 'ERR',
            message: 'The authentication'
        })
    }

}