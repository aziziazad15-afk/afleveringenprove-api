// dørvagt"-funktion. Bruges inde i menu.js på de routes der kræver login (opret/ret/slet), for at tjekke om man er logget ind, før man må komme videre
export default function requireAuth(req, res, next) {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({ error: "Ikke logget ind" });
  }
  next();
}
