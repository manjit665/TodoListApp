import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const User = db.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Enter a valid email address"
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isStrongPassword(value) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
                if (!regex.test(value)) {
                    throw new Error(
                        "Password must contain uppercase, lowercase, number and special character"
                    );
                }
            }
        }
    }
});

export {User};