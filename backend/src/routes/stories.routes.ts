import { Router } from 'express';
import { createStory, getStories, getStory, likeStory, addComment, deleteStory } from '../controllers/stories.controller';
import { authenticate } from '../middleware/auth.middleware';

export const storiesRouter = Router();

storiesRouter.get('/', getStories);
storiesRouter.get('/:id', getStory);

storiesRouter.post('/', authenticate, createStory);
storiesRouter.delete('/:id', authenticate, deleteStory);
storiesRouter.post('/:id/like', authenticate, likeStory);
storiesRouter.post('/:id/comments', authenticate, addComment);
