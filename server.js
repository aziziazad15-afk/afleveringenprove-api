// server.js Den samler alt: forbinder til databasen, sætter CORS op (tillader frontend på port 3000 at tale med den), sætter session-cookies op, og fortæller Express hvilke routes der findes (/api/menu, /api/auth, /api/contact).

// Indlæser variabler fra .env-filen ind i process.env, så de kan bruges nedenfor (fx PORT, SESSION_SECRET)
import "dotenv/config";
// Henter Express-frameworket, som bruges til at lave web-serveren og dens routes
import express from "express";
// Henter CORS-middleware, så andre domæner (fx frontend på en anden port) må kalde API'et
import cors from "cors";
// Henter cookie-session, som gemmer login/session-data i en cookie hos brugeren
import cookieSession from "cookie-session";

// Kører db.js, som opretter forbindelse til databasen (koden i filen udføres bare ved import)
import "./db.js";
// Henter alle routes der har med menuen at gøre (fx hente/oprette/redigere retter)
import menuRoutes from "./routes/menu.js";
// Henter alle routes der har med login/auth at gøre
import authRoutes from "./routes/auth.js";
// Henter alle routes der har med kontaktformularen at gøre
import contactRoutes from "./routes/contact.js";

const app = express(); /* express er en funktion. får du en helt ny, tom "app" tilbage — et objekt der har en masse indbyggede funktioner du kan bruge (app.use, app.get, app.listen */

// Render tager imod https og sender almindelig http videre internt til vores server.
// Uden denne linje tror Express derfor requestet IKKE er sikkert, og nægter at sætte
// "secure"-cookien (browseren ville alligevel afvise den over http).
app.set("trust proxy", 1);

app.use(
  /* "kør denne kode for alle requests, uanset hvilken adresse de rammer." */
  cors({
    origin: process.env.CORS_ORIGIN, // fx http://localhost:3000 — kun dette domæne må kalde API'et
    credentials: true, // tillader at browseren sender session-cookien med
  })
);
// Gør at Express automatisk læser JSON i request-body'en og gør den tilgængelig som req.body
app.use(express.json());
// Sandt når serveren kører deployet på Render (vi sætter selv IS_PRODUCTION=true der), falsk lokalt
const isProduction = process.env.IS_PRODUCTION === "true";

// Sætter session-cookien op, så vi kan huske om en bruger er logget ind mellem requests
app.use(
  cookieSession({
    name: "session", // navnet på cookien i browseren
    keys: [process.env.SESSION_SECRET], // hemmelig nøgle brugt til at signere/kryptere cookien
    maxAge: 24 * 60 * 60 * 1000, // 24 timer
    // "none" er nødvendig når frontend og backend er to forskellige RIGTIGE domæner (fx Vercel + Render).
    // Lokalt er localhost:3000/:4000 "samme sted" for browseren, så "lax" er nok der.
    sameSite: isProduction ? "none" : "lax",
    // "none" kræver secure:true (cookien sendes kun over https) — det har vi kun i produktion, ikke lokalt (http)
    secure: isProduction,
  })
);

// Alle requests der starter med /api/menu bliver sendt videre til menuRoutes
app.use("/api/menu", menuRoutes);
// Alle requests der starter med /api/auth bliver sendt videre til authRoutes
app.use("/api/auth", authRoutes);
// Alle requests der starter med /api/contact bliver sendt videre til contactRoutes
app.use("/api/contact", contactRoutes);

// En simpel forsideroute, så man kan tjekke at serveren kører, når man åbner roden ("/") i browseren
app.get("/", (req, res) => {
  res.send("afleveringenprove-api kører");
});

// Bruger porten fra .env, hvis den findes, ellers 4000 som standard
const PORT = process.env.PORT || 4000;
// Starter serveren og lytter på den valgte port
app.listen(PORT, () => {
  console.log(`Server kører på http://localhost:${PORT}`);
});
