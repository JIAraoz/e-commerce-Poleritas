const { User, Review } = require('../../db.js');

const updateReview = async (reviewId, rating, comment) => {
  try {
    // Verificar si la revisión existe
    const review = await Review.findByPk(reviewId);

    if (!review) {
      throw new Error('Revisión no encontrada');
    }

    // Actualizar la revisión
    review.rating = rating;
    review.comment = comment;
    await review.save();

    return review;
  } catch (error) {
    throw error;
  }
};

const updateReviewController = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Validar los datos de entrada
    if (!rating || !comment) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const updatedReview = await updateReview(reviewId, rating, comment);
    return res.status(200).json(updatedReview);
  } catch (error) {
    if (error.message === 'Revisión no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error al actualizar la revisión' });
  }
};

module.exports = {
  updateReviewController,
};