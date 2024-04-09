import { Router } from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} from '../controllers/tourController.js';

const router = Router();

// router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
