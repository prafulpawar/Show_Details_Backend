const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports.isAuth = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send({
                message: 'Not authorized',
                status: 'failed',
                data: null,
                success: false,
            })
        }
        const ExistsUser = JWT.verify(token, 'secret');
        req.user = await userModel.findById(ExistsUser)
        if (!req.user) {
            return res.status(404).json({
                message: 'User not found',
                status: 'failed',
                success: false,
            });
        }

        next();

    }
    catch (error) {
        return res.status(401).send({
            message: 'Invalid or expired token',
            status: 'failed',
            success: false,
        })
    }
}