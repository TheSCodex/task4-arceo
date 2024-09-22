import { DataTypes } from "sequelize";
import connection from "../db.js";

const User = connection.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_login_time: {
            type: DataTypes.DATE,
        },
        registration_time: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.ENUM('active', 'blocked'),
            allowNull: false,
            defaultValue: "active",
        }
    },{
        timestamps: true,
    }
)

User.sync();

export default User;