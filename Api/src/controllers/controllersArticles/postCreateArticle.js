const { Article, Category, Size, Article_Size } = require("../../db");
const postCreateArticle = async (req, res) => {
  try {
    const {
      categoryName,
      articleName,
      articleDescription,
      articleImage,
      articlePrice,
      articleStock,
      sizes,
    } = req.body;

    // Verificar datos requeridos
    if (
      !categoryName ||
      !articleName ||
      !articleImage ||
      !articleDescription ||
      !articlePrice ||
      !articleStock
    ) {
      return res
        .status(400)
        .json({
          message: "Data is missing or invalid in the article creation form",
        });
    }

    // Buscar categoría
    const category = await Category.findOne({ where: { categoryName } });
    if (!category) {
      return res
        .status(400)
        .json({ message: "An error occurred while obtaining the categories" });
    }

    // Crear artículo
    const createdArticle = await Article.create({
      articleName,
      articleDescription,
      articleImage,
      articlePrice,
      articleStock,
    });

    // Asociar categoría al artículo
    await createdArticle.addCategory(category);

    // Procesar y asociar tallas (sizes)

    for (let sizeName in sizes) {
      console.log(sizeName);
      console.log(sizes[sizeName]);

      const size = await Size.findOne({ where: { sizeType: sizeName } });
      const size_id = size.sizeId;
      const article_id = createdArticle.articleId;
      await createdArticle.addSize(size, {
        through: {
          sizeQuantity: sizes[sizeName],
        },
      });
      const articleSize = await Article_Size.findOne({
        where: {
          sizeSizeId: size_id,
          articleArticleId: article_id,
        },
      });

      await articleSize.save();
    }

    res
      .status(201)
      .json({ message: "Registro creado con éxito", results: createdArticle });
  } catch (error) {
    console.error("Error al crear registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = postCreateArticle;
