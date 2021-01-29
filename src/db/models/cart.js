const { sequelize, DataTypes } = require("../connection");
const { Sequelize } = require('sequelize');
const cart = sequelize.define("carts", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4()
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        }
    },
    productQuantity: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },

});


module.exports = cart;
