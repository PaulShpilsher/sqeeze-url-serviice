/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Koa from "koa";
import Router from "koa-router";
import json from "koa-json";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import {
  submitUrlController,
  getUrlStatsController,
  redirectUrlController,
} from "./controllers/url.controller";

const router = new Router();
router.get("/", async (ctx, next) => {
  ctx.body = "Welcome";
  await next();
});
router.get("/:shortUrlCode", redirectUrlController);
router.get("/:shortUrlCode/stats", getUrlStatsController);
router.post("/submit", submitUrlController);

const app = new Koa();
app.use(json()).use(logger()).use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT ?? "3000";
app.listen(Number(port), () => {
  console.log(`Service started on port: ${port}`);
});
