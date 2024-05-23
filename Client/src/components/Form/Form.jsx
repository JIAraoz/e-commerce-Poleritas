import { useState, useEffect } from 'react';
import axios from 'axios';
import Cloudinary from '../Cloudinary/Cloudinary';
import './Form.css';
import Validation from '../Validation/Validation';
export default function Form() {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const axiosCategories = async () => {
			try {
				const { data } = await axios.get(
					'https://e-commerce-grupo03.onrender.com/getCategory',
				);
				console.log(data);
				setCategories(data.result);
			} catch (error) {
				alert('A ocurrido un error al intentar cargar las categorías');
				console.log(
					'A ocurrido un error al intentar cargar las categorías ' + error,
				);
			}
		};
		axiosCategories();
	}, []);
	const [articleData, setArticleData] = useState({
		articleName: '',
		articleImage: '',
		articlePrice: '',
		articleStock: '',
		articleDescription: '',
		Category: '',
	});

	const [errors, setErrors] = useState({
		articleName: '',
		articleImage: '',
		articlePrice: '',
		articleStock: '',
		articleDescription: '',
		Category: '',
	});

	const handleChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;

		setArticleData({ ...articleData, [property]: value });
		Validation({ ...articleData, [property]: value }, errors, setErrors);
	};

	const handleImageUpload = (imageUrl) => {
		setArticleData({ ...articleData, articleImage: imageUrl });
		Validation({ ...articleData, articleImage: imageUrl }, errors, setErrors);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			console.log(articleData);
			const response = await axios.post(
				'https://e-commerce-grupo03.onrender.com/createArticle',
				articleData,
			);

			if (('' + response.status)[0] === '2') {
				alert('Se ha subido tu artículo a la base de datos.');
			} else {
				alert('Algo ha salido mal.');
			}
		} catch (error) {
			alert('Ha ocurrido un error: ' + error.message);
		}
	};

	const hasErrors = () => {
		return Object.keys(errors).some((key) => errors[key]);
	};

	return (
		<div className='back'>
			<div className='form-box'>
				<form className='articleForm' onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='articleName'>Name of article:</label>
						<input
							type='text'
							name='articleName'
							value={articleData.articleName}
							onChange={handleChange}
						/>
						{errors.articleName && (
							<span className='error-message'>{errors.articleName}</span>
						)}
					</div>

					<div className='form-group'>
						<label htmlFor='articleImage'>Image:</label>
						<div className='image-container'>
							<Cloudinary onImageUpload={handleImageUpload} />
						</div>
						{errors.articleImage && (
							<span className='error-message'>{errors.articleImage}</span>
						)}
					</div>

					<div className='form-group'>
						<label htmlFor='articlePrice'>Price:</label>
						<input
							type='text'
							name='articlePrice'
							value={articleData.articlePrice}
							onChange={handleChange}
						/>
						{errors.articlePrice && (
							<span className='error-message'>{errors.articlePrice}</span>
						)}
					</div>

					<div className='form-group'>
						<label htmlFor='articleStock'>Stock:</label>
						<input
							type='text'
							name='articleStock'
							value={articleData.articleStock}
							onChange={handleChange}
						/>
						{errors.articleStock && (
							<span className='error-message'>{errors.articleStock}</span>
						)}
					</div>

					<div className='form-group'>
						<label htmlFor='articleDescription'>Description:</label>
						<textarea
							name='articleDescription'
							value={articleData.articleDescription}
							onChange={handleChange}
						></textarea>
						{errors.articleDescription && (
							<span className='error-message'>{errors.articleDescription}</span>
						)}
					</div>

					<div className='form-group'>
						<label htmlFor='Category'>Category:</label>

						<select
							name='Category'
							value={articleData.Category}
							onChange={handleChange}
						>
							<option value=''>Select a category:</option>
							{categories.map((element) => (
								<option value={element.categoryName} key={element.categoryId}>
									{element.categoryName}
								</option>
							))}
						</select>

						{errors.Category && (
							<span className='error-message'>{errors.Category}</span>
						)}
					</div>

					<button type='submit' disabled={hasErrors()}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
