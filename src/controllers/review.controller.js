import prisma from '../config/prisma.js';


export const getProductReviews = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    const productExists = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!productExists) {
      return res.status(404).json({
        error: `El producto con ID ${productId} no existe.`
      });
    }

    
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: {
        createdAt: 'desc'
      }
    });

    
    let averageRating = 0;
    if (reviews.length > 0) {
      const sumRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
      averageRating = Number((sumRatings / reviews.length).toFixed(2));
    }

    res.status(200).json({
      total: reviews.length,
      averageRating,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

export const createProductReview = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const { author, rating, comment } = req.body;

   
    const productExists = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!productExists) {
      return res.status(404).json({
        error: `El producto con ID ${productId} no existe.`
      });
    }

    const newReview = await prisma.review.create({
      data: {
        author,
        rating,
        comment,
        productId
      }
    });

    res.status(201).json({
      mensaje: 'Reseña creada exitosamente',
      data: newReview
    });
  } catch (error) {
    next(error);
  }
};