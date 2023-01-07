import { submitUrlService } from './../services/url.controller';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Koa from "koa";
import { SubmitRequest } from "src/model/submit-request";

export const submitUrlController = async (ctx: any, next: Koa.Next) => {
    // TODO: add validation
    const payload = ctx.request.body as SubmitRequest;
    ctx.body = submitUrlService(payload); 
    await next();
};