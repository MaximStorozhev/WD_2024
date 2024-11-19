export const authMiddleware = ({ session }, res, next) => {
    if (!session.user) {
        return res.status(401).send({ success: false })
    }
}