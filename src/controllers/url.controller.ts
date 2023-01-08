/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Koa from "koa";
import url from "node:url";
import { getLongUrlService, getUrlStatsService } from "./../services/url.service";
import { SubmitResponse } from "../model/submit-response";
import { ServiceError } from "./../types/service-error";
import { submitUrlService } from "../services/url.service";
import { SubmitRequest } from "../model/submit-request";
import { StatsResponse } from "../model/stats-response";

const onError = (ctx: any, e: ServiceError | Error | unknown) => {
  let errorDetails: string;
  let status: number;
  if (e instanceof ServiceError) {
    errorDetails = e.toString();
    status = e.code;
  } else {
    errorDetails = JSON.stringify(e, undefined, 2);
    ctx.body = "Server error";
    status = 500;
  }
  console.error("Server error", errorDetails);
  ctx.body = errorDetails;
  ctx.response.status = status;
};

export const submitUrlController = async (ctx: any, next: Koa.Next) => {
  // console.log('ctx.request.protocol', ctx.request.protocol)
  // console.log('ctx.request.headers.host', ctx.request.headers.host)
  //console.log(JSON.stringify(ctx));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  // console.log( ctx.req );

  // TODO: add validation
  try {
    const payload = ctx.request.body as SubmitRequest;
    const shortUrlCode = await submitUrlService(
      payload.longUrl,
      payload.shortUrlCode
    );
    const shortUrl = new url.URL(
      shortUrlCode,
      `${ctx.request.protocol as string}://${
        ctx.request.headers.host as string
      }`
    );

    const result: SubmitResponse = {
      shortUrlCode,
      shortUrl: shortUrl.href,
    };
    ctx.body = result;
    await next();
  } catch (e) {
    onError(ctx, e);
  }
};

export const redirectUrlController = async (ctx: any) => {
  console.log(JSON.stringify(ctx));

  try {
    const { shortUrlCode } = ctx.params as { shortUrlCode: string };
    const longUrl = await getLongUrlService(shortUrlCode);
    const newUrl = url.parse(longUrl);
    ctx.status=301;
    ctx.redirect(newUrl.href);
  } catch (e) { 
    onError(ctx, e);
  }
};

export const getUrlStatsController = async (ctx: any, next: Koa.Next) => {
  try {
    const { shortUrlCode } = ctx.params as { shortUrlCode: string };
    const result: StatsResponse = await getUrlStatsService(shortUrlCode);
    ctx.body = result;
    await next();
  } catch (e) { 
    onError(ctx, e);
  }
};
