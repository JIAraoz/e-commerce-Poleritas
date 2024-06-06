import { useState, useEffect } from 'react';
import './cardEdit.css';
import axios from 'axios';

export default function CardEdit({ id, title, image, price, isActive }) {
    const [status, setStatus] = useState(isActive);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        articleName: title,
        articlePrice: price,
        // Agrega otros campos de edición según sea necesario
    });

    useEffect(() => {
        setStatus(isActive);
    }, [isActive]);

    const handleButtonClick = () => {
        const newStatus = !status;
        const url = `https://e-commerce-grupo03.onrender.com/admin/ChangeStatusArticle?id=${id}&status=${newStatus}`;
        console.log(`Enviando solicitud a: ${url}`);
        fetch(url, { method: 'POST' })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'item status changed successfully') {
                    setStatus(newStatus);
                    alert(`El producto ha sido ${newStatus ? 'activado' : 'desactivado'} exitosamente.`);
                } else {
                    alert('Hubo un error al intentar cambiar el estado del producto.');
                }
            })
            .catch((error) => console.error(error));
    };

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const editionBody = {
            articleName: formData.articleName,
            articlePrice: formData.articlePrice,
            articleDescription: formData.articleDescription,
            articleS: formData.articleS,
            articleM: formData.articleM,
            articleL: formData.articleL,
            articleXL: formData.articleXL,
            articleXXL: formData.articleXXL,
        };

        try {
            const response = await axios.post(`https://e-commerce-grupo03.onrender.com/article/editArticle?id=${id}`, editionBody);
            console.log('Artículo editado exitosamente:', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al editar el artículo:', error);
        }
    };

    const handleInputChange = (e) => {
		const { name, value } = e.target;
		let newValue = value;
	
		// Impide ingresar valores negativos
		if (value < 0) {
			newValue = 0;
		}
	
		// Actualiza el estado formData con el nuevo valor
		setFormData({
			...formData,
			[name]: newValue,
		});
	};

    return (
		<div className='Mi-Componente-CardEdit'>
			<div className='Mi-Item-CardEdit'>
				<div className='image-container-CardEdit'>
					<img src={image} alt={title} />
				</div>
				<div className='Mi-Item-Details-CardEdit'>
					<h2 className='Mi-Componente-title-CardEdit'>{title}</h2>
					<p className='price-CardEdit'>${price}</p>
					<p>Status: {status ? 'Active' : 'Inactive'}</p>
				</div>
	
				<div className='card-footer-CardEdit'>
					<button onClick={handleButtonClick}>
						{status ? 'Disable' : 'Enable'}
					</button>
				</div>
	
				<div>
					{isEditing ? (
						<form className='editingArticle' onSubmit={handleFormSubmit}>
							<label>Name:</label>
							<input
								type="text"
								name="articleName"
								value={formData.articleName}
								onChange={handleInputChange}
							/>
							<label>Price:</label>
							<input
								type="number"
								name="articlePrice"
								value={formData.articlePrice}
								onChange={handleInputChange}
							/>
							<label>Description:</label>
							<input
								type="text"
								name="articleDescription"
								value={formData.articleDescription}
								onChange={handleInputChange}
							/>
							<label>Size S:</label>
							<input
								type="number"
								name="articleS"
								value={formData.articleS}
								onChange={handleInputChange}
							/>
							<label>Size M:</label>
							<input
								type="number"
								name="articleM"
								value={formData.articleM}
								onChange={handleInputChange}
							/>
							<label>Size L:</label>
							<input
								type="number"
								name="articleL"
								value={formData.articleL}
								onChange={handleInputChange}
							/>
							<label>Size XL:</label>
							<input
								type="number"
								name="articleXL"
								value={formData.articleXL}
								onChange={handleInputChange}
							/>
							<label>Size XXL:</label>
							<input
								type="number"
								name="articleXXL"
								value={formData.articleXXL}
								onChange={handleInputChange}
							/>
							{/* Agrega más campos de edición según sea necesario */}
							<div className='editingArticle'>
								<button type="submit">Save Changes</button>
								<button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
							</div>
						</form>
					) : (
						<div className='editButton'>
							<button onClick={handleEditButtonClick}>Edit</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);	
}
