/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Koa from "koa";
import Router from "koa-router";
import json from "koa-json";
import logger from "koa-logger";

const app = new Koa();
const router = new Router();

router.get("/health", async (ctx, next) => {
  ctx.body = {
    status: "Running",
  };

  await next();
});

app.use(json()).use(logger());
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT ?? "3000";

app.listen(Number(port), () => {
    console.log(`Service started on port: ${port}`);
});