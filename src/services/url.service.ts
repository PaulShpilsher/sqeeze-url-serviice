import { addShortUrl } from "./../repositories/url.repository";
import { SubmitResponse } from "../model/submit-response";
import { SubmitRequest } from "../model/submit-request";

export const submitUrlService = async (model: SubmitRequest) => {
  const shortUrlCode = "aaaa";

  const shortUrl = `/${shortUrlCode}`;
  await addShortUrl(model.longUrl, shortUrl, shortUrlCode);
  return {
    shortUrlCode,
  };
};
