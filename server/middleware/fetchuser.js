const fetchUserFunction = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ error: "Access denied" });
    } else {
            req.token=token;
            next();
    }
};

module.exports = fetchUserFunction;
