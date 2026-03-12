import { Router } from 'express';
import { createTrip, getTrips, getTrip, updateTrip, deleteTrip, getBudgetSummary } from '../controllers/trips.controller';
import { authenticate } from '../middleware/auth.middleware';

export const tripsRouter = Router();

tripsRouter.use(authenticate);

tripsRouter.post('/', createTrip);
tripsRouter.get('/', getTrips);
tripsRouter.get('/:id', getTrip);
tripsRouter.put('/:id', updateTrip);
tripsRouter.delete('/:id', deleteTrip);
tripsRouter.get('/:id/budget', getBudgetSummary);
