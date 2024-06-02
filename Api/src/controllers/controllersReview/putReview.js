const { Review, User, ShoppingCart } = require('../../db');

const updateReview = async (req, res) => {
  const { userId, reviewRating, reviewDescription } = req.body;

  try {
    // Buscar el usuario y sus carritos desactivados
    const user = await User.findOne({
      where: { userId },
      include: {
        model: ShoppingCart,
        where: { isActive: false }
      }
    });

    // Si el usuario no tiene carritos desactivados, no puede actualizar una reseña
    if (!user || user.shoppingCarts.length === 0) {
      return res.status(400).json({ message: 'El usuario no ha realizado ninguna compra.' });
    }

    // Buscar la reseña existente
    const existingReview = await Review.findOne({ where: { userId } });

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

module.exports = updateReview;