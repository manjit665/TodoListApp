import express from 'express'
import { createTodo, deleteTodo, getByDeadline, getByDeadlineStatus, getByStatus, getTodo, updateTodos } from '../controller/todo.js'
import { authenticateuser } from '../middleware/authenticateUser.js'

const todoRouter=express.Router()

todoRouter.post('/todos/create',authenticateuser,createTodo)
todoRouter.get('/todos/getTodos',authenticateuser,getTodo)
todoRouter.get('/todos/getByDeadline',authenticateuser,getByDeadline)
todoRouter.get('/todos/getByStatus',authenticateuser,getByStatus)
todoRouter.get('/todos/getByDeadlineStatus',authenticateuser,getByDeadlineStatus)
todoRouter.put('/todos/updateTodos/:todoId',authenticateuser,updateTodos)
todoRouter.delete('/todos/delete/:todoId',authenticateuser,deleteTodo)

export default todoRouter