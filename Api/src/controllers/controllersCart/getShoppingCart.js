/* const { User, ShoppingCart, Article, } = require('../../db');

const getShoppingCart = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ message: 'Faltan datos o son inválidos en el cuerpo de la solicitud' });

        // Buscar el usuario con sus carritos
        const userCard = await User.findOne({
            where: { userId: id },
            include: {
                model: ShoppingCart,
                include: {
                    model: Article
                }
            }
        });

        if (!userCard) {
            return res.status(400).json({ message: 'No se encontró el usuario' });
        }

        // Verificar si todos los carritos están inactivos
        const activeCart = userCard.shoppingCarts.find(cart => cart.isActive);

        if (!activeCart) {
            // Si no hay carritos activos, crear uno nuevo
            const newShoppingCart = await ShoppingCart.create({
                cartSubtotal: 0,
                cartPayment: "None",
                isActive: true,
            });

            await userCard.addShoppingCarts(newShoppingCart);

            // Volver a buscar el usuario con el carrito recién creado
            const updatedUser = await User.findOne({
                where: { userId: id },
                include: {
                    model: ShoppingCart,
                    include: {
                        model: Article
                    }
                }
            });

            return res.status(200).json({ result: updatedUser.shoppingCarts });
        } else {
            // Si hay un carrito activo, devolverlo
            return res.status(200).json({ result: userCard.shoppingCarts });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getShoppingCart; */
const { User, ShoppingCart, Article } = require('../../db');

const getShoppingCart = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({ message: 'Missing or invalid data in the request body' });
        }

        // Buscar el usuario con sus carritos
        const userCard = await User.findOne({
            where: { userId: id },
            include: {
                model: ShoppingCart,
                include: {
                    model: Article
                }
            }
        });console.log(userCard);

        if (!userCard) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Verificar si todos los carritos están inactivos
        let activeCart = userCard.shoppingCarts.find(cart => cart.isActive);

        if (!activeCart) {
            // Si no hay carritos activos, crear uno nuevo
            activeCart = await ShoppingCart.create({
                cartSubtotal: 0,
                cartPayment: "None",
                isActive: true,
                userId: userCard.userId // asegúrate de asignar el userId aquí
            });

            await userCard.addShoppingCart(activeCart);
            
            // Volver a buscar el usuario con el carrito recién creado
            const updatedUser = await User.findOne({
                where: { userId: id },
                include: {
                    model: ShoppingCart,
                    include: {
                        model: Article
                    }
                }
            });

            return res.status(200).json({ result: updatedUser.shoppingCarts });
        } else {
            // Si hay un carrito activo, devolverlo
            return res.status(200).json({ result: activeCart });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getShoppingCart;