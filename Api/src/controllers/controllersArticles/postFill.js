const { Article, Category } = require("../../db");
const base_articles = require("../../utils/base_articles");

const postFill = async (req, res) => {
  try {
    const [existingArticles, existingCategories] = await Promise.all([
      Article.findAll(),
      Category.findAll(),
    ]);

    if (existingArticles.length > 0 || existingCategories.length > 0) {
      return res
        .status(400)
        .json({ message: "Los registros ya existen en la base de datos" });
    }

    const categoriesData = [
      { categoryName: "electronics" },
      { categoryName: "jewelery" },
      { categoryName: "men's clothing" },
      { categoryName: "women's clothing" },
    ];

    const categories = await Category.bulkCreate(categoriesData);

    const categoryMap = categories.reduce((acc, category) => {
      acc[category.categoryName] = category;
      return acc;
    }, {});

    const articlesData = base_articles.map((e) => ({
      articleName: e.articleName,
      articleDescription: e.articleDescription,
      articlePrice: e.articlePrice,
      articleImage: e.articleImage,
      articleStock: e.articleStock,
    }));

    const createdArticles = await Article.bulkCreate(articlesData, {
      returning: true,
    });

    for (const article of createdArticles) {
      const baseArticle = base_articles.find(
        (a) => a.articleName === article.articleName,
      );
      if (baseArticle) {
        const category = categoryMap[baseArticle.category];
        if (category) {
          await article.setCategories([category]);
        }
      }
    }

    res
      .status(201)
      .json({
        message: "Registros creados con éxito",
        results: createdArticles,
      });
  } catch (error) {
    console.error("Error al crear registros:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = postFill;
