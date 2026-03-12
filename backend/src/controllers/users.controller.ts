import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;
    const user = await prisma.user.findFirst({
      where: { name: { equals: username, mode: 'insensitive' } },
      select: {
        id: true, name: true, avatar: true, bio: true,
        location: true, website: true, instagram: true, createdAt: true,
        stories: {
          where: { published: true },
          select: { id: true, title: true, location: true, images: true, createdAt: true, _count: { select: { likes: true } } },
          take: 6,
          orderBy: { createdAt: 'desc' },
        },
        trips: {
          where: { isPublic: true },
          select: { id: true, title: true, coverImage: true, startDate: true, endDate: true, status: true },
          take: 9,
          orderBy: { startDate: 'desc' },
        },
        _count: { select: { trips: true, stories: true, followers: true, following: true } },
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: followingId } = req.params;
    const followerId = (req as any).userId;

    if (followerId === followingId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const existing = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });

    if (existing) {
      await prisma.follow.delete({
        where: { followerId_followingId: { followerId, followingId } },
      });
      return res.json({ following: false });
    }

    await prisma.follow.create({ data: { followerId, followingId } });
    res.json({ following: true });
  } catch (err) {
    next(err);
  }
};

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;

    const [trips, stories, countries, totalLikes] = await Promise.all([
      prisma.trip.count({ where: { userId } }),
      prisma.story.count({ where: { userId, published: true } }),
      prisma.destination.findMany({
        where: { trip: { userId } },
        select: { country: true },
        distinct: ['country'],
      }),
      prisma.like.count({ where: { story: { userId } } }),
    ]);

    res.json({ trips, stories, countries: countries.length, likes: totalLikes });
  } catch (err) {
    next(err);
  }
};
