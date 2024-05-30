const { User, Review } = require('.././db.js');

const createReview = async (productId, userId, rating, comment) => {
  try {
    // Verificar si el producto y el usuario existen
    const product = await db.Product.findByPk(productId);
    const user = await User.findByPk(userId);

    if (!product || !user) {
      throw new Error('Producto o usuario no encontrado');
    }

    // Verificar si el usuario ha comprado el producto
    const purchase = await db.Purchase.findOne({
      where: {
        productId,
        userId,
      },
    });

    if (!purchase) {
      throw new Error('El usuario no ha comprado este producto');
    }

    // Crear la nueva revisión
    const newReview = await Review.create({
      productId,
      userId,
      rating,
      comment,
    });

    return newReview;
  } catch (error) {
    throw error;
  }
};

const createReviewController = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    // Validar los datos de entrada
    if (!productId || !userId || !rating || !comment) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const newReview = await createReview(productId, userId, rating, comment);
    return res.status(201).json(newReview);
  } catch (error) {
    if (error.message === 'Producto o usuario no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'El usuario no ha comprado este producto') {
      return res.status(403).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error al crear la revisión' });
  }
};

module.exports = {
  createReviewController,
};