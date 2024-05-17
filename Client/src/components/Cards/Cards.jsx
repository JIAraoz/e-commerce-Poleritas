import Card from '../Card/Card';

export default function Cards({ items }) {

    const cardComponents = items.map((item) => {
        return (
            <Card
                key = {item.title}
                name = {item.title}
                description = {item.description}
                image = {item.image}
                size = {item.size}
                price = {item.price}
            />
        )
    })

    return <div className="card-grid">{cardComponents}</div>;
};