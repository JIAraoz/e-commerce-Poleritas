function Card({ title, description, image, price, size }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">Tamaño: {size}</p>
        <p className="card-text">Precio: ${price}</p>
      </div>
    </div>
  );
}

export default Card;
