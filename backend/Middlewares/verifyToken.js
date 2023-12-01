const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const createActivationToken = (email) => {
    return jwt.sign({email}, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'})
}

const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '20s'})
}

const verifyEmail = (req, res, next) => {
    const token = req.body.activation_token;
    if(token) {
        jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET, (err, user) => {
            if(err){ 
                if(err) {
                    return res.status(401).json({ message: "This Activation Email is unavailable!" });
                }
            };
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("This Email is Invalid!");
    }
}

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({ message: "Not authorized as an admin"})
    }
}

module.exports = {
    generateToken,
    verifyEmail,
    createAccessToken,
    createActivationToken,
    createRefreshToken,
    admin
}