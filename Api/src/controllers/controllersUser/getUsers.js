const { User } = require('../../db');
const { Op } = require('sequelize');

const getUser = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.size, 10) || 5;
        const page = parseInt(req.query.page, 10) || 1;
        const roleFilter = req.query.role || null;
        const emailFilter = req.query.userEmail || null;

        // Validar parámetros de paginación
        if (isNaN(pageSize) || pageSize <= 0 || isNaN(page) || page <= 0) {
            return res.status(400).json({ message: 'Invalid pagination parameters' });
        }

        // Validar filtro de rol
        const validRoles = ['Admin', 'User', 'Banned'];
        if (roleFilter && !validRoles.includes(roleFilter)) {
            return res.status(400).json({ message: 'Invalid role filter' });
        }

        // Calcular el offset
        const offset = (page - 1) * pageSize;

        // Construir condición "where"
        const whereCondition = {};
        if (roleFilter) {
            whereCondition.userRol = roleFilter;
        }
        if (emailFilter) {
            whereCondition.userEmail = { [Op.iLike]: `%${emailFilter}%` };
        }

        // Consultar usuarios con paginación y filtros de rol y email
        const { count, rows } = await User.findAndCountAll({
            where: whereCondition,
            offset,
            limit: pageSize,
            attributes: ['userId', 'userName', 'userEmail', 'userRol', 'createdAt'] // Selecciona solo los campos necesarios
        });

        // Verificar si se encontraron usuarios
        if (count === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Calcular el total de páginas
        const totalPages = Math.ceil(count / pageSize);

        // Devolver la respuesta con los datos y la información de paginación
        res.status(200).json({
            message: 'Data successfully obtained',
            totalPages,
            currentPage: page,
            result: rows
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
}

module.exports = getUser;