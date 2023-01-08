import { Prisma, PrismaClient, UserUrl } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserUrlByShortUrlCode = async (
  shortUrlCode: string
): Promise<UserUrl | null> => {
  return await prisma.userUrl.findUnique({
    where: { shortUrlCode },
  });
};

export const createUserUrl = async (
  longUrl: string,
  shortUrlCode: string
): Promise<UserUrl | null> => {
  try {
    const userUrl = await prisma.userUrl.create({
      data: {
        longUrl,
        shortUrlCode,
      },
    });
    // console.log("UserUrl", userUrl);
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

export const createUrlAccessHistory = async (
  userUrlId: number,
  accessedBy: string
) => {
  await prisma.urlAccessHistory.create({
    data: {
      userUrlId,
      accessedBy,
    },
  });
};

export const getUserUrlStatsByShortUrlCode = async (
  shortUrlCode: string
) => {
  return await prisma.userUrl.findUnique({
    where: { shortUrlCode },
    include: {
      _count: {
        select: { accessHistory: true },
      },
      accessHistory: {
        select: { accessedAt: true },
        orderBy: {
          accessedAt: 'desc',
        },
        take: 1,
      },
    },
  });
};
