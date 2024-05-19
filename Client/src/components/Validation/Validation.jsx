export default function Validation(articleData, errors, setErrors) {
    const errorsCopy = { ...errors };

    for (const key in articleData) {
        switch (key) {
            case 'articleName':
                if (!articleData.articleName.trim()) {
                    errorsCopy.articleName = 'El nombre es obligatorio';
                } else if (articleData.articleName.length > 40) {
                    errorsCopy.articleName = 'El nombre debe tener menos de 40 caracteres';
                } else {
                    delete errorsCopy.articleName;
                }
                break;
            case 'articleImage':
                if (!articleData.articleImage.trim()) {
                    errorsCopy.articleImage = 'La imagen es obligatoria';
                } else {
                    delete errorsCopy.articleImage;
                }
                break;
            case 'articlePrice':
                if (!articleData.articlePrice.trim() || isNaN(articleData.articlePrice)) {
                    errorsCopy.articlePrice = 'El precio debe ser un número';
                } else {
                    delete errorsCopy.articlePrice;
                }
                break;
            case 'articleStock':
                if (!articleData.articleStock.trim() || isNaN(articleData.articleStock)) {
                    errorsCopy.articleStock = 'El stock debe ser un número';
                } else {
                    delete errorsCopy.articleStock;
                }
                break;
            case 'articleDescription':
                if (!articleData.articleDescription.trim()) {
                    errorsCopy.articleDescription = 'La descripción es obligatoria';
                } else {
                    delete errorsCopy.articleDescription;
                }
                break;
            case 'Category':
                if (!articleData.Category.trim()) {
                    errorsCopy.Category = 'La categoría es obligatoria';
                } else {
                    delete errorsCopy.Category;
                }
                break;
            default:
                break;
        }
    }

    setErrors(errorsCopy);
}
