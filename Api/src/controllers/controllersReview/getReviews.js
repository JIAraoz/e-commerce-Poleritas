const { Review, User, ShoppingCart } = require('../../db');

const getReviews = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Buscar el usuario y sus carritos desactivados
    const user = await User.findOne({
      where: { userId },
      include: {
        model: ShoppingCart,
        where: { isActive: false }
      }
    });

    // Si el usuario no tiene carritos desactivados, no puede obtener una reseña
    if (!user || user.shoppingCarts.length === 0) {
      return res.status(400).json({ message: 'El usuario no ha realizado ninguna compra.' });
    }

    const review = await Review.getReview()
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada.' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reseña del usuario.', error: error.message });
  }
};

module.exports = getReviews;