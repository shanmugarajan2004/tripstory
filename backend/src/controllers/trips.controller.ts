import { Request, Response, NextFunction } from 'express';
import { PrismaClient, TripStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, startDate, endDate, totalBudget, isPublic, destinations } = req.body;
    const userId = (req as any).userId;

    const trip = await prisma.trip.create({
      data: {
        title, description, userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalBudget: parseFloat(totalBudget),
        isPublic: isPublic ?? true,
        destinations: destinations?.length
          ? {
              create: destinations.map((d: any, i: number) => ({
                locationName: d.locationName,
                country: d.country,
                latitude: parseFloat(d.latitude),
                longitude: parseFloat(d.longitude),
                order: i,
                arrivalDate: d.arrivalDate ? new Date(d.arrivalDate) : undefined,
                departDate: d.departDate ? new Date(d.departDate) : undefined,
                nights: d.nights ? parseInt(d.nights) : undefined,
                notes: d.notes,
                activities: d.activities?.length
                  ? { create: d.activities.map((a: any) => ({ name: a.name, type: a.type, time: a.time, cost: a.cost, notes: a.notes })) }
                  : undefined,
              })),
            }
          : undefined,
      },
      include: {
        destinations: { orderBy: { order: 'asc' }, include: { activities: true } },
        user: { select: { id: true, name: true, avatar: true } },
      },
    });

    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
};

export const getTrips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const { status, page = 1, limit = 20 } = req.query;

    const trips = await prisma.trip.findMany({
      where: {
        userId,
        ...(status ? { status: status as TripStatus } : {}),
      },
      include: {
        destinations: { orderBy: { order: 'asc' }, take: 3 },
        _count: { select: { destinations: true, expenses: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    const total = await prisma.trip.count({ where: { userId } });
    res.json({ trips, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
};

export const getTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        destinations: { orderBy: { order: 'asc' }, include: { activities: true } },
        expenses: { orderBy: { date: 'desc' } },
        story: { select: { id: true, title: true, published: true } },
        user: { select: { id: true, name: true, avatar: true } },
        _count: { select: { expenses: true } },
      },
    });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const userId = (req as any).userId;
    if (!trip.isPublic && trip.userId !== userId) {
      return res.status(403).json({ error: 'This trip is private' });
    }

    res.json(trip);
  } catch (err) {
    next(err);
  }
};

export const updateTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const existing = await prisma.trip.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Trip not found' });
    if (existing.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    const { title, description, startDate, endDate, totalBudget, status, isPublic } = req.body;

    const trip = await prisma.trip.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(totalBudget && { totalBudget: parseFloat(totalBudget) }),
        ...(status && { status }),
        ...(isPublic !== undefined && { isPublic }),
      },
      include: { destinations: { orderBy: { order: 'asc' } } },
    });

    res.json(trip);
  } catch (err) {
    next(err);
  }
};

export const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const existing = await prisma.trip.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Trip not found' });
    if (existing.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.trip.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getBudgetSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const expenses = await prisma.expense.groupBy({
      by: ['category'],
      where: { tripId: id },
      _sum: { amount: true },
      _count: true,
    });

    const total = expenses.reduce((acc, e) => acc + (e._sum.amount || 0), 0);
    res.json({ expenses, total });
  } catch (err) {
    next(err);
  }
};
