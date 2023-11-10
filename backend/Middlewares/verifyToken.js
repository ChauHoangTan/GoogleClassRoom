import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const verify = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){ 
                res.status(403);
                throw new Error("Token is not valid!");
            };
            req.user = user;
            console.log(req.user);
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

export {generateToken, verify}