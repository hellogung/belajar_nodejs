import jwt from "jsonwebtoken"

export const isAuthenticate = (req, res, next) => {
    try {
        const authorization = req.get("authorization")
        if (!authorization) { return res.status(400).json({ success: false, msg: "Authorization header not found" }) }

        const token = authorization.split(" ")[1]
        if (!token) { return res.status(404).json({ success: false, msg: "Token not found" }) }

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        req.email = decode.email
        next()

    } catch (error) {
        return res.status(401).json({ success: false, msg: error.message });
    }
}