/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Koa from "koa";
import Router from "koa-router";
import json from "koa-json";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import { SubnitRequest } from "./types/submit.request";

const app = new Koa();
const router = new Router();

router.get("/health", async (ctx, next) => {
  ctx.body = { status: "Running" };
  await next();
});

router.post("/submit", async (ctx, next) => {
  const { url } = ctx.request.body as SubnitRequest;
  ctx.body = { msg: 'req', url: url };
  await next();
});

app.use(json()).use(logger()).use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT ?? "3000";
app.listen(Number(port), () => {
  console.log(`Service started on port: ${port}`);
});
