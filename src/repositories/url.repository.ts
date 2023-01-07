import { Prisma, PrismaClient, UserUrl } from "@prisma/client";

const prisma = new PrismaClient();

export const findByShortUrlCode = async (
  shortUrlCode: string
): Promise<UserUrl | null> => {
  return await prisma.userUrl.findUnique({
    where: { shortUrlCode },
  });
};

export const addShortUrl = async (
  longUrl: string,
  shortUrlCode: string
): Promise<UserUrl | null> => {
  try {
    await prisma.userUrl.findUnique({
      where: { shortUrlCode },
    });

    const userUrl = await prisma.userUrl.create({
      data: {
        longUrl,
        shortUrlCode
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
