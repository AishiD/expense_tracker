import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

export const useExpenseStore = create((set) => ({
  expenses: [],
  categories: [],
  loading: false,

  // Add expense
  addExpense: async (expenseData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/expense", expenseData);

      set((state) => ({
        expenses: [...state.expenses, response.data],
      }));

      toast.success("Expense added successfully!", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add expense", {
        position: "bottom-right",
      });
    } finally {
      set({ loading: false });
    }
  },

  // Delete expense
  deleteExpense: async (id) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.delete(`/expense/${id}`);

      set((state) => ({
        expenses: state.expenses.filter((expense) => expense._id !== id),
      }));

      toast.success(response?.data?.message, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense", {
        position: "bottom-right",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateExpense: async (expenseId, formData) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.put(
        `/expense/${expenseId}`,
        formData,
      );

      set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense._id === response.data._id ? response.data : expense,
        ),
      }));

      toast.success("Expense updated successfully!", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update expense", {
        position: "bottom-right",
      });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch expenses
  fetchExpenses: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/expense");
      set({ expenses: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch expenses", {
        position: "bottom-right",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/expense/categories");
      set({ categories: response.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch categories",
        {
          position: "bottom-right",
        },
      );
    } finally {
      set({ loading: false });
    }
  },
}));
