import Address from "./models/Address.mjs";
import Cart from "./models/Cart.mjs";
import CartItem from "./models/CartItem.mjs";
import Category from "./models/Category.mjs";
import Order from "./models/Order.mjs";
import OrderStatus from "./models/OrderStatus.mjs";
import Product from "./models/Product.mjs";
import ProductItem from "./models/ProductItem.mjs";
import Promotion from "./models/Promotion.mjs";
import ShippingMethod from "./models/ShippingMethod.mjs";
import Ticket from "./models/Ticket.mjs";
import User from "./models/User.mjs";
import UserProfile from "./models/UserProfile.mjs";
import Variation from "./models/Variation.mjs";
import VariationOption from "./models/VariationOption.mjs";

Category.hasMany(Category, { foreignKey: "parentId" });
Category.belongsTo(Category, { foreignKey: "parentId" });

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

Product.hasMany(ProductItem, { foreignKey: "productId" });
ProductItem.belongsTo(Product, { foreignKey: "productId" });

Category.belongsToMany(Variation, { through: "variation_category", as: "variations", foreignKey: "categoryId" });
Variation.belongsToMany(Category, { through: "variation_category", as: "categories", foreignKey: "variationId" });

Variation.hasMany(VariationOption, { foreignKey: "variationId" });
VariationOption.belongsTo(Variation, { foreignKey: "variationId" });

ProductItem.belongsToMany(VariationOption, {
    through: "variation_option_product_item",
    as: "variationOptions",
    foreignKey: "productItemId",
});

VariationOption.belongsToMany(ProductItem, {
    through: "variation_option_product_item",
    as: "productItems",
    foreignKey: "variationOptionId",
});

Category.belongsToMany(Promotion, { through: "category_promotion", as: "promotions", foreignKey: "categoryId" });
Promotion.belongsToMany(Category, { through: "category_promotion", as: "categories", foreignKey: "promotionId" });

User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

OrderStatus.hasMany(Order, { foreignKey: "orderStatusId" });
Order.belongsTo(OrderStatus, { foreignKey: "orderStatusId" });

ShippingMethod.hasMany(Order, { foreignKey: "shippingId" });
Order.belongsTo(ShippingMethod, { foreignKey: "shippingId" });

User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Address, { foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Ticket, { foreignKey: "userId" });
Ticket.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Ticket, { foreignKey: "adminId" });
Ticket.belongsTo(User, { foreignKey: "adminId" });
