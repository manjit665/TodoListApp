import { Sequelize} from "sequelize";

const db=new Sequelize("todo_db","root","Manjit@5636",{
    host:"localhost",
    dialect:"mysql",
    logging:false,
})

export {db}