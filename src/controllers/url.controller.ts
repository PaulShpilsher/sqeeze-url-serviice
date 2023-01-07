import { SubmitResponse } from "./../model/submit-response";
import { ServiceError } from "./../types/service-error";
import { submitUrlService } from "../services/url.service";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Koa from "koa";
import { SubmitRequest } from "../model/submit-request";

const onError = (ctx: any, e: ServiceError | Error | unknown) => {
  let errorDetails: string;
  let status: number;
  if (e instanceof ServiceError) {
    errorDetails = e.toString();
    console.error("Service error", errorDetails);
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
  console.log(JSON.stringify(ctx));

  // TODO: add validation
  const payload = ctx.request.body as SubmitRequest;
  try {
    const shortUrlCode = await submitUrlService(
      payload.longUrl,
      payload.shortUrlCode
    );
    const result: SubmitResponse = {
      shortUrlCode,
      shortUrl: ''
    };
    ctx.body = result;
    await next();
  } catch (e) {
    onError(ctx, e);
  }
};
