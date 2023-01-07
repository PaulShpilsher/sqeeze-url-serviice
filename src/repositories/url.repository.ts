import { Prisma, PrismaClient, UserUrl } from "@prisma/client";

const prisma = new PrismaClient();

export const addShortUrl = async (
  longUrl: string,
  shortUrl: string,
  shortUrlCode: string
): Promise<UserUrl | null> => {
  try {
    const userUrl = await prisma.userUrl.create({
      data: {
        longUrl,
        shortUrlCode,
        shortUrl,
      },
    });
    console.log("UserUrl", userUrl);
    return userUrl;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.error(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
        return null;
      }
    }
    throw e;
  }
};
