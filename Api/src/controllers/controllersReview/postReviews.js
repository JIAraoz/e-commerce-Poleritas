const { Review, User, ShoppingCart } = require('../../db');

const postReviews = async (req, res) => {
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

    // Si el usuario no tiene carritos desactivados, no puede crear una reseña
    if (!user || user.shoppingCarts.length === 0) {
      return res.status(400).json({ message: 'El usuario no ha realizado ninguna compra.' });
    }

    // Verificar si el usuario ya tiene una reseña
    const existingReview = await Review.findOne({ where: { userId } });
    if (existingReview) {
      return res.status(400).json({ message: 'El usuario ya tiene una reseña. Use PUT para actualizar.' });
    }

    // Crear la nueva reseña
    const review = await Review.create({ reviewRating, reviewDescription });
    await user.addReview(review)
    return res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña.', error: error.message });
  }
};

module.exports = postReviews;
