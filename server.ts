import express from "express";
import path from "path";
import "dotenv/config";
import { createServer as createViteServer } from "vite";
import { apiRouter } from "./src/apiRouter";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Mount API router
  app.use("/api", apiRouter);

  // Global Express error handler for API requests
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.originalUrl && req.originalUrl.startsWith("/api")) {
      console.error("[Express API Error]:", err);
      return res.status(500).json({ error: err?.message || "Internal server error" });
    }
    next(err);
  });

  // Mount Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Digital Sate Hub server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
