import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createExpense,
  deleteExpense,
  getCategories,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getExpenses);
router.post("/", authMiddleware, createExpense);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

router.get("/categories", authMiddleware, getCategories);

export default router;
