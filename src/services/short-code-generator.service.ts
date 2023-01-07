import { customAlphabet } from "nanoid/async";

const alphanumeric =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const nanoid = customAlphabet(alphanumeric as string, 6);

export const generateShortCode = async (): Promise<string> => {
  return await nanoid();
};
