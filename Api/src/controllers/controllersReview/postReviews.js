const { Review } = require('.././db.js');
const { verifyFirstPurchase } = require('../../controllers/controllersReview/services/reviewservicer.js');

const postReviews = async (req, res) => {
  const { userId, reviewRating, reviewDescription } = req.body;

  try {
    const { existingReview, canProceed } = await verifyFirstPurchase(userId);

    if (!canProceed) {
      return res.status(400).json({ message: 'El usuario no ha realizado ninguna compra.' });
    }

    if (existingReview) {
      return res.status(400).json({ message: 'El usuario ya tiene una reseña. Use PUT para actualizar.' });
    }

    const review = await Review.create({ userId, reviewRating, reviewDescription });
    return res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña.', error: error.message });
  }
};

module.exports=postReviews