export default function Validation(articleData, errors, setErrors) {
	const errorsCopy = { ...errors };

	for (const key in articleData) {
		switch (key) {
			case 'articleName':
				if (!articleData.articleName.trim()) {
					errorsCopy.articleName = '*El nombre es obligatorio';
				} else if (articleData.articleName.length > 40) {
					errorsCopy.articleName =
						'El nombre debe tener menos de 40 caracteres';
				} else {
					delete errorsCopy.articleName;
				}
				break;
			case 'articleImage':
				if (!articleData.articleImage.trim()) {
					errorsCopy.articleImage = '*La imagen es obligatoria';
				} else {
					delete errorsCopy.articleImage;
				}
				break;
			case 'articlePrice':
				if (
					!articleData.articlePrice.trim() ||
					isNaN(articleData.articlePrice)
				) {
					errorsCopy.articlePrice = '*El precio debe ser un número';
				} else {
					delete errorsCopy.articlePrice;
				}
				break;

			case 'articleDescription':
				if (!articleData.articleDescription.trim()) {
					errorsCopy.articleDescription = '*La descripción es obligatoria';
				} else {
					delete errorsCopy.articleDescription;
				}
				break;
			case 'Category':
				if (!articleData.Category.trim()) {
					errorsCopy.Category = '*La categoría es obligatoria';
				} else {
					delete errorsCopy.Category;
				}
				break;
			case 'articleS':
				if (!articleData.articleS.trim()) {
					errorsCopy.articleS = '*El stock para S es obligatorio';
				} else {
					delete errorsCopy.articleS;
				}
				break;
			case 'articleM':
				if (!articleData.articleM.trim()) {
					errorsCopy.articleM = '*El stock para M es obligatorio';
				} else {
					delete errorsCopy.articleM;
				}
				break;
			case 'articleL':
				if (!articleData.articleL.trim()) {
					errorsCopy.articleL = '*El stock para L es obligatorio';
				} else {
					delete errorsCopy.articleL;
				}
				break;
			case 'articleXL':
				if (!articleData.articleXL.trim()) {
					errorsCopy.articleXL = '*El stock para XL es obligatorio';
				} else {
					delete errorsCopy.articleXL;
				}
				break;
			case 'articleXXL':
				if (!articleData.articleXXL.trim()) {
					errorsCopy.articleXXL = '*El stock para XXL es obligatorio';
				} else {
					delete errorsCopy.articleXXL;
				}
				break;
			default:
				break;
		}
	}

	setErrors(errorsCopy);
}
