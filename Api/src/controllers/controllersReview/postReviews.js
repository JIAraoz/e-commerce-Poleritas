const postReviews = async (req, res) => {
  const { reviewRating, reviewDescription } = req.body;

  try {
    const user = req.user; // Esto asume que tienes un middleware que agrega el usuario a la solicitud

    // Si el usuario no está disponible o no tiene carritos desactivados, no puede crear una reseña
    if (!user || user.shoppingCarts.length === 0) {
      return res.status(400).json({ message: 'El usuario no ha realizado ninguna compra.' });
    }

    // Verificar si el usuario ya tiene una reseña
    const existingReview = await Review.findOne({ where: { userId: user.userId } });
    if (existingReview) {
      return res.status(400).json({ message: 'El usuario ya tiene una reseña. Use PUT para actualizar.' });
    }

    // Crear la nueva reseña asociada al usuario
    const review = await user.createReview({ reviewRating, reviewDescription });
    return res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña.', error: error.message });
  }
};
