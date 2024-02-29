import sequelize from "../database.mjs";

const Cart = sequelize.define("Cart", {}, { timestamps: true });

export default Cart;
