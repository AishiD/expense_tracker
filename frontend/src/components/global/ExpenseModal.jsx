import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useExpenseStore } from "@/store/expenseStore";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { useForm } from "react-hook-form";

const ExpenseModal = ({ expense, open, onOpenChange }) => {
  const { loading, categories, fetchCategories, addExpense, updateExpense } =
    useExpenseStore();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const selectedCategory = watch("category");

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open, fetchCategories]);

  useEffect(() => {
    if (!open) {
      reset({
        title: "",
        amount: "",
        description: "",
        category: "",
      });
      return;
    }

    if (expense) {
      reset({
        title: expense.title,
        amount: expense.amount,
        description: expense.description,
        category: expense.category,
      });
    } else {
      reset({
        title: "",
        amount: "",
        description: "",
        category: "",
      });
    }
  }, [open, expense, reset]);

  const onSubmit = async (formData) => {
    const success = expense
      ? await updateExpense(expense._id, formData)
      : await addExpense(formData);

    if (success !== false) {
      reset();
      onOpenChange?.(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="left-1/2 top-1/2 mx-auto mr-6 max-w-106.25 -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {expense ? "Update Expense" : "Add Expense"}
            </DialogTitle>

            <DialogDescription>
              {expense
                ? "Update your expense details."
                : "Create a new expense."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-4">
            <div className="grid gap-3">
              <Label htmlFor="title">
                Title<span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Uber Ride to Airport"
                aria-invalid={!!errors.title}
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="amount">
                Amount<span className="text-destructive">*</span>
              </Label>
              <Input
                id="amount"
                placeholder="150.00"
                type="number"
                aria-invalid={!!errors.amount}
                {...register("amount", {
                  required: "Amount is required",
                  valueAsNumber: true,
                })}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                className={"h-20"}
                id="description"
                placeholder="Uber trip from home to airport"
                {...register("description")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">
                Category<span className="text-destructive">*</span>
              </Label>
              <Input
                id="category"
                placeholder="Transport"
                aria-invalid={!!errors.category}
                {...register("category", {
                  required: "Category is required",
                })}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
              <div className="flex flex-wrap gap-2 pb-3">
                {!loading &&
                  categories.length > 0 &&
                  categories.map((category, idx) => (
                    <Badge
                      key={idx}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      className="cursor-pointer text-sm"
                      onClick={() =>
                        setValue("category", category, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    >
                      {category}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading
                ? expense
                  ? "Updating..."
                  : "Saving..."
                : expense
                  ? "Update Expense"
                  : "Save Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
