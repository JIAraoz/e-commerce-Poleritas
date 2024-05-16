import Card from "../Card/Card";

export default function Home() {
  const shirts = [
    //agrege unas camisetas de ejemplo
    {
      title: "Camiseta 1",
      description: "Esta es la camiseta 1",
      image: "ruta/a/la/imagen1.jpg",
      price: 19.99,
      size: "M",
    },
    {
      title: "Camiseta 2",
      description: "Esta es la camiseta 2",
      image: "ruta/a/la/imagen2.jpg",
      price: 29.99,
      size: "L",
    },
  ];
  return (
    <div className="shop">
      {shirts.map((shirt, index) => (
        <Card
          key={index}
          title={shirt.title}
          description={shirt.description}
          image={shirt.image}
          price={shirt.price}
          size={shirt.size}
        />
      ))}
    </div>
  );
}
