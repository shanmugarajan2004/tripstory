import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const { title, content, excerpt, location, images, tags, tripId, published } = req.body;

    const story = await prisma.story.create({
      data: {
        userId, title, content, location,
        excerpt: excerpt || content.slice(0, 160) + '...',
        images: images || [],
        tags: tags || [],
        tripId: tripId || undefined,
        published: published ?? false,
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        _count: { select: { likes: true, comments: true } },
      },
    });

    res.status(201).json(story);
  } catch (err) {
    next(err);
  }
};

export const getStories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 12, tag, location, search } = req.query;

    const where: any = { published: true };
    if (tag) where.tags = { has: tag as string };
    if (location) where.location = { contains: location as string, mode: 'insensitive' };
    if (search) where.OR = [
      { title: { contains: search as string, mode: 'insensitive' } },
      { content: { contains: search as string, mode: 'insensitive' } },
      { location: { contains: search as string, mode: 'insensitive' } },
    ];

    const [stories, total] = await Promise.all([
      prisma.story.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          _count: { select: { likes: true, comments: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      prisma.story.count({ where }),
    ]);

    res.json({ stories, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
};

export const getStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const story = await prisma.story.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true, bio: true } },
        trip: { include: { destinations: { orderBy: { order: 'asc' } } } },
        comments: {
          include: { user: { select: { id: true, name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });

    if (!story) return res.status(404).json({ error: 'Story not found' });

    // Increment views
    await prisma.story.update({ where: { id }, data: { views: { increment: 1 } } });

    res.json(story);
  } catch (err) {
    next(err);
  }
};

export const likeStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const existing = await prisma.like.findUnique({
      where: { storyId_userId: { storyId: id, userId } },
    });

    if (existing) {
      await prisma.like.delete({ where: { storyId_userId: { storyId: id, userId } } });
      return res.json({ liked: false });
    }

    await prisma.like.create({ data: { storyId: id, userId } });
    res.json({ liked: true });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const { content } = req.body;

    const comment = await prisma.comment.create({
      data: { storyId: id, userId, content },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

export const deleteStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const story = await prisma.story.findUnique({ where: { id } });
    if (!story) return res.status(404).json({ error: 'Story not found' });
    if (story.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.story.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
