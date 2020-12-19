import { Request, Response, NextFunction } from "express";
import TodoModel, { ITodo } from "../models/Todo";
import * as httpStatus from "http-status";

import logger from "../logger";
import AppError from "../errors/AppError"



interface ITodoArgs {
  _id: any;
  todoName: string;
  startTime: Date;
  endTime: Date;
  postedBy:String;
  priority: String;
  description: String;
}

class TodoController {
  /**
   * Create a todo in the database
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { todoName, startTime, endTime, description,priority } = req.body;
      const postedBy = req.id
      
      const todo = await TodoModel.create<ITodoArgs>({
        todoName,
        startTime, 
        endTime,
        description,
        postedBy,
        priority
      }).catch((err) =>{
        logger.info("Creating todo error", err);
        throw new AppError(400, "Todo name already exist")
      })

      return res.status(httpStatus.CREATED).send({
        message: "Todo successfully created",
        status: "created",
        status_code: httpStatus.CREATED,
        results: todo,
      });
        
    } catch (err) {
      next(err)
    }
  }

  /**
   * View a Todo
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async viewTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { todo_id } = req.params;
      const postedBy = req.id

      const todo = await TodoModel.findOne({ _id: todo_id, postedBy })
        

        if (!todo)
          throw new AppError(httpStatus.NOT_FOUND, "Todo not found")

        return res.status(httpStatus.OK).send({
          message: "Successfully  fetched todo",
          status: "ok",
          status_code: httpStatus.OK,
          results: todo
        })

    } catch (error) {
      next(error)
      
    }
  }

  /**
   * View all Todo
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async allTodo(req: Request, res: Response, next: NextFunction) {
    try {
      let { page, perPage } = req.query as any;
      const postedBy = req.id

      perPage = perPage ? parseInt(perPage, 10) : 10;
      page = page ? parseInt(page, 10) : 1;
      const todos = await TodoModel.find({
        postedBy
      })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 })
        .exec();

      return res.status(httpStatus.OK).send({
        message: "Successfully  fetched all todos",
        status: "ok",
        status_code: httpStatus.OK,
        results: {
          todos,
          __meta: {
            page, perPage
          }
        },
      });
    } catch (error) {
      next(error);
      
    }
  }

  /**
   * Search todos
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async search(req: Request, res: Response, next: NextFunction) {
    try {
      let { q, page, perPage } = req.query as any;
      let todos
      if(!q) {
        todos = await TodoModel.find()

        return res.status(httpStatus.OK).send({
          message: "Successfully  fetched search results",
          status: "ok",
          status_code: httpStatus.OK,
          results: {
            todos,
            __meta: {
              count: todos.length,
              page,
              perPage,
            },
          },
        });
      }
      perPage = perPage ? parseInt(perPage, 10) : 10;
      page = page ? parseInt(page, 10) : 1;

      todos = await TodoModel.find(
        {
          $text: {
            $search: q,
          },
        },
        {
          score: { $meta: "textScore" },
        }
      )
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 })
        .exec();

      return res.status(httpStatus.OK).send({
        message: "Successfully  fetched search results",
        status: "ok",
        status_code: httpStatus.OK,
        results: {
          todos,
          __meta: {
            count: todos.length,
            page,
            perPage,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error",
        status: "Internal Server Error",
        status_code: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Edit a Todo
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async editTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const postedBy = req.id
      const { todo_id } = req.params;

      const existingTodo = await  TodoModel.findOne({ _id: todo_id })
      .catch((err)=> {
        if(err.name === "CastError"){
          throw new AppError(httpStatus.NOT_FOUND, "Todo not Found")
        }
      })

      if(existingTodo  == null) {
        throw new AppError(httpStatus.NOT_FOUND, "Todo not Found")
      }



      var options = {
        // Return the document after updates are applied
        new: true,
        // Create a document if one isn't found. Required for `setDefaultsOnInsert`
        upsert: true,
        useFindAndModify: true,
        setDefaultsOnInsert: true
      };

      const todo = await TodoModel.findOneAndUpdate(
        {
          _id: todo_id,
          postedBy
        },
        {
          ...req.body,
          modifiedAt: new Date(),
        },
        options
      ).catch(err => {
        if(err.name === "MongoError") {
          throw new AppError(httpStatus.CONFLICT, "Todo Name Already Exist")
        }
      })

      return res.status(httpStatus.OK).send({
              message: "Successfully updated the todo",
              status: "ok",
              status_code: httpStatus.OK,
              result: todo
      });
        
        
    } catch (error) {
      next(error);
      
    }
  }

  /**
   * Delete a Todo
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async deleteTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { todo_id } = req.params;
      const postedBy = req.id

      const existingTodo = await  TodoModel.findOne({ _id: todo_id })
      .catch((err)=> {
        if(err.name === "CastError"){
          throw new AppError(httpStatus.NOT_FOUND, "Todo not Found")
        }
      })

      if(existingTodo  == null) {
        throw new AppError(httpStatus.NOT_FOUND, "Todo not Found")
      }

      const todo = await TodoModel.findByIdAndDelete({ _id: todo_id, postedBy }).catch(err=> {
        if(err.name === "CastError"){
          throw new AppError(httpStatus.NOT_FOUND, "Todo not Found")
        }
      })

    
      return res.status(httpStatus.OK).send({
        message: "Successfully deleted the todo",
        status: "ok",
        status_code: httpStatus.OK,
      });
    } catch (error) {
      next(error)
    }
  }
}
export default TodoController;
