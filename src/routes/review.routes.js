import { Router } from 'express';
import { getProductReviews, createProductReview } from '../controllers/review.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createReviewSchema, productIdParamSchema } from '../schemas/review.schema.js';


const router = Router({ mergeParams: true });


router.get('/', validate(productIdParamSchema, 'params'), getProductReviews);

router.post('/', validate(productIdParamSchema, 'params'), validate(createReviewSchema, 'body'), createProductReview);

export default router;