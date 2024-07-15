import jwt from "jsonwebtoken";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
};
export const verifyToken = (req, res, next) => {
    const token = req.signedCookies['auth_token'];
    console.log(req.signedCookies);
    if (!token) {
        console.log(token, 'HIIII😫😪😯');
        return res.status(401).json({ message: "Token not provided" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token expired " });
            }
            else {
                console.log('Token varification successful');
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map