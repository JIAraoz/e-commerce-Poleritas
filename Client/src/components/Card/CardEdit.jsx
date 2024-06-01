import { Link } from 'react-router-dom';
import './card.css';

export default function CardEdit({ id, title, image, price, product }) {
	const handleButtonClick = (status) => {
		const url = `https://e-commerce-grupo03.onrender.com/admin/ChangeStatusArticle?id=${id}&status=${status}`;
		console.log(`Enviando solicitud a: ${url}`);
		fetch(url, { method: 'POST' })
			.then((response) => {
				console.log(response); // Imprime la respuesta completa
				return response.json();
			})
			.then((data) => {
				console.log(data); // Imprime los datos de la respuesta
				if (data.message === 'item status changed successfully') {
					alert(
						`El producto ha sido ${status ? 'activado' : 'desactivado'} exitosamente.`,
					);
				} else {
					alert('Hubo un error al intentar cambiar el estado del producto.');
				}
			})
			.catch((error) => console.error(error));
	};
	return (
		<div className='card'>
			<div className='image-container'>
				<img src={image} alt={title} />
			</div>
			<h1 className='name'>{title}</h1>
			<div className='card-footer'>
				<p className='price'>{`Price: $${price}`}</p>
				<img className='icoFS' src='/EnvioGratis.png' alt='' />
				<button onClick={() => handleButtonClick(true)}>Activar</button>
				<button onClick={() => handleButtonClick(false)}>Desactivar</button>
			</div>
		</div>
	);
}
