import { useExpenseStore } from "@/store/expenseStore";
import React, { useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit2Icon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../ui/button";

export default function ExpenseList({ onEdit }) {
  const { loading, fetchExpenses, expenses, deleteExpense } = useExpenseStore();
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = async (id) => {
    await deleteExpense(id);
  };

  const totalAmount = useMemo(
    () => expenses.reduce((sum, { amount }) => sum + Number(amount), 0),
    [expenses],
  );

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden p-4">
      {/* Scrollable Table Section */}
      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Modified Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading &&
              expenses.length > 0 &&
              expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>₹ {expense.amount}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{new Date(expense.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(expense.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(expense)}>
                          <PencilIcon />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(expense._id)}
                        >
                          <TrashIcon />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Total Bar */}
      <div className="flex justify-between items-center pt-3 px-2 border-t bg-muted/40 font-medium">
        <span>Total</span>
        <span>₹ {totalAmount}</span>
      </div>
    </div>
  );
}
