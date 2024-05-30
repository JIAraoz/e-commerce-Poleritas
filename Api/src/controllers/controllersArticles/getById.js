const { Article, Category } = require("../../db.js");

const getById = async (req, res) => {
  try {
    const articleId = req.params.id;

    if (!articleId) {
      return res.status(400).json({ error: "ID is required" });
    }

    const resultado = await Article.findOne({
      where: { articleId },
      include: {
        model: Category,
        attributes: ["categoryId", "categoryName"],
        through: { attributes: [] },
      },
    });

    if (!resultado) {
      return res.status(404).json({ message: "Articulo no  encontrado." });
    }

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getById;
