import { DataTypes, literal } from "sequelize";
import { db } from "../config/db.js";


const Todo=db.define("Todo",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    deadline:{
        type:DataTypes.DATE,
        defaultValue:() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d;
    }
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:'pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export {Todo}