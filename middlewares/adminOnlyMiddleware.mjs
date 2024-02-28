const sendNotAdminError = (res) => res.status(401).json({ message: "you can't do this action." });

const adminOnlyMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return sendNotAdminError(res);
    }
    next();
};

export default adminOnlyMiddleware;
