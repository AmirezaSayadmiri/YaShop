import Address from "./models/Address.mjs";
import Category from "./models/Category.mjs";
import Post from "./models/Post.mjs";
import Tag from "./models/Tag.mjs";
import Ticket from "./models/Ticket.mjs";
import User from "./models/User.mjs";
import UserProfile from "./models/UserProfile.mjs";

User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Post, { foreignKey: "userId" });
Category.hasMany(Post, { foreignKey: "categoryId" });

Post.belongsToMany(Tag, { through: "post_tag" });

User.hasMany(Address, { foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Ticket, { foreignKey: "userId" });
Ticket.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Ticket, { foreignKey: "adminId" });
Ticket.belongsTo(User, { foreignKey: "adminId" });
