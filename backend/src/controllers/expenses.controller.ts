import { Request, Response, NextFunction } from 'express';
import { PrismaClient, ExpenseCategory } from '@prisma/client';

const prisma = new PrismaClient();

export const addExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const { tripId, category, amount, currency, description, date, receipt } = req.body;

    // Verify trip ownership
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    if (trip.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    const expense = await prisma.expense.create({
      data: {
        tripId,
        category: category as ExpenseCategory,
        amount: parseFloat(amount),
        currency: currency || 'USD',
        description,
        date: new Date(date),
        receipt,
      },
    });

    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

export const getExpensesByTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tripId } = req.params;
    const userId = (req as any).userId;

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    if (trip.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    const expenses = await prisma.expense.findMany({
      where: { tripId },
      orderBy: { date: 'desc' },
    });

    // Aggregate by category
    const byCategory = await prisma.expense.groupBy({
      by: ['category'],
      where: { tripId },
      _sum: { amount: true },
      _count: true,
    });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.json({ expenses, byCategory, total, budget: trip.totalBudget });
  } catch (err) {
    next(err);
  }
};

export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const { category, amount, currency, description, date } = req.body;

    const expense = await prisma.expense.findUnique({
      where: { id },
      include: { trip: { select: { userId: true } } },
    });

    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    if (expense.trip.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    const updated = await prisma.expense.update({
      where: { id },
      data: {
        ...(category && { category }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(currency && { currency }),
        ...(description && { description }),
        ...(date && { date: new Date(date) }),
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const expense = await prisma.expense.findUnique({
      where: { id },
      include: { trip: { select: { userId: true } } },
    });

    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    if (expense.trip.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.expense.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
