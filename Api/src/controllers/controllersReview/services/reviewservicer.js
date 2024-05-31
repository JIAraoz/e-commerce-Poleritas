const { Review, ShoppingCart } = require('../../../db');

// Verificar si el usuario ha realizado una compra y si ya tiene una reseña
const verifyFirstPurchase = async (userId) => {
  const firstPurchase = await ShoppingCart.findOne({
    where: { userId, isActive: false },
    order: [['createdAt', 'ASC']]
  });

  if (!firstPurchase) {
    return { message: 'El usuario no ha realizado ninguna compra.', canProceed: false };
  }

  const existingReview = await Review.findOne({ where: { userId } });
  return { existingReview, canProceed: true };
};

module.exports = verifyFirstPurchase