import { Router } from 'express';
import { addExpense, getExpensesByTrip, updateExpense, deleteExpense } from '../controllers/expenses.controller';
import { authenticate } from '../middleware/auth.middleware';

export const expensesRouter = Router();

expensesRouter.use(authenticate);

expensesRouter.post('/', addExpense);
expensesRouter.get('/:tripId', getExpensesByTrip);
expensesRouter.put('/:id', updateExpense);
expensesRouter.delete('/:id', deleteExpense);
