import { Op } from "sequelize"
import { Todo } from "../model/Todo.js"
import validator from 'validator'


const createTodo=async(req,res)=>{
    const {name,deadline}=req.body
    const userId=req.user.id
    try {
        if(!name || !deadline){
            throw new Error("Enter all required feilds")
        }
        if(!validator.isDate(deadline)){
            throw new Error("Enter valid Date")
        }
        await Todo.create({
            name,deadline,userId
        })
        res.json("success")
    } catch (error) {
        return res.status(400).json({
            message: error.errors?.[0]?.message || error.message
        });
    }
}
const getTodo=async (req,res)=>{
    const userId=req.user.id
    try {
        const todos=await Todo.findAll({
            where:{userId}
        })
        res.json({"todos":todos})
    } catch (error) {
        return res.status(400).json({
            message: error.errors?.[0]?.message || error.message
        });
    }
}
const getByDeadline=async(req,res)=>{
    const userId=req.user.id
    const {deadline}=req.query
    try {
        const todos=await Todo.findAll({
            where:{
                userId,
                deadline:{[Op.lte]:deadline}
            }
        })
        res.json({"todos":todos})
    } catch (error) {
        return res.status(400).json({
            message: error.errors?.[0]?.message || error.message
        });
    }
}

const getByStatus=async(req,res)=>{
    const userId=req.user.id
    const {status}=req.query
    try {
        const todos=await Todo.findAll({
            where:{userId,
                status
            }
        })
        res.json({"todos":todos})
    } catch (error) {
        return res.status(400).json({
            message: error.errors?.[0]?.message || error.message
        });
    }
}

const getByDeadlineStatus=async(req,res)=>{
    const userId=req.user.id
    const {status,deadline}=req.query
    try {
        const todos=await Todo.findAll({
            where:{userId,
                status,
                deadline:{[Op.lte]:deadline}
            }
        })
        res.json({"todos":todos})
    } catch (error) {
        return res.status(400).json({
            message: error.errors?.[0]?.message || error.message
        });
    }
}

const deleteTodo=async(req,res)=>{
    const userId=req.user.id
    const {todoId}=req.params
    try {
        await Todo.destroy({
            where:{userId,id:todoId}
        }) 
        res.json("deleted")
    } catch (error) {
        return res.status(400).json({
            message: error.errors?.[0]?.message || error.message
        });
    }
}
const updateTodos=async(req,res)=>{
    const {todoId}=req.params
    const userId=req.user.id
    const {name,status,deadline}=req.body
    try {
        await Todo.update({name,status,deadline},{
            where:{
                userId,id:todoId
            }
        })
        res.json("updated")
    } catch (error) {
        return res.status(400).json({
            message: error.errors?.[0]?.message || error.message
        });
    }
}
export {createTodo,getTodo,getByDeadline,getByStatus,getByDeadlineStatus,deleteTodo,updateTodos}