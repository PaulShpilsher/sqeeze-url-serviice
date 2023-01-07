import { UserUrl } from "@prisma/client";
import {
  addShortUrl,
  findByShortUrlCode,
  incrementAccessCount,
} from "../repositories/url.repository";
import { generateShortCode } from "./short-code-generator.service";
import { ServiceError } from "../types/service-error";

const submitUserDefineddUrlCode = async (
  longUrl: string,
  shortUrlCode: string
) => {
  if (!shortUrlCode || shortUrlCode.length < 4) {
    throw new ServiceError(
      "Short code URL must be at lest 4 characters long",
      400
    );
  }

  const userUrl: UserUrl | null = await addShortUrl(longUrl, shortUrlCode);
  if (!userUrl) {
    throw new ServiceError("Short code already exists", 400);
  }

  return userUrl.shortUrlCode;
};

const submitGeneratedUrlCode = async (longUrl: string) => {
  for (let retries = 0; retries < 100; ++retries) {
    const shortUrlCode: string = generateShortCode();
    const userUrl: UserUrl | null = await addShortUrl(longUrl, shortUrlCode);
    if (userUrl != null) {
      console.info(`Generated short URL code in ${retries + 1} try(s)`);
      return userUrl.shortUrlCode;
    }
  }
  throw new ServiceError("Unable to generate unique code", 500);
};

export const submitUrlService = async (
  longUrl: string,
  shortUrlCode?: string
) => {
  // TODO: proper url validation: properly formed and not pointing to another short url
  if (!/^(http|https):\/\//.test(longUrl)) {
    throw new ServiceError("Invalid long URL", 400);
  }

  if (!shortUrlCode) {
    return await submitGeneratedUrlCode(longUrl);
  } else {
    return await submitUserDefineddUrlCode(longUrl, shortUrlCode);
  }
};

export const getLongUrlService = async (shortUrlCode: string) => {
  if (!shortUrlCode) {
    throw new ServiceError("Missing short URL code", 400);
  }

  const userUrl = await findByShortUrlCode(shortUrlCode);
  if (!userUrl) {
    throw new ServiceError("Invalid short url code", 404);
  }
  await incrementAccessCount(userUrl.id);
  return userUrl.longUrl;
};
