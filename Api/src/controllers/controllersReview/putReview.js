const { verifyFirstPurchase } = require('../../controllers/controllersReview/services/reviewservicer.js');

const updateReview = async (req, res) => {
  const { userId, reviewRating, reviewDescription } = req.body;

  try {
    const { existingReview, canProceed } = await verifyFirstPurchase(userId);

    if (!canProceed) {
      return res.status(400).json({ message: 'El usuario no ha realizado ninguna compra.' });
    }

    if (!existingReview) {
      return res.status(400).json({ message: 'No se encontró una reseña para editar. Use POST para crear una nueva.' });
    }

    existingReview.reviewRating = reviewRating;
    existingReview.reviewDescription = reviewDescription;
    await existingReview.save();

    return res.status(200).json(existingReview);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reseña.', error: error.message });
  }
};

module.exports = updateReview