import jwt from "jsonwebtoken"

export const generateAccessToken = (payload) => {
    return jwt.sign({ email: payload }, process.env.SECRET_KEY, { expiresIn: "2m" })
}

export const generateRefreshToken = (payload) => {
    return jwt.sign({ email: payload }, process.env.REFRESH_KEY, { expiresIn: "10m" })
}

export const verifyToken = (email, token) => {
    try {
        const decode = jwt.verify(token, process.env.REFRESH_KEY)
        return decode.email === email
    } catch (error) {
        return false
    }
}