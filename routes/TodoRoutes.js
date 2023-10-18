import express from "express";
import { Todo } from "../models/Todo.js";

const router = express.Router();

// POST request
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       description: New todo object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: New todo created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(401).send({ message: "required field are empty" });
    }

    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };

    const todo = await Todo.create(newTodo);
    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// GET all todos
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: List of todos
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    // return res.status(200).json({
    //   length: todos.length,
    //   data: todos,
    // });
    res.status(200).send(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Updating todos
/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to update
 *         schema:
 *           type: string
 *       - name: todo
 *         in: body
 *         required: true
 *         description: Updated todo object
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             status:
 *               type: string
 *     responses:
 *       200:
 *         description: Todo updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(401).send({ message: "title cannot be empty" });
    }

    const { id } = req.params;
    const todos = await Todo.findByIdAndUpdate(id, req.body);

    if (!todos) {
      return res.status(404).send({ message: "todo not found" });
    }
    res.status(200).send(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Deleting todos
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      res.status(404).send({ message: "could not find todo" });
    }
    res.status(200).send({ message: "deleted todo" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "could not delete todo" });
  }
});

export default router;
