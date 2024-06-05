export default function Validation(articleData, errors, setErrors) {
	const errorsCopy = { ...errors };

	for (const key in articleData) {
		switch (key) {
			case 'articleName':
				if (!articleData.articleName.trim) {
					errorsCopy.articleName = '*El nombre es obligatorio';
				} else if (articleData.articleName.length > 40) {
					errorsCopy.articleName =
						'El nombre debe tener menos de 40 caracteres';
				} else {
					delete errorsCopy.articleName;
				}
				break;
			case 'articleImage':
				if (!articleData.articleImage.trim) {
					errorsCopy.articleImage = '*La imagen es obligatoria';
				} else {
					delete errorsCopy.articleImage;
				}
				break;
			case 'articlePrice':
				if (!articleData.articlePrice.trim || isNaN(articleData.articlePrice)) {
					errorsCopy.articlePrice = '*El precio debe ser un número';
				} else if (Number(articleData.articlePrice) < 0) {
					errorsCopy.articlePrice =
						'*El precio no puede ser un número negativo';
				} else {
					delete errorsCopy.articlePrice;
				}
				break;

			case 'articleDescription':
				if (!articleData.articleDescription.trim) {
					errorsCopy.articleDescription = '*La descripción es obligatoria';
				} else {
					delete errorsCopy.articleDescription;
				}
				break;
			case 'Category':
				if (!articleData.Category.trim) {
					errorsCopy.Category = '*La categoría es obligatoria';
				} else {
					delete errorsCopy.Category;
				}
				break;
			case 'articleS':
				if (!articleData.articleS.trim) {
					errorsCopy.articleS = '*El stock para S es obligatorio';
				} else if (isNaN(articleData.articleS)) {
					errorsCopy.articleS = '*El stock para S debe ser un número';
				} else if (Number(articleData.articleS) < 0) {
					errorsCopy.articleS =
						'*El stock para S no puede ser un número negativo';
				} else {
					delete errorsCopy.articleS;
				}
				break;
			case 'articleM':
				if (!articleData.articleM.trim) {
					errorsCopy.articleM = '*El stock para M es obligatorio';
				} else if (isNaN(articleData.articleM)) {
					errorsCopy.articleM = '*El stock para M debe ser un número';
				} else if (Number(articleData.articleM) < 0) {
					errorsCopy.articleM =
						'*El stock para M no puede ser un número negativo';
				} else {
					delete errorsCopy.articleM;
				}
				break;
			case 'articleL':
				if (!articleData.articleL.trim) {
					errorsCopy.articleL = '*El stock para L es obligatorio';
				} else if (isNaN(articleData.articleL)) {
					errorsCopy.articleL = '*El stock para L debe ser un número';
				} else if (Number(articleData.articleL) < 0) {
					errorsCopy.articleL =
						'*El stock para L no puede ser un número negativo';
				} else {
					delete errorsCopy.articleL;
				}
				break;
			case 'articleXL':
				if (!articleData.articleXL.trim) {
					errorsCopy.articleXL = '*El stock para XL es obligatorio';
				} else if (isNaN(articleData.articleXL)) {
					errorsCopy.articleXL = '*El stock para XL debe ser un número';
				} else if (Number(articleData.articleXL) < 0) {
					errorsCopy.articleXL =
						'*El stock para XL no puede ser un número negativo';
				} else {
					delete errorsCopy.articleXL;
				}
				break;
			case 'articleXXL':
				if (!articleData.articleXXL.trim) {
					errorsCopy.articleXXL = '*El stock para XXL es obligatorio';
				} else if (isNaN(articleData.articleXXL)) {
					errorsCopy.articleXXL = '*El stock para XXL debe ser un número';
				} else if (Number(articleData.articleXXL) < 0) {
					errorsCopy.articleXXL =
						'*El stock para XXL no puede ser un número negativo';
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
