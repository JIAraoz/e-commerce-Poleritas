import { useState, useEffect } from 'react';
import axios from 'axios';
import Cloudinary from '../Cloudinary/Cloudinary';
import './Form.css';
import Validation from '../Validation/Validation';
import Swal from 'sweetalert2';

export default function Form() {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const axiosCategories = async () => {
			try {
				const { data } = await axios.get(
					'https://e-commerce-grupo03.onrender.com/categories/category',
				);
				console.log(data);
				setCategories(data.result);
			} catch (error) {
				// alert('A ocurrido un error al intentar cargar las categorías');
				Swal.fire({
					icon: 'error',
					title: error,
					text: 'An error occurred while trying to load the categories!',
				});
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
		articleS: '',
		articleM: '',
		articleL: '',
		articleXL: '',
		articleXXL: '',
	});

	const [errors, setErrors] = useState({
		articleName: '',
		articleImage: '',
		articlePrice: '',
		articleDescription: '',
		Category: '',
		articleS: '',
		articleM: '',
		articleL: '',
		articleXL: '',
		articleXXL: '',
	});

	useEffect(() => {
		Validation(articleData, errors, setErrors);
	}, []);

	const handleChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;

		const updatedData = { ...articleData, [property]: value };

		setArticleData(updatedData);
		Validation(updatedData, errors, setErrors);

		if (
			['articleS', 'articleM', 'articleL', 'articleXL', 'articleXXL'].includes(
				property,
			)
		) {
			const totalStock = [
				'articleS',
				'articleM',
				'articleL',
				'articleXL',
				'articleXXL',
			].reduce((sum, key) => {
				return sum + Number(updatedData[key] || 0);
			}, 0);

			setArticleData({ ...updatedData, articleStock: totalStock });
		}
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
				'https://e-commerce-grupo03.onrender.com/article/createArticle',
				articleData,
			);

			if (('' + response.status)[0] === '2') {
				// alert('Se ha subido tu artículo a la base de datos.');
				Swal.fire({
					title: 'Good job!',
					text: 'Your article has been uploaded to the database.',
					icon: 'success',
				});
			} else {
				// alert('Algo ha salido mal.');
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
			}
		} catch (error) {
			// alert('Ha ocurrido un error: ' + error.message);
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'an error has occurred:' + error.response.status,
				text: error.response.data.message,
			});
		}
	};

	const hasErrors = () => {
		return Object.keys(errors).some((key) => errors[key]);
	};

	return (
		<div className='back'>
			<div className='form-box'>
				<form className='articleForm' onSubmit={handleSubmit}>
					<div className='product-container'>
						<div className='image-container'>
							<div className='form-group'>
								<Cloudinary onImageUpload={handleImageUpload} />
								{errors.articleImage && (
									<span className='error-message'>{errors.articleImage}</span>
								)}
							</div>
						</div>

						<div className='details-container'>
							<div className='form-group'>
								<input
									type='text'
									name='articleName'
									placeholder='Name of article'
									value={articleData.articleName}
									onChange={handleChange}
								/>
								{errors.articleName && (
									<span className='error-message'>{errors.articleName}</span>
								)}
							</div>

							<div className='form-group'>
								<input
									className='articlePrice'
									type='text'
									name='articlePrice'
									placeholder='Price'
									value={articleData.articlePrice}
									onChange={handleChange}
								/>
								{errors.articlePrice && (
									<span className='error-message'>{errors.articlePrice}</span>
								)}
							</div>

							<div className='form-group'>
								<div className='input-group'>
									<div>
										<input
											type='number'
											name='articleS'
											placeholder='Stock S'
											value={articleData.articleS}
											onChange={handleChange}
											min='0'
										/>
										{errors.articleS && (
											<span className='error-message'>{errors.articleS}</span>
										)}
									</div>
								</div>

								<div className='input-group'>
									<div>
										<input
											type='number'
											name='articleM'
											placeholder='Stock M'
											value={articleData.articleM}
											onChange={handleChange}
											min='0'
										/>
										{errors.articleM && (
											<span className='error-message'>{errors.articleM}</span>
										)}
									</div>
								</div>
								<div className='input-group'>
									<div>
										<input
											type='number'
											name='articleL'
											placeholder='Stock L'
											value={articleData.articleL}
											onChange={handleChange}
											min='0'
										/>
										{errors.articleL && (
											<span className='error-message'>{errors.articleL}</span>
										)}
									</div>
								</div>

								<div className='input-group'>
									<div>
										<input
											type='number'
											name='articleXL'
											placeholder='Stock XL'
											value={articleData.articleXL}
											onChange={handleChange}
											min='0'
										/>
										{errors.articleXL && (
											<span className='error-message'>{errors.articleXL}</span>
										)}
									</div>
								</div>

								<div className='input-group'>
									<div>
										<input
											type='number'
											name='articleXXL'
											placeholder='Stock XXL'
											value={articleData.articleXXL}
											onChange={handleChange}
											min='0'
										/>
										{errors.articleXXL && (
											<span className='error-message'>{errors.articleXXL}</span>
										)}
									</div>
								</div>
							</div>
							<div className='form-group'>
								<textarea
									name='articleDescription'
									placeholder='Description'
									value={articleData.articleDescription}
									onChange={handleChange}
								></textarea>
								{errors.articleDescription && (
									<span className='error-message'>
										{errors.articleDescription}
									</span>
								)}
							</div>

							<div className='form-group'>
								<select
									name='Category'
									value={articleData.Category}
									onChange={handleChange}
								>
									<option value=''>Select a category:</option>
									{categories.map((element) => (
										<option
											value={element.categoryName}
											key={element.categoryId}
										>
											{element.categoryName}
										</option>
									))}
								</select>

								{errors.Category && (
									<span className='error-message'>{errors.Category}</span>
								)}
							</div>
						</div>
					</div>
					<div className='button-container'>
						<button type='submit' disabled={hasErrors()}>
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
