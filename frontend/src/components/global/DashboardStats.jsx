import React, { useMemo } from "react";
import { useExpenseStore } from "@/store/expenseStore";
import { Card, CardContent } from "@/components/ui/card";
import {
  IndianRupee,
  Receipt,
  Tags,
  TrendingUp,
} from "lucide-react";

export default function DashboardStats() {
  const { expenses } = useExpenseStore();

  const stats = useMemo(() => {
    const totalAmount = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );

    const totalExpenses = expenses.length;

    const totalCategories = new Set(
      expenses.map((expense) => expense.category)
    ).size;

    const averageExpense = totalExpenses
      ? Math.round(totalAmount / totalExpenses)
      : 0;

    return {
      totalAmount,
      totalExpenses,
      totalCategories,
      averageExpense,
    };
  }, [expenses]);

  const cards = [
    {
      title: "Total Spent",
      value: `₹${stats.totalAmount.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
    {
      title: "Expenses",
      value: stats.totalExpenses,
      icon: Receipt,
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: Tags,
    },
    {
      title: "Average",
      value: `₹${stats.averageExpense.toLocaleString("en-IN")}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {card.value}
                </h2>
              </div>

              <Icon className="h-8 w-8 text-muted-foreground" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}