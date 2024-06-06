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

        // Actualiza los campos del artículo
        article.articleName = articleName || article.articleName;
        article.articleDescription = articleDescription || article.articleDescription;
        article.articlePrice = articlePrice || article.articlePrice;
        article.articleImage = articleImage || article.articleImage;
        article.articleS = articleS || article.articleS;
        article.articleM = articleM || article.articleM;
        article.articleL = articleL || article.articleL;
        article.articleXL = articleXL || article.articleXL;
        article.articleXXL = articleXXL || article.articleXXL;

        article.articleS = Number(article.articleS);
        article.articleM = Number(article.articleM);
        article.articleL = Number(article.articleL);
        article.articleXL = Number(article.articleXL);
        article.articleXXL = Number(article.articleXXL);
        // Calcula el stock total
        const totalStock = (article.articleS || 0) + (article.articleM || 0) + (article.articleL || 0) + (article.articleXL || 0) + (article.articleXXL || 0);
        article.articleStock = totalStock;

        // Guarda los cambios en la base de datos
        await article.save();

        res.status(200).json({ message: "Artículo editado correctamente", article });
    } catch (error) {
        res.status(500).json({ message: "Error al editar el artículo", error });
    }
}

module.exports = editArticle;
