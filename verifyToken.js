import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
    if (req.method === 'GET' || req.method === 'DELETE') {
        const { token } = req.query
        if (!token) return next(createError(401, "You are not authenticated"))
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Token is not valid"))
            req.user = user
            next()
        })
    } else {
        let { token } = req.body
        if (!token) return next(createError(401, "You are not authenticated"))
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return next(createError(403, "Token is not valid"))
            req.user = user
            next()
        })
    }

}