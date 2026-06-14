import React, { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useExpenseStore } from "@/store/expenseStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const COLORS = [
  "#171717", // neutral-900
  "#404040", // neutral-700
  "#525252", // neutral-600
  "#A3A3A3", // neutral-400
  "#E5E5E5", // neutral-200
];

export default function CategoryPieChart() {
  const { expenses } = useExpenseStore();

  const chartData = useMemo(() => {
    const grouped = {};

    expenses.forEach((expense) => {
      const category = expense.category?.trim() || "Others";

      grouped[category] =
        (grouped[category] || 0) + Number(expense.amount || 0);
    });

    return Object.entries(grouped)
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription>
          Distribution of spending across categories
        </CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-60 items-center justify-center">
            <p className="text-muted-foreground">
              No expense data available
            </p>
          </div>
        ) : (
          <ChartContainer
            config={{
              amount: {
                label: "Expense",
              },
            }}
            className="h-60 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <ChartTooltip
                  content={<ChartTooltipContent />}
                />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}