import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

// CORP "same-origin" (Helmet default) blocks cross-origin SPAs from reading JSON
// even when CORS allows the request — use "cross-origin" for a public API + separate frontend.
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Reflect request Origin so any deployed frontend (Vercel/Netlify previews, etc.) works
// without maintaining CLIENT_ORIGIN. Auth uses Bearer JWT, not cookies.
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(limiter);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
