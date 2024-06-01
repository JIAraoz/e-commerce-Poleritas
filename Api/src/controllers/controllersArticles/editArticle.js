const { Article } = require('../../db');

async function editArticle(req, res) {
    const articleId = req.query.id;
    const {
        articleName,
        articleDescription,
        articlePrice,
        articleImage,
        articleS,
        articleL,
        articleM,
        articleXL,
        articleXXL,
    } = req.body;

    try {
        const article = await Article.findByPk(articleId);

        if (!article) {
        return res.status(404).json({ message: "Artículo no encontrado" });
        }

        if (articleName) article.articleName = articleName;
        if (articleDescription) article.articleDescription = articleDescription;
        if (articlePrice) article.articlePrice = articlePrice;
        if (articleImage) article.articleImage = articleImage;
        if (articleS) article.articleS = articleS;
        if (articleM) article.articleM = articleM;
        if (articleL) article.articleL = articleL;
        if (articleXL) article.articleXL = articleXL;
        if (articleXXL) article.articleXXL = articleXXL;

        await article.save();

        res.status(200).json({ message: "Artículo editado correctamente", article });
    } catch (error) {
        res.status(500).json({ message: "Error al editar el artículo", error });
    }
}

module.exports = editArticle;
