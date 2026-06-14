import React, { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useExpenseStore } from "@/store/expenseStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function TotalExpenseChart() {
  const { expenses } = useExpenseStore();

  const chartData = useMemo(() => {
    const grouped = {};

    expenses.forEach((expense) => {
      const date = expense.createdAt.split("T")[0];

      grouped[date] =
        (grouped[date] || 0) + Number(expense.amount || 0);
    });

    return Object.entries(grouped)
      .sort(
        ([dateA], [dateB]) =>
          new Date(dateA) - new Date(dateB)
      )
      .map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        amount,
      }));
  }, [expenses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Expenses</CardTitle>
        <CardDescription>
          Expense trend by day
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
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                />

                <ChartTooltip
                  content={<ChartTooltipContent />}
                />

                <Bar
                  dataKey="amount"
                  fill="var(--primary)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}