const { Review } = require('../../db.js');
const getReviews = async (req, res) => {
  try {
    const review = await Review.findOne({ where: { userId: req.params.userId } });
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada.' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reseña del usuario.', error: error.message });
  }
};

mnodule.export = getReviews