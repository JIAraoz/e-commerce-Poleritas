const { User, Review } = require('../../db.js');

const getReviews = async (productId) => {
  try {
    //mirar si el usuario existe
    const product = await db.Product.findByPk(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Obtener las revisiones 
    const reviews = await Review.findAll({
      where: {
        productId,
      },
      include: [
        {
          model: User,
          attributes: ['username'], //aqui el nombre del usuario 
        },
      ],
    });

    return reviews;
  } catch (error) {
    throw error;
  }
};

const getReviewsController = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await getReviews(productId);

    if (reviews.length === 0) {
      return res.status(404).json({ error: 'No se encontraron revisiones para este producto' });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error al obtener las revisiones' });
  }
};

module.exports = {
  getReviewsController,
};