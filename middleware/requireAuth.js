// middleware/requireAuth.js
export default function requireAuth(req, res, next) {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({ error: "Ikke logget ind" });
  }
  next();
}
