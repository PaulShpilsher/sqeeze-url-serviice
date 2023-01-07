import { UserUrl } from "@prisma/client";
import { addShortUrl } from "./../repositories/url.repository";
import { SubmitResponse } from "../model/submit-response";
import { SubmitRequest } from "../model/submit-request";
import { ServiceError } from "..//types/service-error";
import { generateShortCode } from "./short-code-generator.service";

export const submitUrlService = async (model: SubmitRequest) => {
  // TODO: proper url validation: properly formed and not pointing to another short url
  if (!/^(http|https):\/\//.test(model.longUrl)) {
    throw new ServiceError("Invalid long URL", 400);
  }

  let userUrl: UserUrl | null;

  if (model.shortUrlCode) {
    if (model.shortUrlCode.length < 4) {
      throw new ServiceError(
        "Short code URL must be at lest 4 characters long",
        400
      );
    }

    userUrl = await addShortUrl(model.longUrl, model.shortUrlCode);
    if (!userUrl) {
      throw new ServiceError("Short code already exists", 400);
    }
  }
  else {
    do {
      const shortUrlCode = await generateShortCode();
      userUrl = await addShortUrl(model.longUrl, shortUrlCode);
    }
    while(!userUrl);
  }

  return userUrl;
};
