import express from "express";
import serverless from "serverless-http";
import { apiRouter } from "../../src/apiRouter";

const app = express();

// Handle requests routed from netlify rewrites
app.use("/.netlify/functions/api", apiRouter);
app.use("/api", apiRouter);
app.use("/", apiRouter);

export const handler = serverless(app);
